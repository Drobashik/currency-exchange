import { Component, ElementRef, ViewChild } from '@angular/core';
import { CurrencyService} from '../shared/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {

  resultFirst: number;
  resultSecond: number;

  keyFirst: string;
  keySecond: string;

  @ViewChild('input1') inputFirst: ElementRef;
  @ViewChild('input2') inputSecond: ElementRef;

  keys: string[] = ['EUR', 'UAH', 'USD'];

  constructor(private currencyService: CurrencyService) { }

  keyPressNumbers(event: KeyboardEvent) {
    const charCode = event.keyCode;
    if(charCode === 8) return
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  userInput(event: Event) {
    const input = (<HTMLInputElement>event.target);
    this.convertCurrencyTemp(input);
  }

  convertCurrencyTemp(input: HTMLInputElement) {
    if(!input.value) {
      this.clear();
      return
    }
    this.currencyService.convertCurrency(this.keyFirst, this.keySecond).subscribe(data => {
      if(input.className === 'input-first') {
        this.resultFirst = data.result * Number(input.value);
        return;
      }
        this.resultSecond = Number(input.value) / data.result;
    })
  }

  selectedCurrency(event: Event) {
    const select = (<HTMLSelectElement>event.target)
    if(select.className === 'select-first') {
      this.keyFirst = select.value;
      this.convertCurrencyTemp(this.inputSecond.nativeElement);
      return;
    }
      this.keySecond = select.value;
      this.convertCurrencyTemp(this.inputFirst.nativeElement);
  }

  changeKey(select1: HTMLSelectElement, select2: HTMLSelectElement) {
    const selectArray = [...Array.from(select1.options), ...Array.from(select2.options)];
    
    const base = this.inputFirst.nativeElement.value;
    const toConvert = this.inputSecond.nativeElement.value;
    
    this.inputFirst.nativeElement.value = toConvert;
    this.inputSecond.nativeElement.value = base;
    
    selectArray.forEach(e => {
      if(e.selected && e.value === this.keyFirst ||  e.value === this.keySecond) {
        e.selected = !e.selected;
      }
    })
  }
  
  clear() {
    this.inputFirst.nativeElement.value = '';
    this.inputSecond.nativeElement.value = '';
  }
}

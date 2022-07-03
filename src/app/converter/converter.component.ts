import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyService} from '../shared/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit{

  resultFirst: number;
  resultSecond: number;

  keyFirst: string;
  keySecond: string;

  @ViewChild('input1') inputFirst: ElementRef;
  @ViewChild('input2') inputSecond: ElementRef;

  keys: string[] = ['EUR', 'UAH', 'USD']

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

  userInput(event: Event) {
    const input = (<HTMLInputElement>event.target);
    if(!input.value) {
      input.value = ''
      return;
    }
    this.convertCurrencyTemp(input)
  }


  convertCurrencyTemp(input: HTMLInputElement) {
    this.currencyService.convertCurrency(this.keyFirst, this.keySecond).subscribe(data => {
      if(input.className === 'input-first') {
        this.resultFirst = data.result * Number(input.value)
      } else {
        this.resultSecond = Number(input.value) / data.result;
      }
    })
  }

  selectedCurrency(event: Event) {
    const select = (<HTMLSelectElement>event.target)
    if(select.className === 'select-first') {
      this.keyFirst = select.value;
      this.convertCurrencyTemp(this.inputSecond.nativeElement)
    } else {
      this.keySecond = select.value;
      this.convertCurrencyTemp(this.inputFirst.nativeElement)

    }
  }

  clear(input: HTMLInputElement, input2: HTMLInputElement) {
    input.value = ''
    input2.value = ''
  }

  changeKey(select1: HTMLSelectElement, select2: HTMLSelectElement) {
    let base = this.keyFirst;
    let toConvert = this.keySecond;

    this.keyFirst = toConvert;
    this.keySecond = base;

    Array.from(select1.options).forEach(e => {
      if(e.selected)
        e.selected = false

      if(e.value === this.keyFirst)
        e.selected = true
      })
      Array.from(select2.options).forEach(e => {
        if(e.selected)
        e.selected = false
        
        if(e.value === this.keySecond)
        e.selected = true
      })

      base = this.inputFirst.nativeElement.value
      toConvert = this.inputSecond.nativeElement.value

      this.inputFirst.nativeElement.value = toConvert;
      this.inputSecond.nativeElement.value = base;
  }
}

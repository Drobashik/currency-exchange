import { Component, OnInit } from '@angular/core';
import { CurrencyService} from '../shared/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit{

  resultFirst: number;
  resultSecond: number;

  keyFirst: string = 'EUR';
  keySecond: string = 'EUR';

  keys: string[] = ['EUR', 'UAH', 'USD']

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

  firstUserInput(value: string) {
    this.currencyService.convertCurrency(this.keyFirst, this.keySecond).subscribe(data => {
      this.resultFirst = data.result * Number(value);
    })
  }

  secondUserInput(value: string) {
    this.currencyService.convertCurrency(this.keyFirst, this.keySecond).subscribe(data => {
      this.resultSecond = Number(value) / data.result
    })
  }

  selectedCurrency1(value: string, inputValue: string) {
    this.keyFirst = value
    this.secondUserInput(inputValue)
  }

  selectedCurrency2(value: string, inputValue: string) {
    this.keySecond = value;
    this.firstUserInput(inputValue)
  }

  clear(input: HTMLInputElement, event: any) {
    input.value = ''
  }

  changeKey(value1: string, value2: string, select1: HTMLSelectElement, select2: HTMLSelectElement) {
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
    this.firstUserInput(value2)
    this.secondUserInput(value1)
  }
}

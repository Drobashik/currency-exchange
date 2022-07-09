import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './shared/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  keysCurrencyArray: string[] = ['EUR', 'USD']
  currencyArrayValues: number[] = [0, 0];
  
  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.keysCurrencyArray.forEach((currency, index) => {
      this.currencyService.getCurrentCurrency(currency).subscribe(data => {
        this.currencyArrayValues[index] = data.rates.UAH
      })
    })
  }
}

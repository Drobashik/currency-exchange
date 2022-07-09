import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CurrencyConverter } from "./currency-converter";


@Injectable({
    providedIn: 'root',
})
export class CurrencyService {

    constructor(private http: HttpClient) {}

    urlLatest: string = 'https://api.exchangerate.host/latest/';
    urlConverter: string = 'https://api.exchangerate.host/convert'
    
    getCurrentCurrency(currency: string): Observable<CurrencyConverter> {
        return this.http.get<CurrencyConverter>(`${this.urlLatest}?base=${currency}`)
    }

    convertCurrency(from: string = 'EUR', to: string = 'Eur'): Observable<CurrencyConverter> {
        return this.http.get<CurrencyConverter>(`${this.urlConverter}?from=${from}&to=${to}`)
    }

}
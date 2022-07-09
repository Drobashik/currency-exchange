import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICurrencyConverter } from "./currency-converter";

@Injectable({
    providedIn: 'root',
})

export class CurrencyService {

    constructor(private http: HttpClient) {}

    urlLatest: string = 'https://api.exchangerate.host/latest/';
    urlConverter: string = 'https://api.exchangerate.host/convert'
    
    getCurrentCurrency(currency: string): Observable<ICurrencyConverter> {
        return this.http.get<ICurrencyConverter>(`${this.urlLatest}?base=${currency}`)
    }

    convertCurrency(from: string = 'EUR', to: string = 'EUR'): Observable<ICurrencyConverter> {
        return this.http.get<ICurrencyConverter>(`${this.urlConverter}?from=${from}&to=${to}`)
    }

}
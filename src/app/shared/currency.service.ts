import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class CurrencyService {

    constructor(private http: HttpClient) {}
    
    getCurrentCurrency(currency: string): Observable<any> {
        return this.http.get<any>(`https://api.exchangerate.host/latest/?base=${currency}`)
    }

    convertCurrency(from: string = 'EUR', to: string = 'Eur') {
        return this.http.get<any>(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
    }

}
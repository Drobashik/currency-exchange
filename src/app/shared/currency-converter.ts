export interface CurrencyConverter {
    result: number;
    rates: {
        UAH: number;
        USD: number;
        EUR: number;
    }
}

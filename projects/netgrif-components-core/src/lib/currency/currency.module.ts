import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, DecimalPipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import sk from '@angular/common/locales/sk';
import de from '@angular/common/locales/de';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [CurrencyPipe, DecimalPipe]
})
export class CurrencyModule {

    constructor() {
        registerLocaleData(en);
        registerLocaleData(sk);
        registerLocaleData(de);
    }
}

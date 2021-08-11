import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import sk from '@angular/common/locales/sk';
import de from '@angular/common/locales/de';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [CurrencyPipe]
})
export class CurrencyModule {

    constructor() {
        registerLocaleData(en);
        registerLocaleData(sk);
        registerLocaleData(de);
    }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicAuthenticationService} from './services/basic-authentication.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [BasicAuthenticationService]
})
export class BasicAuthenticationModule {
}

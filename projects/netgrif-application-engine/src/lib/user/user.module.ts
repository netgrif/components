import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import {RouterModule} from '@angular/router';
import {TranslateLibModule} from '../translate/translate-lib.module';


@NgModule({
    declarations: [UserCardComponent],
    exports: [
        UserCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class UserModule {
}

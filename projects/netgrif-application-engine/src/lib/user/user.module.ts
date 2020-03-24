import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [UserCardComponent],
    exports: [
        UserCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ]
})
export class UserModule {
}

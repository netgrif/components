import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';


@NgModule({
    declarations: [ProfileComponent],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class ProfileModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MaterialModule} from '../material/material.module';
import {CovalentModule} from '../covalent/covalent.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomDateAdapter} from './date-field/models/custom-date-adapter';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {DateAdapter} from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        ReactiveFormsModule,
        TranslateLibModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter}
    ]
})
export class DataFieldsModule {

}

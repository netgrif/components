import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {AngularResizeEventModule} from 'angular-resize-event';
import {CovalentModule} from '../covalent/covalent.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomDateAdapter} from './date-field/models/custom-date-adapter';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {DateAdapter} from '@angular/material/core';
import {FrontActionsRegistryService} from "../registry/front-actions-registry.service";
import {clickFunction} from "./models/front-action-definitions";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AngularResizeEventModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        TranslateLibModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter}
    ]
})
export class DataFieldsModule {

    constructor(frontActionsRegistry: FrontActionsRegistryService) {
        frontActionsRegistry.register('redirect', clickFunction)
    }
}

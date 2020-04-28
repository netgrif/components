import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericSnackBarComponent} from './components/generic-snack-bar/generic-snack-bar.component';
import {MaterialModule} from '../material/material.module';
import {WarningSnackBarComponent} from './components/warning-snack-bar/warning-snack-bar.component';
import {ErrorSnackBarComponent} from './components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from './components/success-snack-bar/success-snack-bar.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';


@NgModule({
    declarations: [
        GenericSnackBarComponent,
        WarningSnackBarComponent,
        ErrorSnackBarComponent,
        SuccessSnackBarComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FlexModule
    ],
    entryComponents: [
        GenericSnackBarComponent,
        WarningSnackBarComponent,
        ErrorSnackBarComponent,
        SuccessSnackBarComponent
    ]
})
export class SnackBarModule {
}

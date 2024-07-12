import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AlertDialogComponent} from './alert-dialog.component';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MaterialModule} from '../../../material/material.module';


@NgModule({
    declarations: [
        AlertDialogComponent
    ],
    exports: [
        AlertDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ]
})
export class AlertDialogModule {
}

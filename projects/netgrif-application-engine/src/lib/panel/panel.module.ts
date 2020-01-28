import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RegistrationPanelComponent} from './registration-panel/registration-panel.component';

@NgModule({
    declarations: [RegistrationPanelComponent],
    exports: [
        RegistrationPanelComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class PanelModule {
}

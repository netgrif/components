import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
    declarations: [ProfileComponent],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatListModule,
        MatGridListModule,
        MatChipsModule,
    ]
})
export class ProfileModule {
}

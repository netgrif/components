import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    declarations: [ProfileComponent],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        MatInputModule
    ]
})
export class ProfileComponentModule {
}

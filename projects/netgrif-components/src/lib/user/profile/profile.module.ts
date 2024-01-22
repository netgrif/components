import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {MatLegacyChipsModule} from '@angular/material/legacy-chips';


@NgModule({
    declarations: [ProfileComponent],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        MatLegacyChipsModule
    ]
})
export class ProfileComponentModule {
}

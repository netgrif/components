import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {UserCardComponent} from './user-card/user-card.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [UserCardComponent],
    exports: [
        UserCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class UserComponentModule {
}

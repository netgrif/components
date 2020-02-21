import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CovalentHighlightModule } from '@covalent/highlight';
import {CovalentCommonModule, CovalentLayoutModule, CovalentStepsModule} from "@covalent/core";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        CovalentHighlightModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentCommonModule
    ]
})
export class CovalentModule {
}

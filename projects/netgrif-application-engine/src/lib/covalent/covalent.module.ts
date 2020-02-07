import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CovalentHighlightModule } from '@covalent/highlight';
import {CovalentCommonModule, CovalentLayoutModule, CovalentStepsModule} from "@covalent/core";
import {CovalentMarkdownModule} from "@covalent/markdown";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        CovalentHighlightModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentMarkdownModule,
        CovalentCommonModule
    ]
})
export class CovalentModule {
}

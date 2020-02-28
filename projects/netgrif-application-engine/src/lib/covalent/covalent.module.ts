import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CovalentHighlightModule} from "@covalent/highlight";
import {CovalentMarkdownModule} from "@covalent/markdown";
import {CovalentCommonModule, CovalentLayoutModule, CovalentStepsModule} from "@covalent/core";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CovalentHighlightModule,
        CovalentMarkdownModule
    ],
    exports: [
        CovalentHighlightModule,
        CovalentMarkdownModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentCommonModule
    ]
})
export class CovalentModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CovalentHighlightModule} from "@covalent/highlight";
import {CovalentMarkdownModule} from "@covalent/markdown";
import {CovalentCommonModule} from '@covalent/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CovalentCommonModule,
        CovalentHighlightModule,
        CovalentMarkdownModule
    ],
    exports: [
        CovalentCommonModule,
        CovalentHighlightModule,
        CovalentMarkdownModule
    ]
})
export class CovalentModule {
}

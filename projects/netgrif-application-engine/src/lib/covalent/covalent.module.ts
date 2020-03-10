import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CovalentHighlightModule} from "@covalent/highlight";
import {CovalentMarkdownModule} from "@covalent/markdown";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CovalentHighlightModule,
        CovalentMarkdownModule
    ],
    exports: [
        CovalentHighlightModule,
        CovalentMarkdownModule
    ]
})
export class CovalentModule {
}

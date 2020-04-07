import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {CovalentCommonModule} from '@covalent/core/common';
import {CovalentLayoutModule} from '@covalent/core/layout';
import {CovalentStepsModule} from '@covalent/core/steps';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CovalentCommonModule,
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

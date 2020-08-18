import {NgModule} from '@angular/core';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {CovalentCommonModule} from '@covalent/core/common';
import {CovalentLayoutModule} from '@covalent/core/layout';
import {CovalentStepsModule} from '@covalent/core/steps';
import {CovalentTextEditorModule} from '@covalent/text-editor';


@NgModule({
    exports: [
        CovalentHighlightModule,
        CovalentMarkdownModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentCommonModule,
        CovalentTextEditorModule,
    ]
})
export class CovalentModule {
}

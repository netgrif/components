import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FlexModule} from '@ngbracket/ngx-layout';
import {ResizableModule} from 'angular-resizable-element';
import {MonacoEditorModule, NgxMonacoEditorConfig} from 'ngx-monaco-editor-v2';
import {ActionEditorListComponent} from './action-editor-list/action-editor-list.component';
import {
  ActionEditorMenuDescriptionComponent,
} from './action-editor-menu/action-editor-menu-description/action-editor-menu-description.component';
import {
  ActionEditorMenuItemComponent,
} from './action-editor-menu/action-editor-menu-item/action-editor-menu-item.component';
import {SafeHtmlPipe} from './action-editor-menu/action-editor-menu-item/safe-html.pipe';
import {ActionEditorMenuComponent} from './action-editor-menu/action-editor-menu.component';
import {ActionEditorComponent} from './action-editor/action-editor.component';
import {actionCompletionProvider} from './definitions/completion-provider';
import {tokenProvider} from './definitions/tokens';
import {FunctionEditorComponent} from './function-editor/function-editor.component';
import {MaterialModule} from '@netgrif/components-core';

declare var monaco: any;

export function onMonacoLoad() {
    monaco.languages.register({id: 'petriflow'});
    monaco.languages.setMonarchTokensProvider('petriflow', tokenProvider() as any);
    monaco.languages.registerCompletionItemProvider('petriflow', {
        provideCompletionItems(model, position) {
            return actionCompletionProvider(model, position, monaco.languages)  ;
        }
    } as any);
}

const monacoConfig: NgxMonacoEditorConfig = {
    defaultOptions: {
        scrollBeyondLastLine: false,
    }, // pass default options to be used
    onMonacoLoad // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
    declarations: [
        ActionEditorComponent,
        ActionEditorListComponent,
        ActionEditorMenuComponent,
        ActionEditorMenuDescriptionComponent,
        ActionEditorMenuItemComponent,
        SafeHtmlPipe,
        FunctionEditorComponent
    ],
    exports: [
        ActionEditorListComponent,
        FunctionEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexModule,
        MaterialModule,
        MonacoEditorModule.forRoot(monacoConfig),
        ResizableModule,
    ]
})
export class ActionEditorModule {
}

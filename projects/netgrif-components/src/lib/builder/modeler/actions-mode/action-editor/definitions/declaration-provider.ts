import {TranslateService} from "@ngx-translate/core";

export function declarationCompleteProvider(range, languages, translateService: TranslateService) {
    return [
        {
            label: 'f.',
            kind: languages.CompletionItemKind.Field,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.declaration-provider.dataVariableId'),
            insertText: 'f.',
            range
        },
        {
            label: 't.',
            kind: languages.CompletionItemKind.Field,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.declaration-provider.dataVariableId'),
            insertText: 't.',
            range
        }
    ];
}

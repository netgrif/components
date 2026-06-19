
export function declarationCompleteProvider(range, languages) {
    return [
        {
            label: 'f.',
            kind: languages.CompletionItemKind.Field,
            documentation: 'ID of DataVariable for declare a varable in Action.',
            insertText: 'f.',
            range
        },
        {
            label: 't.',
            kind: languages.CompletionItemKind.Field,
            documentation: 'ID of Transition for declare a varable in Action.',
            insertText: 't.',
            range
        }
    ];
}

import {declarationCompleteProvider} from './declaration-provider';
import {functionCompletionProposals} from './function-provider';

export function actionCompletionProvider(model, position, languages) {
    // find out if we are completing a property in the 'dependencies' object.
    // const textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
    let definition = true;
    for (let i = 1; i < position.lineNumber; i++) {
        if (!model.getLineContent(i).match(/^\s*\w+(?:\w|\d)*\s*:\s*[ft]\.(?:\w|\d)*,\s*$/)) {
            definition = false;
            break;
        }
    }
    if (definition) {
        let def = model.getLineContent(position.lineNumber);
        def = def.substring(0, position.column - 1);
        if (def.includes(':')) {
            let delimeter = def.split(':')[1].search(/\S/);
            if (delimeter === -1) {
                delimeter = 0;
            }
            const wordStart = def.split(':')[0].length + 1 + delimeter;
            const r = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: wordStart + 1,
                endColumn: position.column
            };
            return {
                suggestions: declarationCompleteProvider(r, languages)
            }; // CALL RESOLVER OF VARIABLES
        }
        return {suggestions: []};
    }
    const word = model.getWordUntilPosition(position);
    const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
    };
    return {
        suggestions: functionCompletionProposals(range, languages)
    };
}

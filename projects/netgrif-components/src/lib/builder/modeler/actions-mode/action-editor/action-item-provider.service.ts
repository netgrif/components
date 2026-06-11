import {Injectable} from '@angular/core';

@Injectable()
export class ActionItemProviderService {

    actionKeywords: Array<string> = ['transition', 'datafield', 'datafieldId', 'transitionId',
        'task', 'behaviour', 'condition', 'property', 'processInstanceId', 'value', 'choices',
        'options', 'dataSet', 'type', 'taskPredicate', 'casePredicate'];
    variables: Array<string> = [
        '[a,b,c]',
        '["a","b","c"]',
        '',
        '[a:a,b:b]',
        '["a":"a","b":"b"]',
        'dataSet',
        '//Process instance ID can be found in your NAE app',
        '[<datafieldId>: ["value": <value>,"type": <type>],\n \t\t\t   <datafieldId>: ["value": <value>,"type": <type>]]',
        '[<datafieldId>: ["value": <value>,"type": <type>]]'];
    variableNumber = 1;

    constructor() {
    }

    insertText(editorObject, value: string, type) {
        const line = editorObject.getPosition().lineNumber;
        if (!this.actionKeywords.includes(editorObject.getModel().getWordAtPosition(editorObject.getPosition())?.word)) {
            const pos = editorObject.getPosition();
            const range = {
                startLineNumber: line, startColumn: pos.column, endLineNumber: line, endColumn: pos.column
            };
            const id = {major: 1, minor: 1};
            if (this.variables.includes(value)) {
                const varName = 'variable' + this.variableNumber;
                const op = {identifier: id, range, text: varName, forceMoveMarkers: true};
                editorObject.executeEdits('my-source', [op]);
            } else {
                const op = {identifier: id, range, text: value, forceMoveMarkers: true};
                editorObject.executeEdits('my-source', [op]);
            }
        } else {
            const pos = editorObject.getModel().getWordAtPosition(editorObject.getPosition());
            const range = {
                startLineNumber: line, startColumn: pos.startColumn - 1, endLineNumber: line, endColumn: pos.endColumn + 1
            };
            const id = {major: 1, minor: 1};
            if (pos.word !== 'transitionId' && pos.word !== 'datafieldId') {
                if (this.variables.includes(value)) {
                    const varName = 'variable' + this.variableNumber;
                    const op = {identifier: id, range, text: varName, forceMoveMarkers: true};
                    editorObject.executeEdits('my-source', [op]);
                } else {
                    const op = {identifier: id, range, text: value, forceMoveMarkers: true};
                    editorObject.executeEdits('my-source', [op]);
                }
            } else {
                const op = {identifier: id, range, text: '"' + value + '"', forceMoveMarkers: true};
                editorObject.executeEdits('my-source', [op]);
                return;
            }
        }
        this.checkReference(value, editorObject, type);
        const position = editorObject?.getPosition();
        editorObject?.setPosition(position);
        editorObject.focus();
        editorObject.saveViewState();
    }

    referenceField(editorObject, value, ref) {
        const regex = new RegExp(/(.)+:( )*([tf])\.(.)+;/);
        const initialised = regex.test(editorObject.getValue());
        const range = {
            startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1
        };
        const id = {major: 1, minor: 1};
        const text = value + ': ' + ref + value + (initialised ? ',' : ';') + '\n';
        const op = {identifier: id, range, text, forceMoveMarkers: true};
        editorObject.executeEdits('my-source', [op]);
    }

    newVariable(editorObject, value) {
        const regex = new RegExp(/(.)+:( )*([tf])\.(.)+;/);
        const initialised = regex.test(editorObject.getValue());
        let line = 0;
        if (initialised) {
            line = editorObject.getValue().split(/\r\n|\r|\n/).indexOf(regex.exec(editorObject.getValue())[0]) + 2;
        }
        const range = {
            startLineNumber: line, startColumn: 1, endLineNumber: line, endColumn: 1
        };
        const id = {major: 1, minor: 1};
        const varName = 'variable' + this.variableNumber;
        this.variableNumber++;
        const text = 'def ' + varName + ' = ' + value + ';' + '\n';
        const op = {identifier: id, range, text, forceMoveMarkers: true};
        editorObject.executeEdits('my-source', [op]);
        return varName;
    }

    checkSyntax(editorObject): void {
        const content = editorObject.getValue().split(/\r\n|\r|\n/);
        const referencesMap = new Map();
        const referenceRegex = /(.)+:( )*([tf])\.(.)+[,;]/g;
        content.forEach((row, index) => {
            if (row.match(referenceRegex)) {
                referencesMap.set(index, row);
            }
        });
        this.fixSyntaxIfNeeded(referencesMap, content, editorObject);
    }

    private fixSyntaxIfNeeded(referencesMap: Map<number, string>, content, editorObject) {
        let fixNeeded = false;
        referencesMap.forEach((value, key) => {
            if (key !== referencesMap.size - 1 && content[key].slice(content[key].length - 1) === ';') {
                content[key] = content[key].replace(/;$/, ',');
                fixNeeded = true;
            } else if (key === referencesMap.size - 1 && content[key].slice(content[key].length - 1) === ',') {
                content[key] = content[key].replace(/,$/, ';');
                fixNeeded = true;
            }
        });
        if (!fixNeeded) {
            return;
        }
        for (let i = 0; i < content.length - 1; i++) {
            if (content[i].substr(content[i].length - 1) !== '\n') {
                content[i] += '\n';
            }
        }
        editorObject.setValue(content.join(''));
    }

    checkReference(value, editorObject, type) {
        this.checkSyntax(editorObject);
        if (type === 'transition' && !editorObject.getValue().includes('t.' + value)) {
            this.referenceField(editorObject, value, 't.');
        } else if (type === 'datafield' && !editorObject.getValue().includes('f.' + value)) {
            this.referenceField(editorObject, value, 'f.');
        } else if (this.variables.includes(value)) {
            this.newVariable(editorObject, value);
        }
    }

    actionsKeywordsListen(editorObject: any, actionEditor, trigger, keywords: Array<string>) {
        const line = editorObject.getPosition().lineNumber;
        const wordAtPosition = editorObject.getModel().getWordAtPosition(editorObject.getPosition());
        const lineContent = editorObject.getModel().getLineContent(line);
        const wordOnPosition = lineContent.substring(wordAtPosition?.startColumn - 2, wordAtPosition?.endColumn);
        if (keywords.includes(wordOnPosition)) {
            actionEditor.openReference();
            trigger.openMenu();
            trigger.updatePosition();
        }
    }
}

import {OperatorTemplatePartType} from './operator-template-part-type';
import {FormControl} from '@angular/forms';

/**
 * Represents a process operator template part/segment.
 *
 * Is used to be iterated over by ngFor to display a combination of text segments and user inputs that together create an operator input GUI
 */
export class OperatorTemplatePart {
    protected _type: OperatorTemplatePartType;
    protected _content: string | FormControl;

    /**
     * The
     * @param part either the displayed text or a `FormControl` object, that represents the operator template segment.
     */
    constructor(part: string | FormControl) {
        this._content = part;
        this._type = typeof part === 'string' ? OperatorTemplatePartType.TEXT : OperatorTemplatePartType.INPUT;
    }

    /**
     * @returns [TEXT]{@link OperatorTemplatePartType#TEXT} if the segment is a text (content has type `string`),
     * or [INPUT]{@link OperatorTemplatePartType#INPUT} if the segment is an input field (content has type `FormControl`)
     */
    public get type(): OperatorTemplatePartType {
        return this._type;
    }

    public get content(): string | FormControl {
        return this._content;
    }
}

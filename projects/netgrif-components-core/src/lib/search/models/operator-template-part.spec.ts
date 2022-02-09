import {OperatorTemplatePart} from './operator-template-part';
import {OperatorTemplatePartType} from './operator-template-part-type';
import {FormControl} from '@angular/forms';

describe('OperatorTemplatePart', () => {
    it('should create with type TEXT', () => {
        const template = new OperatorTemplatePart('text', 0);
        expect(template).toBeTruthy();
        expect(template.type).toEqual(OperatorTemplatePartType.TEXT);
        expect(template.content).toEqual('text');
    });

    it('should create with type INPUT', () => {
        const fc = new FormControl();
        const template = new OperatorTemplatePart(fc, 0);
        expect(template).toBeTruthy();
        expect(template.type).toEqual(OperatorTemplatePartType.INPUT);
        expect(template.content).toEqual(fc);
    });
});

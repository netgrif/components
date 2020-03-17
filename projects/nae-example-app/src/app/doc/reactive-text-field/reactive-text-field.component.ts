import {Component} from '@angular/core';
import {ChangedFields, TextField} from 'netgrif-application-engine';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
    selector: 'nae-app-reactive-text-field',
    templateUrl: './reactive-text-field.component.html',
    styleUrls: ['./reactive-text-field.component.scss']
})
export class ReactiveTextFieldComponent {
    readonly TITLE = 'Reactive text field';
    readonly DESCRIPTION = 'Reactive text field test/playground';

    field = new TextField('fieldId', 'Reactive text field', 'hello', {visible: true, editable: true});
    fieldGroupControl = new FormGroup({
        fieldId: new FormControl(this.field.value)
    });
    fieldFormControl = this.fieldGroupControl.get('fieldId') as FormControl;

    changeGroupControl = new FormGroup({
        value: new FormControl(this.field.value),
        required: new FormControl(false)
    });

    changeStream = new Subject<ChangedFields>();

    constructor() {
    }

    change() {
        this.changeStream.next({
            fieldId: {
                behavior: {
                    required: this.changeGroupControl.get('required').value
                },
                value: this.changeGroupControl.get('value').value
            }
        });
    }

    changeOther() {
        this.changeStream.next({
            otherId: {
                behavior: {
                    required: this.changeGroupControl.get('required').value
                },
                value: this.changeGroupControl.get('value').value
            }
        });
    }
}

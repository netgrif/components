import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ChangedFields, TextField, TextFieldComponent} from '@netgrif/application-engine';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
    selector: 'nae-app-reactive-text-field',
    templateUrl: './reactive-text-field.component.html',
    styleUrls: ['./reactive-text-field.component.scss']
})
export class ReactiveTextFieldComponent implements AfterViewInit {

    readonly TITLE = 'Reactive text field';
    readonly DESCRIPTION = 'Reactive text field test/playground';

    @ViewChild('fieldComponent') naeTextField: TextFieldComponent;

    field = new TextField('fieldId', 'Reactive text field', 'hello', {visible: true, editable: true});
    changeStream = new Subject<ChangedFields>();
    changeGroupControl = new FormGroup({
        value: new FormControl(this.field.value),
        required: new FormControl(false)
    });

    fieldGroupControl: FormGroup;

    viewInitialized = false;

    ngAfterViewInit(): void {
        this.fieldGroupControl = new FormGroup({
            fieldId: new FormControl(this.field.value)
        });
        this.viewInitialized = true;
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

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    ChangedFields,
    TextField,
    TextFieldComponent,
    BooleanFieldComponent,
    BooleanField,
    DateField,
    DateFieldComponent
} from '@netgrif/application-engine';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
    selector: 'nae-app-reactive-text-field',
    templateUrl: './reactive-text-field.component.html',
    styleUrls: ['./reactive-text-field.component.scss']
})
export class ReactiveTextFieldComponent implements AfterViewInit {

    readonly TITLE = 'Reactive forms';
    readonly DESCRIPTION = 'Reactive datafields test/playground';

    // TEXTFIELD
    @ViewChild('textFieldComponent') naeTextField: TextFieldComponent;
    textField = new TextField('textFieldId', 'Reactive text field', 'hello', {visible: true, editable: true});

    // BOOLEANFIELD
    @ViewChild('booleanFieldComponent') naeBooleanField: BooleanFieldComponent;
    booleanField = new BooleanField('booleanFieldId', 'Reactive boolean field', true, {visible: true, editable: true});

    // DateFIELD
    @ViewChild('dateFieldComponent') naeDateField: DateFieldComponent;
    dateField = new DateField('dateFieldId', 'Reactive date field', new Date('2020-03-09'), {visible: true, editable: true});

    changeStream = new Subject<ChangedFields>();
    changeGroupControl = new FormGroup({

        textFieldValue: new FormControl(this.textField.value),
        textFieldRequired: new FormControl(false),

        booleanFieldValue: new FormControl(this.booleanField.value),
        booleanFieldRequired: new FormControl(false),

        dateFieldValue: new FormControl(this.dateField.value),
        dateFieldRequired: new FormControl(false),
    });

    fieldGroupControl: FormGroup;

    viewInitialized = false;

    ngAfterViewInit(): void {
        this.fieldGroupControl = new FormGroup({
            textFieldId: new FormControl(this.textField.value),
            booleanFieldId: new FormControl(this.booleanField.value),
            dateFieldId: new FormControl(this.booleanField.value)
        });
        this.viewInitialized = true;
    }

    change() {
        this.changeStream.next({
            textFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('textFieldRequired').value
                },
                value: this.changeGroupControl.get('textFieldValue').value
            },
            booleanFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('booleanFieldRequired').value
                },
                value: this.changeGroupControl.get('booleanFieldValue').value
            },
            dateFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('dateFieldRequired').value
                },
                value: this.changeGroupControl.get('dateFieldValue').value
            },
        });
    }
}

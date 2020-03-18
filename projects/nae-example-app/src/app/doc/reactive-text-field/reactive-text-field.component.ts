import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    ChangedFields,
    TextField,
    TextFieldComponent,
    BooleanField,
    BooleanFieldComponent,
    NumberField,
    NumberFieldComponent,
    DateField,
    DateFieldComponent,
    DateTimeField,
    DateTimeFieldComponent
} from '@netgrif/application-engine';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
    selector: 'nae-app-reactive-text-field',
    templateUrl: './reactive-text-field.component.html',
    styleUrls: ['./reactive-text-field.component.scss']
})
export class ReactiveTextFieldComponent implements AfterViewInit {

    readonly TITLE = 'Reactive forms';
    readonly DESCRIPTION = 'Reactive datafields test/playground';

    constructor(private formBuilder: FormBuilder) {
    }

    // TEXT FIELD
    @ViewChild('textFieldComponent') naeTextField: TextFieldComponent;
    textField = new TextField('textFieldId', 'Reactive text field', 'hello', {visible: true, editable: true});

    // BOOLEAN FIELD
    @ViewChild('booleanFieldComponent') naeBooleanField: BooleanFieldComponent;
    booleanField = new BooleanField('booleanFieldId', 'Reactive boolean field', true, {visible: true, editable: true});

    // NUMBER FIELD
    @ViewChild('numberFieldComponent') naeNumberField: NumberFieldComponent;
    numberField = new NumberField('numberFieldId', 'Reactive number field', 7, {visible: true, editable: true});

    // DATE FIELD
    @ViewChild('dateFieldComponent') naeDateField: DateFieldComponent;
    dateField = new DateField('dateFieldId', 'Reactive date field', new Date('2020-03-09'), {visible: true, editable: true});

    // DATE TIME FIELD
    @ViewChild('dateTimeFieldComponent') naeDateTimeField: DateTimeFieldComponent;
    dateTimeField = new DateTimeField('dateTimeFieldId', 'Reactive date time field', new Date('2020-03-09'),
        {visible: true, editable: true});

    changeStream = new Subject<ChangedFields>();

    changeGroupControl = this.formBuilder.group({
        textFieldValue: [this.textField.value],
        textFieldRequired: [false],
        booleanFieldValue: [this.booleanField.value],
        booleanFieldRequired: [false],
        numberFieldValue: [this.numberField.value],
        numberFieldRequired: [false],
        dateFieldValue: [this.dateField.value],
        dateFieldRequired: [false],
        dateTimeFieldValue: [this.dateTimeField.value],
        dateTimeFieldRequired: [false],
    });

    fieldGroupControl = new FormGroup({});

    viewInitialized = false;

    ngAfterViewInit(): void {
        const fields = [
            {stringId: this.textField.stringId, component: this.naeTextField},
            {stringId: this.booleanField.stringId, component: this.naeBooleanField},
            {stringId: this.numberField.stringId, component: this.naeNumberField},
            {stringId: this.dateField.stringId, component: this.naeDateField},
            {stringId: this.dateTimeField.stringId, component: this.naeDateTimeField}];
        fields.forEach( field => {
            this.addControl(field);
        });
        setTimeout(() => {
            this.viewInitialized = true;
        });
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
            numberFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('numberFieldRequired').value
                },
                value: this.changeGroupControl.get('numberFieldValue').value
            },
            dateFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('dateFieldRequired').value
                },
                value: this.changeGroupControl.get('dateFieldValue').value
            },
            dateTimeFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('dateTimeFieldRequired').value
                },
                value: this.changeGroupControl.get('dateTimeFieldValue').value
            },
        });
    }

    private addControl(field): void {
        this.fieldGroupControl.addControl(field.stringId, field.component.formControl);
    }
}

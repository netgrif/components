import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    BooleanField,
    BooleanFieldComponent,
    ChangedFields,
    DateField,
    DateFieldComponent,
    DateTimeField,
    DateTimeFieldComponent,
    EnumerationField,
    EnumerationFieldComponent,
    EnumerationFieldView,
    MaterialAppearance,
    NumberField,
    NumberFieldComponent,
    TextField,
    TextFieldComponent
} from '@netgrif/application-engine';
import {FormBuilder, FormGroup} from '@angular/forms';
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

    // ENUM SELECT FIELD
    @ViewChild('enumSelectFieldComponent') naeEnumSelectField: EnumerationFieldComponent;
    enumSelectField = new EnumerationField('enumSelectFieldId', 'Reactive enum select field', '',
        [{key: 'option1', value: 'Option1'}, { key: 'option2', value: 'Option2'}], {visible: true, editable: true});

    // ENUM SELECT FIELD
    @ViewChild('enumListFieldComponent') naeEnumListField: EnumerationFieldComponent;
    enumListField = new EnumerationField('enumListFieldId', 'Reactive enum list field', '',
        [{key: 'option1', value: 'Option1'}, { key: 'option2', value: 'Option2'}], {visible: true, editable: true},
        '', '', MaterialAppearance.STANDARD, EnumerationFieldView.LIST);

    // ENUM AUTO COMPLETE FIELD
    @ViewChild('enumAutoFieldComponent') naeEnumAutoField: EnumerationFieldComponent;
    enumAutoField = new EnumerationField('enumAutoFieldId', 'Reactive enum autocomplete field', '',
        [{key: 'option1', value: 'Option1'}, { key: 'option2', value: 'Option2'}], {visible: true, editable: true},
        '', '', MaterialAppearance.STANDARD, EnumerationFieldView.AUTOCOMPLETE);

    changeStream = new Subject<ChangedFields>();

    changeGroupControl = this.formBuilder.group({
        textFieldValue: [this.textField.value],
        textFieldRequired: [false],
        textFieldDisabled: [false],
        textFieldHidden: [false],
        booleanFieldValue: [this.booleanField.value],
        booleanFieldRequired: [false],
        booleanFieldDisabled: [false],
        booleanFieldHidden: [false],
        numberFieldValue: [this.numberField.value],
        numberFieldRequired: [false],
        numberFieldDisabled: [false],
        numberFieldHidden: [false],
        dateFieldValue: [this.dateField.value],
        dateFieldRequired: [false],
        dateFieldDisabled: [false],
        dateFieldHidden: [false],
        dateTimeFieldValue: [this.dateTimeField.value],
        dateTimeFieldRequired: [false],
        dateTimeFieldDisabled: [false],
        dateTimeFieldHidden: [false],
        enumSelectFieldValue: [this.enumSelectField.value],
        enumSelectFieldRequired: [false],
        enumSelectFieldDisabled: [false],
        enumSelectFieldHidden: [false],
        enumListFieldValue: [this.enumListField.value],
        enumListFieldRequired: [false],
        enumListFieldDisabled: [false],
        enumListFieldHidden: [false],
        enumAutoFieldValue: [this.enumListField.value],
        enumAutoFieldRequired: [false],
        enumAutoFieldDisabled: [false],
        enumAutoFieldHidden: [false],
    });

    fieldGroupControl = new FormGroup({});

    viewInitialized = false;

    ngAfterViewInit(): void {
        const fields = [
            {stringId: this.textField.stringId, component: this.naeTextField},
            {stringId: this.booleanField.stringId, component: this.naeBooleanField},
            {stringId: this.numberField.stringId, component: this.naeNumberField},
            {stringId: this.dateField.stringId, component: this.naeDateField},
            {stringId: this.dateTimeField.stringId, component: this.naeDateTimeField},
            {stringId: this.enumSelectField.stringId, component: this.naeEnumSelectField},
            {stringId: this.enumListField.stringId, component: this.naeEnumListField},
            {stringId: this.enumAutoField.stringId, component: this.naeEnumAutoField}];
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
                    required: this.changeGroupControl.get('textFieldRequired').value,
                    hidden: this.changeGroupControl.get('textFieldHidden').value,
                    editable: !this.changeGroupControl.get('textFieldDisabled').value,
                },
                value: this.changeGroupControl.get('textFieldValue').value
            },
            booleanFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('booleanFieldRequired').value,
                    hidden: this.changeGroupControl.get('booleanFieldHidden').value,
                    editable: !this.changeGroupControl.get('booleanFieldDisabled').value,
                },
                value: this.changeGroupControl.get('booleanFieldValue').value
            },
            numberFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('numberFieldRequired').value,
                    hidden: this.changeGroupControl.get('numberFieldHidden').value,
                    editable: !this.changeGroupControl.get('numberFieldDisabled').value,
                },
                value: this.changeGroupControl.get('numberFieldValue').value
            },
            dateFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('dateFieldRequired').value,
                    hidden: this.changeGroupControl.get('dateFieldHidden').value,
                    editable: !this.changeGroupControl.get('dateFieldDisabled').value,
                },
                value: this.changeGroupControl.get('dateFieldValue').value
            },
            dateTimeFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('dateTimeFieldRequired').value,
                    hidden: this.changeGroupControl.get('dateTimeFieldHidden').value,
                    editable: !this.changeGroupControl.get('dateTimeFieldDisabled').value,
                },
                value: this.changeGroupControl.get('dateTimeFieldValue').value
            },
            enumSelectFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('enumSelectFieldRequired').value,
                    hidden: this.changeGroupControl.get('enumSelectFieldHidden').value,
                    editable: !this.changeGroupControl.get('enumSelectFieldDisabled').value,
                },
                value: this.changeGroupControl.get('enumSelectFieldValue').value
            },
            enumListFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('enumListFieldRequired').value,
                    hidden: this.changeGroupControl.get('enumListFieldHidden').value,
                    editable: !this.changeGroupControl.get('enumListFieldDisabled').value,
                },
                value: this.changeGroupControl.get('enumListFieldValue').value
            },
            enumAutoFieldId: {
                behavior: {
                    required: this.changeGroupControl.get('enumAutoFieldRequired').value,
                    hidden: this.changeGroupControl.get('enumAutoFieldHidden').value,
                    editable: !this.changeGroupControl.get('enumAutoFieldDisabled').value,
                },
                value: this.changeGroupControl.get('enumAutoFieldValue').value
            }
        });
    }

    private addControl(field): void {
        this.fieldGroupControl.addControl(field.stringId, field.component.formControl);
    }
}

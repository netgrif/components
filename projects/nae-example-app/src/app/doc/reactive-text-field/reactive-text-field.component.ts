import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    BooleanField,
    BooleanFieldComponent,
    Change,
    ChangedFields,
    DataField,
    DateField,
    DateFieldComponent,
    DateTimeField,
    DateTimeFieldComponent,
    EnumerationField,
    EnumerationFieldComponent,
    EnumerationFieldView,
    MaterialAppearance,
    MultichoiceField,
    MultichoiceFieldComponent,
    MultichoiceFieldView,
    NumberField,
    NumberFieldComponent,
    TextField,
    TextFieldComponent,
    TextFieldView
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

    // TEXT AREA FIELD
    @ViewChild('textAreaFieldComponent') naeTextAreaField: TextFieldComponent;
    textAreaField = new TextField('textAreaFieldId', 'Reactive text area field', 'hello world', {visible: true, editable: true},
        undefined, undefined, undefined, undefined, TextFieldView.TEXTAREA);

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

    // MULTICHOICE LIST FIELD
    @ViewChild('multichoiceListFieldComponent') naeMultichoiceListField: MultichoiceFieldComponent;
    multichoiceListField = new MultichoiceField('multichoiceListFieldId', 'Reactive multichoice list field', ['a', 'b'],
        [{key: 'a', value: 'Alice'}, {key: 'b', value: 'Bob'}, {key: 'c', value: 'Claire'}], {visible: true, editable: true},
        undefined, undefined, undefined, MultichoiceFieldView.LIST);

    // MULTICHOICE SELECT FIELD
    @ViewChild('multichoiceSelectFieldComponent') naeMultichoiceSelectField: MultichoiceFieldComponent;
    multichoiceSelectField = new MultichoiceField('multichoiceSelectFieldId', 'Reactive multichoice select field', ['a', 'b'],
        [{key: 'a', value: 'Alice'}, {key: 'b', value: 'Bob'}, {key: 'c', value: 'Claire'}], {visible: true, editable: true});

    changeStream = new Subject<ChangedFields>();

    changeGroupControl = this.formBuilder.group({
        ...this.constructFormBuilderObject('text', this.textField),
        ...this.constructFormBuilderObject('textArea', this.textAreaField),
        ...this.constructFormBuilderObject('boolean', this.booleanField),
        ...this.constructFormBuilderObject('number', this.numberField),
        ...this.constructFormBuilderObject('date', this.dateField),
        ...this.constructFormBuilderObject('dateTime', this.dateTimeField),
        ...this.constructFormBuilderObject('enumSelect', this.enumSelectField),
        ...this.constructFormBuilderObject('enumList', this.enumListField),
        ...this.constructFormBuilderObject('enumAuto', this.enumAutoField),
        ...this.constructFormBuilderObject('multichoiceList', this.multichoiceListField),
        ...this.constructFormBuilderObject('multichoiceSelect', this.multichoiceSelectField),
    });

    fieldGroupControl = new FormGroup({});
    fieldGroupInitialized = false;

    ngAfterViewInit(): void {
        const fields = [
            {stringId: this.textField.stringId, component: this.naeTextField},
            {stringId: this.textAreaField.stringId, component: this.naeTextAreaField},
            {stringId: this.booleanField.stringId, component: this.naeBooleanField},
            {stringId: this.numberField.stringId, component: this.naeNumberField},
            {stringId: this.dateField.stringId, component: this.naeDateField},
            {stringId: this.dateTimeField.stringId, component: this.naeDateTimeField},
            {stringId: this.enumSelectField.stringId, component: this.naeEnumSelectField},
            {stringId: this.enumListField.stringId, component: this.naeEnumListField},
            {stringId: this.enumAutoField.stringId, component: this.naeEnumAutoField},
            {stringId: this.multichoiceListField.stringId, component: this.naeMultichoiceListField},
            {stringId: this.multichoiceSelectField.stringId, component: this.naeMultichoiceSelectField},
        ];
        fields.forEach( field => {
            this.addControl(field);
        });
        setTimeout(() => {
            this.fieldGroupInitialized = true;
        });
    }

    change() {
        this.changeStream.next({
            textFieldId: this.constructChangeObject('text'),
            textAreaFieldId: this.constructChangeObject('textArea'),
            booleanFieldId: this.constructChangeObject('boolean'),
            numberFieldId: this.constructChangeObject('number'),
            dateFieldId: this.constructChangeObject('date'),
            dateTimeFieldId: this.constructChangeObject('dateTime'),
            enumSelectFieldId: this.constructChangeObject('enumSelect'),
            enumListFieldId: this.constructChangeObject('enumList'),
            enumAutoFieldId: this.constructChangeObject('enumAuto'),
            multichoiceListFieldId: this.constructChangeObject('multichoiceList'),
            multichoiceSelectFieldId: this.constructChangeObject('multichoiceSelect'),
        });
    }

    private addControl(field): void {
        this.fieldGroupControl.addControl(field.stringId, field.component.formControl);
    }

    private constructFormBuilderObject(prefix: string, dataField: DataField<any>) {
        const result = {};
        result[`${prefix}FieldValue`] = [dataField.value];
        ['Required', 'Disabled', 'Hidden'].forEach( suffix => {
            result[`${prefix}Field${suffix}`] = [false];
        });
        return result;
    }

    private constructChangeObject(prefix: string): Change {
        return {
            behavior: {
                required: this.changeGroupControl.get(`${prefix}FieldRequired`).value,
                hidden: this.changeGroupControl.get(`${prefix}FieldHidden`).value,
                editable: !this.changeGroupControl.get(`${prefix}FieldDisabled`).value,
            },
            value: this.changeGroupControl.get(`${prefix}FieldValue`).value
        };
    }
}

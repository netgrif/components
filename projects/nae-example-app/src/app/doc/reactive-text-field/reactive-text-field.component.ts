import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    BooleanField,
    ButtonField,
    ChangedFields,
    DataField,
    DateField,
    DateTimeField,
    EnumerationField,
    FieldTypeResource,
    FileField,
    FileListField,
    MultichoiceField,
    NumberField,
    TextAreaField,
    TextField,
    UserField,
    UserValue
} from '@netgrif/application-engine';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import moment from 'moment';
import {
    BooleanFieldComponent,
    ButtonFieldComponent,
    DateFieldComponent,
    DateTimeFieldComponent,
    EnumerationFieldComponent,
    FileFieldComponent,
    FileListFieldComponent,
    MultichoiceFieldComponent,
    NumberFieldComponent,
    TextFieldComponent,
    UserFieldComponent
} from '@netgrif/components';

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
    textField = new TextField('textFieldId', 'Reactive text field', 'hello', {visible: true, editable: true}, 'hej', 'hej',
                undefined, [{validationMessage: '', validationRule: 'minLength 4'}] );

    // TEXT AREA FIELD
    @ViewChild('textAreaFieldComponent') naeTextAreaField: TextFieldComponent;
    textAreaField = new TextField('textAreaFieldId', 'Reactive text area field', 'hello world', {visible: true, editable: true},
        undefined, undefined, undefined, undefined, {name: 'textarea'});

    // RICH TEXT FIELD
    @ViewChild('textRichFieldComponent') naeTextRichField: TextFieldComponent;
    textRichField = new TextAreaField('textRichFieldId', 'Reactive text rich field', 'hello', {visible: true, editable: true}, 'hej', 'hej',
        undefined, undefined, {name: 'richtextarea'} );

    // HTML TEXT FIELD
    @ViewChild('textHtmlFieldComponent') naeTextHtmlField: TextFieldComponent;
    textHtmlField = new TextField('textHtmlFieldId', 'Reactive text html field', 'hello', {visible: true, editable: true}, 'hej', 'hej',
        undefined, undefined, {name: 'htmltextarea'});

    // BOOLEAN FIELD
    @ViewChild('booleanFieldComponent') naeBooleanField: BooleanFieldComponent;
    booleanField = new BooleanField('booleanFieldId', 'Reactive boolean field', true, {visible: true, editable: true});

    // BUTTON FIELD
    @ViewChild('buttonFieldComponent') naeButtonField: ButtonFieldComponent;
    buttonField = new ButtonField('buttonFieldId', 'Reactive button field',
        {visible: true, editable: true}, undefined,  undefined, 'test', undefined, undefined, {name: 'stroked'}, '');

    // NUMBER FIELD
    @ViewChild('numberFieldComponent') naeNumberField: NumberFieldComponent;
    numberField = new NumberField('numberFieldId', 'Reactive number field', 7, {visible: true, editable: true});

    // DATE FIELD
    @ViewChild('dateFieldComponent') naeDateField: DateFieldComponent;
    dateField = new DateField('dateFieldId', 'Reactive date field', moment('2020-03-09'), {visible: true, editable: true});

    // DATE TIME FIELD
    @ViewChild('dateTimeFieldComponent') naeDateTimeField: DateTimeFieldComponent;
    dateTimeField = new DateTimeField('dateTimeFieldId', 'Reactive date time field', moment(new Date()),
        {visible: true, editable: true}, undefined, undefined, undefined,
        [{validationRule: 'between past,today', validationMessage: 'This is custom message!'}]);

    // ENUM SELECT FIELD
    @ViewChild('enumSelectFieldComponent') naeEnumSelectField: EnumerationFieldComponent;
    enumSelectField = new EnumerationField('enumSelectFieldId', 'Reactive enum select field', '',
        [{key: 'option1', value: 'Option1'}, { key: 'option2', value: 'Option2'}], {visible: true, editable: true});

    // ENUM SELECT FIELD
    @ViewChild('enumListFieldComponent') naeEnumListField: EnumerationFieldComponent;
    enumListField = new EnumerationField('enumListFieldId', 'Reactive enum list field', '',
        [{key: 'option1', value: 'Option1'}, { key: 'option2', value: 'Option2'}], {visible: true, editable: true},
        '', '', undefined, FieldTypeResource.ENUMERATION, undefined, {name: 'list'}, '');

    // ENUM AUTO COMPLETE FIELD
    @ViewChild('enumAutoFieldComponent') naeEnumAutoField: EnumerationFieldComponent;
    enumAutoField = new EnumerationField('enumAutoFieldId', 'Reactive enum autocomplete field', '',
        [{key: 'option1', value: 'Option1'}, { key: 'option2', value: 'Option2'}], {visible: true, editable: true},
        '', '', undefined, FieldTypeResource.ENUMERATION, undefined, {name: 'autocomplete'}, '');

    // MULTICHOICE LIST FIELD
    @ViewChild('multichoiceListFieldComponent') naeMultichoiceListField: MultichoiceFieldComponent;
    multichoiceListField = new MultichoiceField('multichoiceListFieldId', 'Reactive multichoice list field', ['a', 'b'],
        [{key: 'a', value: 'Alice'}, {key: 'b', value: 'Bob'}, {key: 'c', value: 'Claire'}], {visible: true, editable: true},
        undefined, undefined, undefined, FieldTypeResource.MULTICHOICE, undefined, {name: 'list'}, '');

    // MULTICHOICE SELECT FIELD
    @ViewChild('multichoiceSelectFieldComponent') naeMultichoiceSelectField: MultichoiceFieldComponent;
    multichoiceSelectField = new MultichoiceField('multichoiceSelectFieldId', 'Reactive multichoice select field', ['a', 'b'],
        [{key: 'a', value: 'Alice'}, {key: 'b', value: 'Bob'}, {key: 'c', value: 'Claire'}], {visible: true, editable: true});

    // FILE FIELD
    @ViewChild('fileFieldComponent') naeFileField: FileFieldComponent;
    fileField = new FileField('fileFieldId', 'Reactive file field',  {visible: true, editable: true},
        undefined, undefined, undefined, undefined, undefined);

    // FILE LIST FIELD
    @ViewChild('fileListFieldComponent') naeFileListField: FileListFieldComponent;
    fileListField = new FileListField('fileListFieldId', 'Reactive file list field',  {visible: true, editable: true},
        undefined, undefined, undefined, undefined, undefined, undefined);

    // USER FIELD
    @ViewChild('userFieldComponent') naeUserField: UserFieldComponent;
    userField = new UserField('userFieldId', 'Reactive user field',  {visible: true, editable: true},
        new UserValue('0', 'Name', 'Surname', 'surname@netgrif.com'), []);

    changeStream = new Subject<ChangedFields>();

    changeGroupControl = this.formBuilder.group({
        ...this.constructFormBuilderObject('text', this.textField),
        ...this.constructFormBuilderObject('textArea', this.textAreaField),
        ...this.constructFormBuilderObject('textRich', this.textRichField),
        ...this.constructFormBuilderObject('textHtml', this.textRichField),
        ...this.constructFormBuilderObject('boolean', this.booleanField),
        ...this.constructFormBuilderObject('button', this.buttonField),
        ...this.constructFormBuilderObject('number', this.numberField),
        ...this.constructFormBuilderObject('date', this.dateField),
        ...this.constructFormBuilderObject('dateTime', this.dateTimeField),
        ...this.constructFormBuilderObject('enumSelect', this.enumSelectField),
        ...this.constructFormBuilderObject('enumList', this.enumListField),
        ...this.constructFormBuilderObject('enumAuto', this.enumAutoField),
        ...this.constructFormBuilderObject('multichoiceList', this.multichoiceListField),
        ...this.constructFormBuilderObject('multichoiceSelect', this.multichoiceSelectField),
        ...this.constructFormBuilderObject('file', this.fileField, false),
        ...this.constructFormBuilderObject('fileList', this.fileListField, false),
        ...this.constructFormBuilderObject('user', this.userField, false),
    });

    fieldGroupControl = new FormGroup({});
    fieldGroupInitialized = false;

    ngAfterViewInit(): void {
        const fields = [
            {stringId: this.textField.stringId, component: this.naeTextField},
            {stringId: this.textAreaField.stringId, component: this.naeTextAreaField},
            {stringId: this.textRichField.stringId, component: this.naeTextRichField},
            {stringId: this.textHtmlField.stringId, component: this.naeTextHtmlField},
            {stringId: this.booleanField.stringId, component: this.naeBooleanField},
            {stringId: this.buttonField.stringId, component: this.naeButtonField},
            {stringId: this.numberField.stringId, component: this.naeNumberField},
            {stringId: this.dateField.stringId, component: this.naeDateField},
            {stringId: this.dateTimeField.stringId, component: this.naeDateTimeField},
            {stringId: this.enumSelectField.stringId, component: this.naeEnumSelectField},
            {stringId: this.enumListField.stringId, component: this.naeEnumListField},
            {stringId: this.enumAutoField.stringId, component: this.naeEnumAutoField},
            {stringId: this.multichoiceListField.stringId, component: this.naeMultichoiceListField},
            {stringId: this.multichoiceSelectField.stringId, component: this.naeMultichoiceSelectField},
            {stringId: this.fileField.stringId, component: this.naeFileField},
            {stringId: this.fileListField.stringId, component: this.naeFileListField},
            {stringId: this.userField.stringId, component: this.naeUserField},
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
            textRichFieldId: this.constructChangeObject('textRich'),
            textHtmlFieldId: this.constructChangeObject('textHtml'),
            booleanFieldId: this.constructChangeObject('boolean'),
            buttonFieldId: this.constructChangeObject('button'),
            numberFieldId: this.constructChangeObject('number'),
            dateFieldId: this.constructChangeObject('date'),
            dateTimeFieldId: this.constructChangeObject('dateTime'),
            enumSelectFieldId: this.constructChangeObject('enumSelect'),
            enumListFieldId: this.constructChangeObject('enumList'),
            enumAutoFieldId: this.constructChangeObject('enumAuto'),
            multichoiceListFieldId: this.constructChangeObject('multichoiceList'),
            multichoiceSelectFieldId: this.constructChangeObject('multichoiceSelect'),
            fileFieldId: this.constructChangeObject('file', false),
            fileListFieldId: this.constructChangeObject('fileList', false),
            userFieldId: this.constructChangeObject('user', false),
        });
    }

    private addControl(field): void {
        this.fieldGroupControl.addControl(field.stringId, field.component.formControl);
    }

    private constructFormBuilderObject(prefix: string, dataField: DataField<any>, includeValue = true) {
        const result = {};
        if (includeValue) {
            result[`${prefix}FieldValue`] = [dataField.value];
        }
        ['Required', 'Disabled', 'Hidden'].forEach( suffix => {
            result[`${prefix}Field${suffix}`] = [false];
        });
        return result;
    }

    private constructChangeObject(prefix: string, includeValue = true): any {
        const result = {
            behavior: {
                required: this.changeGroupControl.get(`${prefix}FieldRequired`).value,
                hidden: this.changeGroupControl.get(`${prefix}FieldHidden`).value,
                editable: !this.changeGroupControl.get(`${prefix}FieldDisabled`).value,
            },
            value: undefined
        };
        if (includeValue) {
            result.value = this.changeGroupControl.get(`${prefix}FieldValue`).value;
        }
        return result;
    }
}

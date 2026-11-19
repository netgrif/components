import moment from 'moment';
import {
    Behavior,
    BooleanField,
    ButtonField,
    CaseRefField,
    Component,
    DataField,
    DateField,
    DateTimeField,
    EnumerationField,
    FieldTypeResource,
    FileField,
    FileListField,
    FilterField,
    I18nField,
    Layout,
    MaterialAppearance,
    MultichoiceField,
    NumberField,
    ProcessRefField,
    StringCollectionField,
    TemplateAppearance,
    TaskRefField,
    TextField,
    UserField,
    UserListField,
    UserListValue,
    UserValue,
    Validation,
} from '@netgrif/components-core';

/* ------------------------------------------------------------------ model */

/** `forbidden` is never sent by the engine (forbidden fields are left out of the task data) */
export type BehaviorMode = 'editable' | 'visible' | 'hidden';

export type ValueKind = 'text' | 'textarea' | 'number' | 'boolean' | 'choice' | 'choices' | 'date' | 'datetime' | 'lines' | 'none';

/** `component.properties` entry the variant reads */
export interface PropertyDef {
    key: string;
    label: string;
    type: 'text' | 'number' | 'boolean';
    default?: string | number | boolean;
    hint?: string;
}

/** registered component (`<field-type>-<name>` in ComponentRegistryService) */
export interface VariantDef {
    name: string;
    label: string;
    properties?: Array<PropertyDef>;
    /** variant needs `component.optionIcons` (enumeration icon) */
    optionIcons?: boolean;
}

export interface ValidationPreset {
    rule: string;
    label: string;
    message: string;
}

/** everything the configuration panel edits */
export interface FieldConfig {
    title: string;
    placeholder: string;
    description: string;
    behavior: BehaviorMode;
    required: boolean;
    template: TemplateAppearance;
    /** Material 3 density scale of the preview (0 default, -1 ... -5 more compact) */
    density: number;
    variant: string;
    properties: { [key: string]: string | number | boolean };
    /** rules of the active validation presets */
    validations: Array<string>;
    value: any;
    /** `key: Label` per line */
    choices: string;
}

export interface FieldSpec {
    /** route segment */
    type: string;
    label: string;
    icon: string;
    description: string;
    /** model class in @netgrif/components-core */
    className: string;
    /** `type` attribute of `<data>` in Petriflow */
    petriflowType: string;
    variants: Array<VariantDef>;
    valueKind: ValueKind;
    hasChoices?: boolean;
    validations?: Array<ValidationPreset>;
    defaults: Partial<FieldConfig>;
    /** `additionalFieldProperties` of `nc-data-field-template` (file fields: the id of the task the files belong to) */
    additionalProperties?: { [key: string]: string };
    /** constructor arguments in order, each with its runtime value and its source code */
    args(c: FieldConfig): Array<Arg>;
    /** `<init>` of the Petriflow data variable, `undefined` = no init */
    petriflowInit?(c: FieldConfig): string | undefined;
}

export interface Arg {
    value: any;
    code: string;
}

/* ---------------------------------------------------------- code helpers */

export const FIELD_ID = 'demo_field';

/** TypeScript literal of a plain value */
export function lit(value: any): string {
    if (value === undefined) {
        return 'undefined';
    }
    if (value === null) {
        return 'null';
    }
    if (typeof value === 'string') {
        return `'${value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')}'`;
    }
    if (Array.isArray(value)) {
        return value.length ? `[${value.map(lit).join(', ')}]` : '[]';
    }
    if (typeof value === 'object') {
        const entries = Object.entries(value).filter(([, v]) => v !== undefined);
        return entries.length ? `{${entries.map(([k, v]) => `${/^[a-zA-Z_$][\w$]*$/.test(k) ? k : lit(k)}: ${lit(v)}`).join(', ')}}` : '{}';
    }
    return String(value);
}

function arg(value: any, code: string = lit(value)): Arg {
    return {value, code};
}

function escapeXml(text: string): string {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ------------------------------------------------- common constructor args */

export function behavior(c: FieldConfig): Behavior {
    const result: Behavior = {[c.behavior]: true};
    if (c.required) {
        result.required = true;
    }
    return result;
}

export function layout(c: FieldConfig): Layout {
    // the library renders every data field as `outline`, the layout appearance is not configurable
    return {x: 0, y: 0, rows: 1, cols: 4, offset: 0, template: c.template, appearance: MaterialAppearance.OUTLINE};
}

function layoutArg(c: FieldConfig): Arg {
    const code = `{x: 0, y: 0, rows: 1, cols: 4, offset: 0, template: TemplateAppearance.${enumKey(TemplateAppearance, c.template)}, `
        + `appearance: MaterialAppearance.OUTLINE}`;
    return arg(layout(c), code);
}

function enumKey(enumeration: object, value: string): string {
    return Object.keys(enumeration).find(k => enumeration[k] === value) ?? value;
}

function validations(spec: FieldSpec, c: FieldConfig): Array<Validation> {
    return c.validations.map(rule => ({
        validationRule: rule,
        validationMessage: spec.validations?.find(v => v.rule === rule)?.message ?? rule,
    }));
}

function choices(c: FieldConfig): Array<{ key: string, value: string }> {
    return (c.choices ?? '').split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const separator = line.indexOf(':');
            return separator < 0
                ? {key: line, value: line}
                : {key: line.substring(0, separator).trim(), value: line.substring(separator + 1).trim()};
        });
}

/** `component` argument, `undefined` for the default component without properties */
export function component(spec: FieldSpec, c: FieldConfig): Component | undefined {
    const variant = spec.variants.find(v => v.name === c.variant) ?? spec.variants[0];
    const properties = {};
    (variant.properties ?? []).forEach(property => {
        const value = c.properties[property.key];
        if (value === undefined || value === null || value === '' || value === false) {
            return;
        }
        // component properties are strings in Petriflow, boolean ones are checked for presence
        properties[property.key] = String(value);
    });
    if (variant.name === 'default' && Object.keys(properties).length === 0) {
        return undefined;
    }
    const result: Component = {name: variant.name};
    if (Object.keys(properties).length > 0) {
        result.properties = properties;
    }
    if (variant.optionIcons) {
        result.optionIcons = choices(c).map((choice, i) => ({key: choice.key, type: 'material', value: DEMO_ICONS[i % DEMO_ICONS.length]}));
    }
    return result;
}

const DEMO_ICONS = ['flight', 'train', 'directions_car', 'directions_bike', 'directions_walk'];

function common(spec: FieldSpec, c: FieldConfig) {
    const comp = component(spec, c);
    const vals = validations(spec, c);
    return {
        id: arg(FIELD_ID),
        title: arg(c.title),
        behavior: arg(behavior(c)),
        placeholder: arg(c.placeholder || undefined),
        description: arg(c.description || undefined),
        layout: layoutArg(c),
        validations: arg(vals.length ? vals : undefined, vals.length
            ? `[\n${vals.map(v => `        ${lit(v)}`).join(',\n')}\n    ]` : 'undefined'),
        component: arg(comp),
    };
}

/** removes trailing `undefined` arguments, so the generated code stays short */
function trim(args: Array<Arg>): Array<Arg> {
    const result = [...args];
    while (result.length > 0 && result[result.length - 1].value === undefined) {
        result.pop();
    }
    return result;
}

/* ------------------------------------------------------------ public API */

export function createField(spec: FieldSpec, c: FieldConfig): DataField<any> {
    const ctor = FIELD_CLASSES[spec.className];
    return new ctor(...spec.args(c).map(a => a.value));
}

export function typescriptSnippet(spec: FieldSpec, c: FieldConfig): string {
    const args = trim(spec.args(c));
    const imports = new Set<string>([spec.className, 'TemplateAppearance', 'MaterialAppearance']);
    if (spec.hasChoices || spec.className === 'FilterField') {
        imports.add('FieldTypeResource');
    }
    const code = args.map(a => `    ${a.code}`).join(',\n');
    const momentImport = ['date', 'datetime'].includes(spec.valueKind) ? `import moment from 'moment';\n` : '';
    return `${momentImport}import {${[...imports].join(', ')}} from '@netgrif/components-core';\n\n`
        + `// usually created by the library from the engine response (FieldConverterService)\n`
        + `const field = new ${spec.className}(\n${code}\n);\n\n`
        + `field.valueChanges().subscribe(value => console.log(value));`;
}

export function htmlSnippet(): string {
    return `<!-- module: DataFieldsComponentModule (@netgrif/components) -->\n`
        + `<nc-data-field-template [dataField]="field"></nc-data-field-template>\n\n`
        + `<!-- in a task form the fields are rendered by -->\n`
        + `<nc-task-content></nc-task-content>`;
}

export function petriflowSnippet(spec: FieldSpec, c: FieldConfig): string {
    const lines = [`<data type="${spec.petriflowType}">`, `    <id>${FIELD_ID}</id>`, `    <title>${escapeXml(c.title)}</title>`];
    if (c.placeholder) {
        lines.push(`    <placeholder>${escapeXml(c.placeholder)}</placeholder>`);
    }
    if (c.description) {
        lines.push(`    <desc>${escapeXml(c.description)}</desc>`);
    }
    if (spec.hasChoices) {
        lines.push('    <options>');
        choices(c).forEach(choice => lines.push(`        <option key="${escapeXml(choice.key)}">${escapeXml(choice.value)}</option>`));
        lines.push('    </options>');
    }
    const init = spec.petriflowInit?.(c);
    if (init !== undefined && init !== '') {
        lines.push(`    ${init}`);
    }
    const vals = validations(spec, c);
    if (vals.length) {
        lines.push('    <validations>');
        vals.forEach(v => {
            lines.push('        <validation>');
            lines.push(`            <expression>${escapeXml(v.validationRule)}</expression>`);
            lines.push(`            <message>${escapeXml(v.validationMessage)}</message>`);
            lines.push('        </validation>');
        });
        lines.push('    </validations>');
    }
    const comp = component(spec, c);
    if (comp) {
        lines.push('    <component>', `        <name>${comp.name}</name>`);
        if (comp.properties) {
            lines.push('        <properties>');
            Object.entries(comp.properties).forEach(([k, v]) => lines.push(`            <property key="${k}">${escapeXml(String(v))}</property>`));
            lines.push('        </properties>');
        }
        if (comp.optionIcons?.length) {
            lines.push('        <icons>');
            comp.optionIcons.forEach(icon => lines.push(`            <icon key="${escapeXml(icon.key)}" type="${icon.type}">${icon.value}</icon>`));
            lines.push('        </icons>');
        }
        lines.push('    </component>');
    }
    lines.push('</data>', '', '<!-- in a transition -->', '<dataRef>', `    <id>${FIELD_ID}</id>`, '    <logic>');
    lines.push(`        <behavior>${c.behavior}</behavior>`);
    if (c.required) {
        lines.push('        <behavior>required</behavior>');
    }
    lines.push('    </logic>', '    <layout>',
        '        <x>0</x>', '        <y>0</y>', '        <rows>1</rows>', '        <cols>4</cols>',
        `        <template>${c.template}</template>`,
        '    </layout>', '</dataRef>');
    return lines.join('\n');
}

/* ---------------------------------------------------------------- specs */

const FIELD_CLASSES: { [name: string]: new (...args: Array<any>) => DataField<any> } = {
    TextField, NumberField, BooleanField, EnumerationField, MultichoiceField, DateField, DateTimeField,
    ButtonField, I18nField, StringCollectionField, FilterField, FileField, FileListField, UserField,
    UserListField, TaskRefField, CaseRefField, ProcessRefField,
};

/** task of the file fields of the demo (the files are stored in the mock engine under it) */
const FILE_TASK = 'demo-task';

/** processes a filter field searches in (allowed nets) */
const FILTER_NETS = ['insurance_claim', 'leave_request'];

const DEFAULT_CHOICES = 'plane: Plane\ntrain: Train\ncar: Car\nbike: Bike';

function dateValue(c: FieldConfig, withTime: boolean): Arg {
    if (!c.value) {
        return arg(undefined);
    }
    const value = moment(c.value);
    const text = value.format(withTime ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD');
    return arg(value, `moment('${text}')`);
}

export const FIELD_SPECS: Array<FieldSpec> = [
    {
        type: 'text',
        label: 'Text',
        icon: 'text_fields',
        description: 'Single and multi line text, password, rich text (Quill), HTML editor and signature pad.',
        className: 'TextField',
        petriflowType: 'text',
        valueKind: 'text',
        variants: [
            {name: 'default', label: 'Default (input)'},
            {name: 'textarea', label: 'Textarea'},
            {name: 'richtextarea', label: 'Rich textarea (markdown)'},
            {name: 'htmltextarea', label: 'HTML textarea (Quill)'},
            {name: 'password', label: 'Password'},
            {name: 'signature', label: 'Signature pad'},
        ],
        validations: [
            {rule: 'minLength 3', label: 'minLength 3', message: 'At least 3 characters'},
            {rule: 'maxLength 20', label: 'maxLength 20', message: 'At most 20 characters'},
            {rule: 'email', label: 'email', message: 'Not a valid e-mail address'},
            {rule: 'telNumber', label: 'telNumber', message: 'Not a valid phone number'},
            {rule: 'regex ^[A-Z].*', label: 'regex ^[A-Z].*', message: 'Has to start with a capital letter'},
        ],
        defaults: {title: 'Name', placeholder: 'Your name', description: 'Full name of the applicant', value: 'Jane Doe'},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value ?? ''), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
        petriflowInit: c => c.value ? `<init>${escapeXml(c.value)}</init>` : undefined,
    },
    {
        type: 'number',
        label: 'Number',
        icon: 'pin',
        description: 'Numeric input, currency formatting and decimal formatting by locale.',
        className: 'NumberField',
        petriflowType: 'number',
        valueKind: 'number',
        variants: [
            {name: 'default', label: 'Default'},
            {
                name: 'currency', label: 'Currency', properties: [
                    {key: 'code', label: 'Currency code', type: 'text', default: 'EUR'},
                    {key: 'locale', label: 'Locale', type: 'text', default: 'sk-SK'},
                    {key: 'fractionSize', label: 'Fraction size', type: 'number', default: 2},
                ],
            },
            {
                name: 'decimal', label: 'Decimal', properties: [
                    {key: 'digitsInfo', label: 'Digits info', type: 'text', default: '1.2-2', hint: 'minInt.minFrac-maxFrac'},
                    {key: 'locale', label: 'Locale', type: 'text', default: 'sk-SK'},
                ],
            },
        ],
        validations: [
            {rule: 'positive', label: 'positive', message: 'Has to be positive'},
            {rule: 'even', label: 'even', message: 'Has to be even'},
            {rule: 'decimal', label: 'decimal (integer)', message: 'Has to be an integer'},
            {rule: 'inrange 0,100', label: 'inrange 0,100', message: 'Has to be between 0 and 100'},
        ],
        defaults: {title: 'Amount', placeholder: '0', description: 'Requested amount', value: 1250.5},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value === '' || c.value === null ? undefined : Number(c.value)), a.behavior,
                a.validations, a.placeholder, a.description, a.layout, arg(undefined), a.component];
        },
        petriflowInit: c => c.value !== '' && c.value !== null && c.value !== undefined ? `<init>${c.value}</init>` : undefined,
    },
    {
        type: 'boolean',
        label: 'Boolean',
        icon: 'toggle_on',
        description: 'Slide toggle.',
        className: 'BooleanField',
        petriflowType: 'boolean',
        valueKind: 'boolean',
        variants: [{name: 'default', label: 'Default (slide toggle)'}],
        defaults: {title: 'I agree with the terms', description: 'Required to continue', value: false},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(!!c.value), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
        petriflowInit: c => `<init>${!!c.value}</init>`,
    },
    {
        type: 'enumeration',
        label: 'Enumeration',
        icon: 'arrow_drop_down_circle',
        description: 'Single choice: select, autocomplete, list of radio buttons, stepper or icons.',
        className: 'EnumerationField',
        petriflowType: 'enumeration_map',
        valueKind: 'choice',
        hasChoices: true,
        variants: [
            {name: 'default', label: 'Default (select)'},
            {name: 'autocomplete', label: 'Autocomplete', properties: [
                {key: 'filter', label: 'Filter', type: 'text', default: '', hint: 'prefix | substring'},
            ]},
            {name: 'list', label: 'List'},
            {name: 'stepper', label: 'Stepper', properties: [
                {key: 'arrowStepper', label: 'Arrow stepper', type: 'boolean', default: false},
            ]},
            {name: 'icon', label: 'Icons', optionIcons: true, properties: [
                {key: 'horizontal', label: 'Horizontal', type: 'boolean', default: true},
                {key: 'arrow', label: 'Arrow', type: 'boolean', default: false},
                {key: 'divider', label: 'Divider', type: 'boolean', default: false},
            ]},
        ],
        defaults: {title: 'Transport', placeholder: 'Choose', description: 'Preferred way of transport', value: 'train', choices: DEFAULT_CHOICES},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value || undefined), arg(choices(c)), a.behavior, a.placeholder, a.description, a.layout,
                arg(FieldTypeResource.ENUMERATION_MAP, 'FieldTypeResource.ENUMERATION_MAP'), a.validations, a.component];
        },
        petriflowInit: c => c.value ? `<init>${escapeXml(c.value)}</init>` : undefined,
    },
    {
        type: 'multichoice',
        label: 'Multichoice',
        icon: 'checklist',
        description: 'Multiple choice: select, list of checkboxes or autocomplete with chips.',
        className: 'MultichoiceField',
        petriflowType: 'multichoice_map',
        valueKind: 'choices',
        hasChoices: true,
        variants: [
            {name: 'default', label: 'Default (select)'},
            {name: 'list', label: 'List'},
            {name: 'autocomplete', label: 'Autocomplete', properties: [
                {key: 'filter', label: 'Filter', type: 'text', default: '', hint: 'prefix | substring'},
            ]},
        ],
        defaults: {title: 'Transport', placeholder: 'Choose', description: 'All acceptable ways of transport', value: ['plane', 'car'], choices: DEFAULT_CHOICES},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value ?? []), arg(choices(c)), a.behavior, a.placeholder, a.description, a.layout,
                arg(FieldTypeResource.MULTICHOICE_MAP, 'FieldTypeResource.MULTICHOICE_MAP'), a.validations, a.component];
        },
        petriflowInit: c => c.value?.length ? `<inits>${c.value.map(v => `<init>${escapeXml(v)}</init>`).join('')}</inits>` : undefined,
    },
    {
        type: 'date',
        label: 'Date',
        icon: 'calendar_month',
        description: 'Date picker (moment).',
        className: 'DateField',
        petriflowType: 'date',
        valueKind: 'date',
        variants: [{name: 'default', label: 'Default (datepicker)'}],
        defaults: {title: 'Date of birth', placeholder: 'DD.MM.YYYY', description: '', value: '1990-05-17'},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, dateValue(c, false), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
        petriflowInit: c => c.value ? `<init>${moment(c.value).format('YYYY-MM-DD')}</init>` : undefined,
    },
    {
        type: 'date-time',
        label: 'Date and time',
        icon: 'schedule',
        description: 'Date picker and time picker over one value (moment).',
        className: 'DateTimeField',
        petriflowType: 'dateTime',
        valueKind: 'datetime',
        variants: [{name: 'default', label: 'Default (date + time)'}],
        defaults: {title: 'Meeting', placeholder: '', description: 'Start of the meeting', value: '2026-11-03T10:30'},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, dateValue(c, true), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
        petriflowInit: c => c.value ? `<init>${moment(c.value).format('YYYY-MM-DDTHH:mm')}</init>` : undefined,
    },
    {
        type: 'button',
        label: 'Button',
        icon: 'smart_button',
        description: 'Button, every click increments the value and triggers set data in a task.',
        className: 'ButtonField',
        petriflowType: 'button',
        valueKind: 'none',
        variants: [{
            name: 'default', label: 'Default', properties: [
                {key: 'stretch', label: 'Stretch', type: 'boolean', default: false},
                {key: 'dialogTitle', label: 'Confirm dialog title', type: 'text', default: ''},
                {key: 'dialogText', label: 'Confirm dialog text', type: 'text', default: ''},
            ],
        }],
        defaults: {title: '', placeholder: 'Submit', description: 'Sends the form'},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, a.behavior, arg(undefined), a.placeholder, a.description, a.layout, a.validations, a.component];
        },
    },
    {
        type: 'i18n',
        label: 'I18n',
        icon: 'translate',
        description: 'Translated text: editable translations, plain text or divider.',
        className: 'I18nField',
        petriflowType: 'i18n',
        valueKind: 'text',
        variants: [
            {name: 'default', label: 'Default (translations)'},
            {name: 'text', label: 'Text', properties: [
                {key: 'plainText', label: 'Plain text', type: 'boolean', default: false},
                {key: 'boldText', label: 'Bold', type: 'boolean', default: false},
                {key: 'fontSize', label: 'Font size', type: 'number', default: ''},
                {key: 'textColor', label: 'Text color', type: 'text', default: ''},
            ]},
            {name: 'divider', label: 'Divider', properties: [
                {key: 'dividerColor', label: 'Divider color', type: 'text', default: ''},
            ]},
        ],
        defaults: {title: 'Greeting', placeholder: '', description: '', value: 'Hello world', behavior: 'visible'},
        args(c) {
            const a = common(this, c);
            const value = {defaultValue: c.value ?? '', translations: {sk: 'Ahoj svet', de: 'Hallo Welt'}};
            return [a.id, a.title, arg(value), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
        petriflowInit: c => c.value ? `<init>${escapeXml(c.value)}</init>` : undefined,
    },
    {
        type: 'file',
        label: 'File',
        icon: 'attach_file',
        description: 'One file: drag and drop or choose it, download, delete; the "preview" component shows an image preview.',
        className: 'FileField',
        petriflowType: 'file',
        valueKind: 'none',
        variants: [
            {name: 'default', label: 'Default'},
            {name: 'preview', label: 'Preview (image)'},
        ],
        additionalProperties: {taskId: FILE_TASK},
        defaults: {title: 'Photo of the damage', placeholder: 'No photo', description: 'An image or a PDF, at most 5 MB', variant: 'preview'},
        args(c) {
            const a = common(this, c);
            // the mock engine has the file "claim-photo.png" of the field in the task FILE_TASK
            return [a.id, a.title, a.behavior, arg({name: 'claim-photo.png'}), a.placeholder, a.description, a.layout,
                arg(5 * 1024 * 1024, '5 * 1024 * 1024'), arg('image/*,.pdf'), a.validations, a.component];
        },
    },
    {
        type: 'file-list',
        label: 'File list',
        icon: 'file_copy',
        description: 'Several files: drag and drop or choose them, download and delete each of them.',
        className: 'FileListField',
        petriflowType: 'fileList',
        valueKind: 'none',
        variants: [{name: 'default', label: 'Default'}],
        additionalProperties: {taskId: FILE_TASK},
        defaults: {title: 'Documents of the claim', placeholder: 'No documents', description: 'Police report, invoices, medical reports'},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, a.behavior, arg({namesPaths: []}), a.placeholder, a.description, a.layout, a.validations,
                arg(10 * 1024 * 1024, '10 * 1024 * 1024'), arg(undefined), a.component];
        },
    },
    {
        type: 'user',
        label: 'User',
        icon: 'person',
        description: 'One user picked in a dialog (users of the engine, optionally limited by process roles).',
        className: 'UserField',
        petriflowType: 'user',
        valueKind: 'none',
        variants: [{name: 'default', label: 'Default'}],
        defaults: {title: 'Claim handler', placeholder: 'Select the handler', description: 'Responsible for the assessment of the claim'},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, a.behavior,
                arg(new UserValue('user-1', 'Ľubomír', 'Šťastný-Ďurčanský', 'lubomir.stastny-durcansky@netgrif.com'),
                    `new UserValue('user-1', 'Ľubomír', 'Šťastný-Ďurčanský', 'lubomir.stastny-durcansky@netgrif.com')`),
                arg([], '[]   // process roles of the selectable users, [] = all users'),
                a.placeholder, a.description, a.layout, a.validations, a.component];
        },
    },
    {
        type: 'user-list',
        label: 'User list',
        icon: 'group',
        description: 'Several users picked in a dialog.',
        className: 'UserListField',
        petriflowType: 'userList',
        valueKind: 'none',
        variants: [{name: 'default', label: 'Default'}],
        defaults: {title: 'Assessment committee', placeholder: 'Add members', description: 'Members who approve claims above the limit'},
        args(c) {
            const a = common(this, c);
            const users = [
                new UserValue('playground-user', 'Jane', 'Doe', 'jane.doe@netgrif.com'),
                new UserValue('user-0', 'Alexandra Maximiliána', 'Konstantínová-Wittelsbachová von Hohenstein und Schönberg',
                    'alexandra.maximiliana.konstantinova-wittelsbachova@insurance-department.example-company.com'),
            ];
            return [a.id, a.title, a.behavior,
                arg(new UserListValue(new Map(users.map(u => [u.id, u]))), `new UserListValue(new Map([['playground-user', new UserValue(...)], ...]))`),
                arg([], '[]'), a.placeholder, a.description, a.layout, a.validations, a.component];
        },
    },
    {
        type: 'task-ref',
        label: 'Task ref',
        icon: 'assignment_turned_in',
        description: 'References tasks by their ids. In a task form the default component embeds the forms of the tasks, '
            + 'the "task list" component shows them as a task list (the tasks of the mock engine are "<case>-<transition>").',
        className: 'TaskRefField',
        petriflowType: 'taskRef',
        valueKind: 'lines',
        variants: [
            {name: 'task-list', label: 'Task list', properties: [
                {key: 'headers', label: 'Headers', type: 'text', default: '', hint: 'meta-title, meta-user, ... (comma separated)'},
            ]},
        ],
        defaults: {title: 'Related tasks', description: 'Tasks of the claims of the same client', variant: 'task-list',
            value: ['claim-luggage-register', 'claim-windshield-assess', 'claim-long-title-register']},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value ?? []), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
    },
    {
        type: 'case-ref',
        label: 'Case ref',
        icon: 'folder_shared',
        description: 'References cases by their ids, shown as a case list; the component can offer a search and a button '
            + 'that creates a new case and adds it.',
        className: 'CaseRefField',
        petriflowType: 'caseRef',
        valueKind: 'lines',
        variants: [
            {name: 'default', label: 'Default (case list)', properties: [
                {key: 'search', label: 'Search', type: 'boolean', default: true},
                {key: 'createCase', label: 'Create case button', type: 'boolean', default: true},
                {key: 'headers', label: 'Headers', type: 'text', default: '', hint: 'meta-title, meta-creationDate, ... (comma separated)'},
            ]},
        ],
        defaults: {title: 'Related claims', description: 'Claims of the same client',
            value: ['claim-windshield', 'claim-kitchen', 'claim-long-title', 'claim-long-word']},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value ?? []), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
    },
    {
        type: 'process-ref',
        label: 'Process ref',
        icon: 'account_tree',
        description: 'References "process" cases (processes edited in the builder) by their ids, the default component embeds the '
            + 'Petriflow process builder of the first one into the form (registered by BuilderModule, the "height" property sets '
            + 'its height in px). Editable: a draft is edited and saved, visible: read only. Without a value it shows a new process.',
        className: 'ProcessRefField',
        petriflowType: 'processRef',
        valueKind: 'lines',
        variants: [
            {name: 'default', label: 'Default (process builder)', properties: [
                {key: 'height', label: 'Height', type: 'number', default: 500, hint: 'px'},
            ]},
        ],
        defaults: {title: 'Process', description: 'Process of the claim', value: ['process-insurance_claim']},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value ?? []), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
    },
    {
        type: 'filter',
        label: 'Filter',
        icon: 'filter_alt',
        description: 'Saved search: a PFQL query edited as text or in the advanced search, limited to the allowed processes.',
        className: 'FilterField',
        petriflowType: 'filter',
        valueKind: 'text',
        variants: [
            {name: 'default', label: 'Default (PFQL query)'},
            {name: 'string-query', label: 'String query (PFQL query)'},
            {name: 'advanced-search-query', label: 'Advanced search'},
        ],
        defaults: {
            title: 'Claims to review',
            placeholder: 'cases: title contains \'claim\'',
            description: 'Damage claims of the process Insurance claim',
            // conditions joined with "and" are loaded as predicates of the advanced search ("or" at the top level: plain query)
            value: 'cases: (title contains \'damage\') and (processIdentifier eq \'insurance_claim\')',
        },
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value ?? ''), arg(FieldTypeResource.CASE_FILTER, 'FieldTypeResource.CASE_FILTER'),
                arg(FILTER_NETS), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
        petriflowInit: c => ['<allowedNets>', ...FILTER_NETS.map(n => `        <allowedNet>${n}</allowedNet>`), '    </allowedNets>',
            '    <filterMetadata>', '        <filterType>Case</filterType>', '    </filterMetadata>']
            .concat(c.value ? [`    <init>${escapeXml(c.value)}</init>`] : []).join('\n'),
    },
    {
        type: 'string-collection',
        label: 'String collection',
        icon: 'sell',
        description: 'List of strings edited as chips.',
        className: 'StringCollectionField',
        petriflowType: 'stringCollection',
        valueKind: 'lines',
        variants: [{name: 'default', label: 'Default (chips)'}],
        defaults: {title: 'Tags', placeholder: 'Add tag', description: '', value: ['netgrif', 'petriflow']},
        args(c) {
            const a = common(this, c);
            return [a.id, a.title, arg(c.value ?? []), a.behavior, a.placeholder, a.description, a.layout, a.validations, a.component];
        },
    },
];

export function defaultConfig(spec: FieldSpec): FieldConfig {
    const properties = {};
    spec.variants.forEach(variant => (variant.properties ?? []).forEach(p => {
        if (!(p.key in properties)) {
            properties[p.key] = p.default ?? '';
        }
    }));
    return {
        title: '',
        placeholder: '',
        description: '',
        behavior: 'editable',
        required: false,
        template: TemplateAppearance.MATERIAL,
        density: 0,
        variant: spec.variants[0].name,
        properties,
        validations: [],
        value: undefined,
        choices: '',
        ...spec.defaults,
    };
}

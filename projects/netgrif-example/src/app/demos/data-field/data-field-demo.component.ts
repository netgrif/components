import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {DataField, NAE_VIEW_ID_SEGMENT, TemplateAppearance, ViewIdService} from '@netgrif/components-core';
import {CodeSnippet} from '../../playground/code-block/code-block.component';
import {
    BehaviorMode,
    createField,
    defaultConfig,
    FIELD_SPECS,
    FieldConfig,
    FieldSpec,
    htmlSnippet,
    petriflowSnippet,
    PropertyDef,
    typescriptSnippet,
} from './field-specs';

/**
 * Generic demo of one data field type, the type comes from the route (`fields/:type`), see {@link FIELD_SPECS}.
 * Every configuration change creates a new field model and renders it with `nc-data-field-template`.
 */
@Component({
    selector: 'ne-data-field-demo',
    templateUrl: './data-field-demo.component.html',
    styleUrls: ['./data-field-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    // a view around the fields, like in an application (the process builder of the process ref field needs it)
    providers: [ViewIdService, {provide: NAE_VIEW_ID_SEGMENT, useValue: 'fields'}],
})
export class DataFieldDemoComponent implements OnInit, OnDestroy {

    readonly behaviors: Array<BehaviorMode> = ['editable', 'visible', 'hidden'];
    readonly templates = [TemplateAppearance.MATERIAL, TemplateAppearance.NETGRIF];
    /** Material 3 density scale, `ne-density-*` classes in styles.scss */
    readonly densities = [0, -1, -2, -3, -4, -5];

    spec: FieldSpec;
    config: FieldConfig;
    /** one element array, a new model instance makes `nc-data-field-template` create a new component portal */
    fields: Array<DataField<any>> = [];
    snippets: Array<CodeSnippet> = [];
    currentValue: any;
    valid = true;
    error: string | undefined;

    private _routeSub: Subscription;
    private _valueSub: Subscription;
    private _rebuildTimeout: ReturnType<typeof setTimeout>;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._routeSub = this._route.paramMap.subscribe(params => {
            this.spec = FIELD_SPECS.find(s => s.type === params.get('type')) ?? FIELD_SPECS[0];
            this.config = defaultConfig(this.spec);
            this.rebuild();
        });
    }

    ngOnDestroy(): void {
        this._routeSub?.unsubscribe();
        this._valueSub?.unsubscribe();
        clearTimeout(this._rebuildTimeout);
    }

    get field(): DataField<any> | undefined {
        return this.fields[0];
    }

    get variantProperties(): Array<PropertyDef> {
        return this.spec.variants.find(v => v.name === this.config.variant)?.properties ?? [];
    }

    get choiceKeys(): Array<string> {
        return (this.config.choices ?? '').split('\n')
            .map(line => line.split(':')[0].trim())
            .filter(key => key.length > 0);
    }

    get lines(): string {
        return (this.config.value ?? []).join('\n');
    }

    set lines(text: string) {
        this.config.value = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    }

    get hiddenByBehavior(): boolean {
        return this.config.behavior === 'hidden';
    }

    /** properties of the newly selected component start from its defaults */
    variantChanged(): void {
        this.variantProperties.forEach(property => this.config.properties[property.key] = property.default ?? '');
        this.changed(0);
    }

    isValidationActive(rule: string): boolean {
        return this.config.validations.includes(rule);
    }

    toggleValidation(rule: string, active: boolean): void {
        this.config.validations = active
            ? [...this.config.validations, rule]
            : this.config.validations.filter(r => r !== rule);
        this.changed();
    }

    /** debounced, so typing into the configuration doesn't re-create the component on every key */
    changed(delay = 250): void {
        clearTimeout(this._rebuildTimeout);
        this._rebuildTimeout = setTimeout(() => this.rebuild(), delay);
    }

    /**
     * Edge case: long title, placeholder, description, value and choices, to see how the field wraps,
     * truncates or scrolls them.
     */
    fillLongTexts(): void {
        const c = this.config;
        c.title = 'Name of the person responsible for the insurance claim and for all the communication with the insurer';
        c.placeholder = 'First name, middle names and the surname exactly as written in the identity card or in the passport';
        c.description = 'The responsible person receives every e-mail and letter about the claim, signs the documents and '
            + 'decides about the payout. Change it only together with a signed power of attorney.';
        switch (this.spec.valueKind) {
            case 'text':
                // a filter keeps a valid PFQL query: a long query with several conditions
                c.value = this.spec.type === 'filter'
                    ? 'cases: (title contains \'Water damage caused by a burst pipe on the third floor\') or '
                    + '(processIdentifier eq \'leave_request\') or (title contains \'Krankenversicherungsleistungsabrechnung\')'
                    : 'Alexandra Konstantínová-Wittelsbachová von Hohenstein und Schönberg-Lichtenfels';
                break;
            case 'textarea':
                c.value = 'A very long text without line breaks that should wrap inside the field: '.repeat(6)
                    + '\nA_single_word_without_any_spaces_that_cannot_wrap_' + 'x'.repeat(80);
                break;
            case 'number':
                c.value = 123456789012.34;
                break;
            case 'lines':
                c.value = ['A very long item of the list that does not fit on one line of the field and has to wrap or be truncated',
                    'Short item', 'Another_item_without_any_spaces_' + 'y'.repeat(60)];
                break;
        }
        if (this.spec.hasChoices) {
            c.choices = 'short: Short\nlong: A very long option that does not fit into the width of the field and has to be '
                + 'truncated or wrapped by the select panel\nword: Option_without_any_spaces_' + 'z'.repeat(50)
                + '\nplain: Plain option';
            c.value = this.spec.valueKind === 'choices' ? ['long', 'short', 'word'] : 'long';
        }
        this.rebuild();
    }

    reset(): void {
        this.config = defaultConfig(this.spec);
        this.rebuild();
    }

    stringify(value: any): string {
        if (value === undefined) {
            return 'undefined';
        }
        return JSON.stringify(value, null, 2);
    }

    private rebuild(): void {
        this._valueSub?.unsubscribe();
        try {
            const field = createField(this.spec, this.config);
            this.error = undefined;
            this.fields = [field];
            this.currentValue = field.value;
            this._valueSub = field.valueChanges().subscribe(value => {
                this.currentValue = value;
                this.valid = field.formControlRef ? field.formControlRef.valid || field.formControlRef.disabled : true;
            });
        } catch (e) {
            this.error = String(e);
            this.fields = [];
        }
        this.snippets = [
            {label: 'Petriflow', code: petriflowSnippet(this.spec, this.config)},
            {label: 'TypeScript', code: typescriptSnippet(this.spec, this.config)},
            {label: 'HTML', code: htmlSnippet()},
        ];
    }
}

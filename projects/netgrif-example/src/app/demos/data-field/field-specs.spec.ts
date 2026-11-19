import {
    createField,
    defaultConfig,
    FIELD_ID,
    FIELD_SPECS,
    lit,
    petriflowSnippet,
    typescriptSnippet,
} from './field-specs';

describe('field specs', () => {

    FIELD_SPECS.forEach(spec => {
        describe(spec.type, () => {
            spec.variants.forEach(variant => {
                it(`creates ${spec.className} with the ${variant.name} component`, () => {
                    const config = {...defaultConfig(spec), variant: variant.name, required: true};
                    const field = createField(spec, config);
                    expect(field.stringId).toBe(FIELD_ID);
                    expect(field.title).toBe(config.title);
                    expect(field.behavior.required).toBeTrue();
                    expect(field.getTypedComponentType()).toContain(variant.name);
                });
            });

            it('generates snippets with the configuration', () => {
                const config = {...defaultConfig(spec), title: 'Special <title>'};
                expect(typescriptSnippet(spec, config)).toContain(`new ${spec.className}(`);
                expect(typescriptSnippet(spec, config)).toContain(`'Special <title>'`);
                expect(petriflowSnippet(spec, config)).toContain('<title>Special &lt;title&gt;</title>');
                expect(petriflowSnippet(spec, config)).toContain(`<data type="${spec.petriflowType}">`);
            });
        });
    });

    it('writes TypeScript literals', () => {
        expect(lit('it\'s')).toBe(`'it\\'s'`);
        expect(lit({editable: true, required: undefined})).toBe('{editable: true}');
        expect(lit([1, 'a'])).toBe(`[1, 'a']`);
        expect(lit({'a-b': 1})).toBe(`{'a-b': 1}`);
    });
});

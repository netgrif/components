import {SearchAutocompleteOption} from './category/search-autocomplete-option';

/**
 * Objects that represent keys to the map of available data fields in {@link CaseDataset} search category.
 *
 * Since javascript maps don't support objects as keys this class has a serialized form, that is used as a `string` key.
 *
 * This class also acts as an autocomplete option when the target datafield is selected. The real data fields are then extracted from the
 * map to which this object is a key.
 */
export class DatafieldMapKey implements SearchAutocompleteOption<string> {

    public static serializedForm(type: string, title: string): string {
        return `${type}#${title}`;
    }

    public static parse(serializedMapKey: string): DatafieldMapKey {
        const parts = serializedMapKey.split('#');
        return new DatafieldMapKey(parts.shift(), parts.join('#'));
    }

    constructor(protected _inputType, protected _title) {
    }

    public get title(): string {
        return this._title;
    }

    public get type(): string {
        return this._inputType;
    }

    public get icon(): string {
        switch (this._inputType) {
            case 'boolean':
                return 'toggle_off';
            case 'date':
                return 'today';
            case 'enumeration':
                return 'radio_button_checked';
            case 'file':
                return 'insert_drive_file';
            case 'fileList':
                return 'file_copy';
            case 'multichoice':
                return 'check_box';
            case 'number':
                return 'looks_one';
            case 'user':
                return 'person';
            case 'userList':
                return 'people';
            case 'dateTime':
                return 'schedule';
            default:
                return 'text_format';
        }
    }

    /**
     * Alias for [toSerializedForm()]{@link DatafieldMapKey#toSerializedForm}
     */
    public get value(): string {
        return this.toSerializedForm();
    }

    /**
     * Alias for [title]{@link DatafieldMapKey#title}
     */
    public get text(): string {
        return this.title;
    }

    public toSerializedForm(): string {
        return DatafieldMapKey.serializedForm(this._inputType, this._title);
    }
}

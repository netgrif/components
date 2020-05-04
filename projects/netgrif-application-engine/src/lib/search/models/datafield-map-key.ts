export class DatafieldMapKey {

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
            default:
                return 'text_format';
            case 'boolean':
                return 'toggle_off';
            case 'date':
                return 'today';
            case 'enumeration':
                return 'radio_button_checked';
            // case "file":
            //     return "insert_drive_file";
            case 'multichoice':
                return 'check_box';
            case 'number':
                return 'looks_one';
            case 'user':
                return 'person';
            case 'dateTime':
                return 'schedule';
        }
    }

    public toSerializedForm(): string {
        return DatafieldMapKey.serializedForm(this._inputType, this._title);
    }
}

export class User {

    private _selected: boolean;

    constructor(private _name: string, private _surname: string, private _email: string) {
    }

    get name(): string {
        return this._name;
    }

    get surname(): string {
        return this._surname;
    }

    get fullName(): string {
        return this._name + ' ' + this._surname;
    }

    get email(): string {
        return this._email;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }
}

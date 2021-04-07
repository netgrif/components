import {PetriNetReference} from '../resources/interface/petri-net-reference';
import {Author} from '../resources/interface/author';
import {ImmediateData} from '../resources/interface/immediate-data';
import Transition from './transition';
import Transaction from './transaction';
import NetRole from './netRole';
import {Permissions} from './permissions';
/**
 * @ignore
 */
export class Net {
    /**
     * @ignore
     */
    private _stringId: string;
    /**
     * @ignore
     */
    private _title: string;
    /**
     * @ignore
     */
    private _identifier: string;
    /**
     * @ignore
     */
    private _version: string;
    /**
     * @ignore
     */
    private _initials: string;
    /**
     * @ignore
     */
    private _defaultCaseName: string;
    /**
     * @ignore
     */
    private _createdDate: Array<number>;
    /**
     * @ignore
     */
    private _author: Author;
    /**
     * @ignore
     */
    private _immediateData: Array<ImmediateData>;
    /**
     * @ignore
     */
    private _staticImmediateData: Array<ImmediateData>;
    /**
     * @ignore
     */
    private _transitions: Array<Transition>;
    /**
     * @ignore
     */
    private _transactions: Array<Transaction>;
    /**
     * @ignore
     */
    private _roles: Array<NetRole>;
    /**
     * @ignore
     */
    private _permissions: Permissions;
    /**
     * @ignore
     */
    constructor(net: PetriNetReference) {
        this._stringId = net.stringId;
        this._title = net.title;
        this._identifier = net.identifier;
        this._version = net.version;
        this._initials = net.initials;
        this._defaultCaseName = net.defaultCaseName;
        this._createdDate = net.createdDate;
        this._author = net.author;
        this._immediateData = net.immediateData;
        this._staticImmediateData = net.staticImmediateData;
        this._transitions = [];
        this._transactions = [];
        this._roles = [];
    }

    get stringId(): string {
        return this._stringId;
    }

    set stringId(value: string) {
        this._stringId = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get identifier(): string {
        return this._identifier;
    }

    set identifier(value: string) {
        this._identifier = value;
    }

    get version(): string {
        return this._version;
    }

    set version(value: string) {
        this._version = value;
    }

    get initials(): string {
        return this._initials;
    }

    set initials(value: string) {
        this._initials = value;
    }

    get defaultCaseName(): string {
        return this._defaultCaseName;
    }

    set defaultCaseName(value: string) {
        this._defaultCaseName = value;
    }

    get createdDate(): Array<number> {
        return this._createdDate;
    }

    set createdDate(value: Array<number>) {
        this._createdDate = value;
    }

    get author(): Author {
        return this._author;
    }

    set author(value: Author) {
        this._author = value;
    }

    get immediateData(): Array<ImmediateData> {
        return this._immediateData;
    }

    set immediateData(value: Array<ImmediateData>) {
        this._immediateData = value;
    }

    get staticImmediateData(): Array<ImmediateData> {
        return this._staticImmediateData;
    }

    set staticImmediateData(value: Array<ImmediateData>) {
        this._staticImmediateData = value;
    }

    get transitions(): Array<Transition> {
        return this._transitions;
    }

    set transitions(value: Array<Transition>) {
        this._transitions = value;
    }

    get transactions(): Array<Transaction> {
        return this._transactions;
    }

    set transactions(value: Array<Transaction>) {
        this._transactions = value;
    }

    get roles(): Array<NetRole> {
        return this._roles;
    }

    set roles(value: Array<NetRole>) {
        this._roles = value;
    }

    get permissions(): Permissions {
        return this._permissions;
    }

    set permissions(value: Permissions) {
        this._permissions = value;
    }
}

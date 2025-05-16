import {PetriNetReference} from '../resources/interface/petri-net-reference';
import {ImmediateData} from '../resources/interface/immediate-data';
import Transition from './transition';
import {PermissionsWrapper} from './permissions'
import {MapWrapper} from "../resources/interface/map-wrapper";
import {Properties} from "../data-fields/models/properties";

/**
 * @ignore
 */
export class Net implements PetriNetReference {
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
    * */
    private _uriNodeId: string;
    /**
     * @ignore
     */
    private _version: string;
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
    private _authorId: string;
    /**
     * @ignore
     */
    private _immediateData: Array<ImmediateData>;
    /**
     * @ignore
     */
    private _transitions: Array<Transition>;
    /**
     * @ignore
     */
    private _processRolePermissions: PermissionsWrapper;
    /**
     * @ignore
     */
    private _properties: MapWrapper<Properties>
    /**
     * @ignore
     */
    constructor(process: PetriNetReference) {
        this._stringId = process.stringId;
        this._title = process.title;
        this._identifier = process.identifier;
        this._version = process.version;
        this._defaultCaseName = process.defaultCaseName;
        this._createdDate = process.createdDate;
        this._authorId = process.authorId;
        this._immediateData = process.immediateData;
        this._transitions = [];
        this._uriNodeId = process.uriNodeId;
        this._processRolePermissions = process.processRolePermissions;
        this._properties = process.properties
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

    get authorId(): string {
        return this._authorId;
    }

    set authorId(value: string) {
        this._authorId = value;
    }

    get immediateData(): Array<ImmediateData> {
        return this._immediateData;
    }

    set immediateData(value: Array<ImmediateData>) {
        this._immediateData = value;
    }

    get transitions(): Array<Transition> {
        return this._transitions;
    }

    set transitions(value: Array<Transition>) {
        this._transitions = value;
    }

    get processRolePermissions(): PermissionsWrapper {
        return this._processRolePermissions;
    }

    set processRolePermissions(value: PermissionsWrapper) {
        this._processRolePermissions = value;
    }

    get properties(): MapWrapper<Properties> {
        return this._properties
    }

    set properties(value: MapWrapper<Properties>) {
        this._properties = value;
    }

    get uriNodeId(): string {
        return this._uriNodeId;
    }

    set uriNodeId(uriNodeId: string) {
        this._uriNodeId = uriNodeId;
    }
}

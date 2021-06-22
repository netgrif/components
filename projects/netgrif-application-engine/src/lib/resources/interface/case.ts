import {Author} from './author';
import {PetriNetObjectId} from './petri-net-object-id';
import {ImmediateData} from './immediate-data';
import {NaeDate} from '../types/nae-date-type';
import {Permissions, UsersPermissions} from '../../process/permissions';

/**
 * Object from Backend
 */
export interface Case {
    /**
     * **Example:** [
     * 2020,
     * 3,
     * 17,
     * 7,
     * 50,
     * 32,
     * 240000000
     *  ]
     */
    lastModified: NaeDate;
    /**
     * **Example:** PER-1669965980
     */
    visualId: string;
    /**
     * **Example:**
     *
     *    {
     *     "timestamp": 1582093194,
     *     "machineIdentifier": 694106,
     *     "processIdentifier": 6533,
     *     "counter": 8866186,
     *     "time": 1582093194000,
     *     "date": 1582093194000,
     *     "timeSecond": 1582093194
     *    }
     */
    petriNetObjectId: PetriNetObjectId;
    /**
     * **Example:** personal_information
     */
    processIdentifier: string;
    /**
     * **Example:** New instance - Personal information
     */
    title: string;
    /**
     * **Example:** color-fg-amber-500
     */
    color: string;
    /**
     * **Example:**  [
     * 2020,
     * 3,
     * 5,
     * 11,
     * 35,
     * 34,
     * 880000000
     * ]
     */
    creationDate: NaeDate;
    /**
     * **Example:**
     *
     *    [{
     *      "importId": "zoznam",
     *      "name": {
     *               "defaultValue": "Zoznam vozidiel",
     *               "translations": {}
     *      },
     *      "description": {
     *               "defaultValue": "Súbor obsahujúcizáznamy o vozidlách.",
     *               "translations": {}
     *       },
     *       "order": 0,
     *       "remote": false,
     *       "type": "file",
     *       "stringId": "zoznam"
     *    }]
     *
     */
    immediateData: Array<ImmediateData>;
    /**
     * **Example:** {
     *
     * "email": "example@netgrif.com",
     *
     * "fullName": "Example Netgrif"
     *
     * }
     */
    author: Author;
    /**
     * **Example:** {}
     */
    resetArcTokens: object;
    /**
     * **Example:** 5e4cd53c0a975a1985877b63
     */
    stringId: string;
    /**
     * **Example:** 5e4cd5070a975a19858772aa
     */
    petriNetId: string;
    /**
     * **Example:** home
     */
    icon?: string;
    /**
     * **Example:** {}
     */
    permissions: Permissions;
    /**
     * **Example:** {}
     */
    users?: UsersPermissions;
}



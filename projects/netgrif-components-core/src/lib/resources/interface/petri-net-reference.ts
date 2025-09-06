import {Author} from './author';
import {ImmediateData} from './immediate-data';
import {NaeDate} from '../types/nae-date-type';
import {I18nString} from "./i18n-string";

/**
 * Information Petri Net
 */
export interface PetriNetReference {
    /**
     * Mongo ID
     */
    stringId: string;
    /**
     * Title
     */
    title: string | I18nString;
    /**
     * Identifier
     */
    identifier: string;
    /**
     * Uri node ID
     */
    uriNodeId: string;
    /**
     * Version net
     */
    version: string;
    /**
     * Initials
     *
     * Max 3 Char
     */
    initials: string;
    /**
     * Name new Case Default Name
     */
    defaultCaseName: string;
    /**
     * Date import
     */
    createdDate: NaeDate;
    /**
     * [Author]{@link Author}
     */
    author: Author;
    /**
     * [ImmediateData]{@link ImmediateData}
     */
    immediateData: Array<ImmediateData>;
}


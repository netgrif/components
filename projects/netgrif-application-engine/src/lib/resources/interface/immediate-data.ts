import {FilterMetadata} from '../../search/models/persistance/filter-metadata';

/**
 * @ignore
 */
export interface ImmediateData {
    /**
     * @ignore
     */
    stringId: string;
    /**
     * @ignore
     */
    // TODO Exist only in Net Immediate data
    title?: any;
    /**
     * @ignore
     */
    type: string;
    /**
     * @ignore
     */
    value?: any;
    /**
     * Only for Fields of type `CaseRef` and `Filter`
     */
    allowedNets?: Array<string>;
    /**
     * Only for Fields of type `Filter`
     */
    filterMetadata?: FilterMetadata;
    /**
     * @ignore
     */
    // TODO Exists only in case immediate data
    name?: any;
}

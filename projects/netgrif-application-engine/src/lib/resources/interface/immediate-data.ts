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
     * Only for Fields of type CaseRef
     */
    allowedNets?: Array<string>;
    /**
     * @ignore
     */
    // TODO Exists only in case immediate data
    name?: any;
}

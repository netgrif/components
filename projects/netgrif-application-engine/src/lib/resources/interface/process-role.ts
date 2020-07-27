
/**
 * Object from Backend
 */
export interface ProcessRole {
    /**
     * Process ID - Process Mongo ID
     *
     * ***Example:*** 5e43f69c0a975a7f87551089
     */
    stringId: string;
    /**
     * Process Name
     *
     * ***Example:*** Klient
     */
    name?: string;
    /**
     * Process Description
     */
    description?: string;
}

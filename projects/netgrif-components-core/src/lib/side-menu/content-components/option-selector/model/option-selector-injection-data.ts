import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';

export interface OptionSelectorInjectionData extends SideMenuInjectionData {
    /**
     * The title that is displayed above the selection and passed trough a translate pipe
     */
    title: string;
    /**
     * Options that can be chosen from
     */
    options: Array<Option>;
}

/**
 * One of the selector choices
 */
export interface Option {
    /**
     * Text displayed to the user
     */
    text: string;
    /**
     * The value that is returned when the option is confirmed
     */
    value: string;
}

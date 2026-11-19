/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export interface SideMenuEvent {
    opened: boolean;
    message?: string;
    data?: any;

    [k: string]: any;
}

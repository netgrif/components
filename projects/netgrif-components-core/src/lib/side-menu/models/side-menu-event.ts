export interface SideMenuEvent {
    opened: boolean;
    message?: string;
    data?: any;

    [k: string]: any;
}

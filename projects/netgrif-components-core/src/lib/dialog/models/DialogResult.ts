export interface DialogResult {
    confirmed?: boolean;
    prompt?: string;

    [k: string]: any;
}

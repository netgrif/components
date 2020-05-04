export interface DialogData {
    title: string;
    content: string;
    placeholder?: string;
    negativeLabel?: string;
    positiveLabel?: string;

    [k: string]: any;
}

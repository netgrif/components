export interface CreateViewArguments {
    path: string;
    viewType: string;
    layoutParams?: { [k: string]: any; };
    access: { [k: string]: any; } | ('public' | 'private');
}

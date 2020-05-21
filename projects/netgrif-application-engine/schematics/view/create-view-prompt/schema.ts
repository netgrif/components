

export interface CreateViewArguments {
    path: string | undefined;
    viewType: string;
    layoutParams?: { [k: string]: any; };
    access: { [k: string]: any; } | ('public' | 'private');
}

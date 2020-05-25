

export interface CreateViewArguments {
    path: string | undefined;
    viewType: string | undefined;
    layoutParams?: { [k: string]: any; };
    access: { [k: string]: any; } | ('public' | 'private') | undefined;
}

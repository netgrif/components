export interface CreateViewArguments {
    path: string;
    viewType: string;
    layoutParams?: { [k: string]: any; };
    componentName?: string;
    access: { [k: string]: any; } | ('public' | 'private');
}

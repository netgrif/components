export interface GridElement {
    layout: GridLayout;
    type: string;
}

export interface GridLayout {
    x: number;
    y: number;
    rows: number;
    cols: number;
}

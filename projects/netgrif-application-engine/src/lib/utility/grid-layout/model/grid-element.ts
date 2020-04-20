export interface GridElement {
    layout: GridLayout;
    type: string;
}

export interface GridLayout extends BasicLayout {
    x: number;
    y: number;
}

export interface BasicLayout {
    rows: number;
    cols: number;
}

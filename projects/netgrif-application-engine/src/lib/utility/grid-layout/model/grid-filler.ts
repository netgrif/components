import {GridElement} from './grid-element';

export class GridFiller {
    public isIntentional = true;

    constructor(private start: number, private end: number) { }

    fillersAfterCover(start: number, end: number): Array<GridFiller> {
        this.isIntentional = false;
        if (this.start < start) {
            if (end < this.end) {
                // split the filler into two
                const rightHalf = new GridFiller(end + 1, this.end);
                this.end = start - 1;
                rightHalf.isIntentional = false;
                return [this, rightHalf];
            } else {
                // end might be cut-off
                this.end = Math.min(this.end, start - 1);
                return [this];
            }
        } else {
            if (end < this.end) {
                // start might be cut-off
                this.start = Math.max(this.start, end + 1);
                return [this];
            } else {
                // entire filler is covered
                return [];
            }
        }
    }

    convertToGridElement(y: number): GridElement {
        return {
            type: 'blank',
            layout: {
                x: this.start,
                y,
                rows: 1,
                cols: this.end - this.start + 1
            }
        };
    }

    isFullWidth(width: number): boolean {
        return this.start === 0 && this.end === width - 1;
    }
}

export class GridFiller {
    constructor(private start: number, private end: number) { }

    fillersAfterCover(start: number, end: number): Array<GridFiller> {
        if (this.start < start) {
            if (end < this.end) {
                // split the filler into two
                const rightHalf = new GridFiller(end + 1, this.end);
                this.end = end - 1;
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
}

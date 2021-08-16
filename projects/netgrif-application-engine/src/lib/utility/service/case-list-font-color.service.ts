import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CaseListFontColorService {

    cache: { [k: string]: string } = {};

    constructor() {
    }

    /**
     * Computes if font color of line should be white or black based on chosen hex case color.
     * Hex color is converted to its rbg components and decides from them if case color is dark or light.
     * Threshold for color lightness decision can be changed if needed
     *
     * @param caseColor string color of case
     * @returns font color black or white
     */
    computeCaseFontColor(caseColor: string): string {
        // check if hex color
        if (caseColor === undefined) {
            return 'black';
        }
        if (caseColor in this.cache) {
            return this.cache[caseColor];
        }
        const m = caseColor.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
        if (m === null || m.length !== 4) {
            this.cache[caseColor] = 'black';
            return 'black';
        }
        const r = parseInt(m[1], 16);
        const g = parseInt(m[2], 16);
        const b = parseInt(m[3], 16);
        // možné špecifickejšie upraviť threshold hodnotu
        const fontColor = (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 150) ?
            'black' : 'white';
        this.cache[caseColor] = fontColor;
        return fontColor;
    }
}

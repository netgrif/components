import {GridFiller} from './model/grid-filler';
import {GridElementWithItem} from './model/grid-element-with-item';
import {GridElement} from './model/grid-element';
import {LoggerService} from '../../logger/services/logger.service';

export class GridLayoutHelper {

    constructor(private _log: LoggerService) {
    }

    private static addGridRows(grid: Array<Array<GridFiller>>, newRowCount: number, columnCount: number): void {
        while (grid.length < newRowCount) {
            grid.push(GridLayoutHelper.newGridRow(columnCount));
        }
    }

    private static newGridRow(cols: number): Array<GridFiller> {
        return [new GridFiller(0, cols - 1)];
    }

    public fillBlankSpace(gridElements: Array<GridElement>,
                          columnCount: number,
                          elementVisibilityCondition: (element: any) => boolean = () => true): Array<GridElementWithItem<unknown>> {
        const grid: Array<Array<GridFiller>> = [];

        gridElements.forEach(element => {
            const elementRowEnd = element.layout.y + element.layout.rows - 1;
            const elementColEnd = element.layout.x + element.layout.cols - 1;
            if (elementRowEnd >= grid.length) {
                GridLayoutHelper.addGridRows(grid, elementRowEnd + 1, columnCount);
            }
            for (let row = element.layout.y; row <= elementRowEnd; row++) {
                if (!elementVisibilityCondition(element)) {
                    for (const filler of grid[row]) {
                        filler.isIntentional = false;
                    }
                } else {
                    const newFillers = [];
                    for (const filler of grid[row]) {
                        newFillers.push(...filler.fillersAfterCover(element.layout.x, elementColEnd));
                    }
                    grid[row] = newFillers;
                }
            }
        });

        const result: Array<GridElementWithItem<unknown>> = gridElements.filter(element => elementVisibilityCondition(element))
            .map(element => ({
                item: element,
                type: element.type,
                layout: element.layout
            }));
        let encounteredFirst = false;
        for (let y = grid.length - 1; y >= 0; y--) {
            const row = grid[y];
            if (row.length === 0) {
                encounteredFirst = true;
            }
            row.forEach(filler => {
                if (!encounteredFirst && !filler.isFullWidth(columnCount)) {
                    encounteredFirst = true;
                }
                if (encounteredFirst && (filler.isIntentional || !filler.isFullWidth(columnCount))) {
                    result.push(filler.convertToGridElement(y));
                }
            });
        }

        return result.sort((a, b) => {
            if (a.layout.y < b.layout.y) {
                return -1;
            } else if (a.layout.y > b.layout.y) {
                return 1;
            }
            if (a.layout.x < b.layout.x) {
                return -1;
            } else if (a.layout.x > b.layout.x) {
                return 1;
            }
            this._log.warn('Two elements in grid layout have the same X and Y coordinates! Make sure your data is valid.');
            return 0;
        });
    }

}

import {Injectable} from '@angular/core';
import {ViewService} from '../../routing/view-service/view.service';

interface OverflowState {
    overflowMode: boolean;
    columnWidth: number;
    columnCount: number;
}

@Injectable()
export class OverflowService {

    protected readonly DEFAULT_COLUMN_WIDTH = 190;
    protected readonly DEFAULT_COLUMN_COUNT = 6;
    private _overflowMode: boolean;
    private _columnWidth: number;
    private _columnCount: number;
    private _state: OverflowState;

    constructor(protected viewService: ViewService) {
        this._overflowMode = this.initializeItem('overflowMode', false) === 'true';
        this._columnCount = this.checkIsNan(this.initializeItem('columnCount', this.DEFAULT_COLUMN_COUNT), this.DEFAULT_COLUMN_COUNT);
        this._columnWidth = this.checkIsNan(this.initializeItem('columnWidth', this.DEFAULT_COLUMN_WIDTH), this.DEFAULT_COLUMN_WIDTH);
    }

    get overflowMode(): boolean {
        return this._overflowMode;
    }

    set overflowMode(value: boolean) {
        this._overflowMode = value;
    }

    get columnWidth(): number {
        return this._columnWidth;
    }

    set columnWidth(value: number) {
        this._columnWidth = value;
    }

    get columnCount(): number {
        return this._columnCount;
    }

    set columnCount(value: number) {
        this._columnCount = value;
    }

    public saveState(): void {
        this._state = {
            overflowMode: this._overflowMode,
            columnWidth: this._columnWidth,
            columnCount: this._columnCount,
        };
    }

    public saveNewState(): void {
        const id = this.viewService.getViewId();
        localStorage.setItem(id + '-overflowMode', this._overflowMode + '');
        localStorage.setItem(id + '-columnCount', this._columnCount + '');
        localStorage.setItem(id + '-columnWidth', this._columnWidth + '');
        this._state = undefined;
    }

    public restoreLastState(): void {
        this._overflowMode = this._state.overflowMode;
        this._columnWidth = this._state.columnWidth;
        this._columnCount = this._state.columnCount;
        this._state = undefined;
    }

    protected initializeItem(id: string, defaultValue) {
        const item = localStorage.getItem(this.viewService.getViewId() + '-' + id);
        if (item !== undefined) {
            return item;
        } else {
            return defaultValue;
        }
    }

    protected checkIsNan(item, defaultValue) {
        return isNaN(parseInt(item, 10)) ? defaultValue : parseInt(item, 10);
    }
}

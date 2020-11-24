import {Injectable} from '@angular/core';
import {ViewService} from '../../routing/view-service/view.service';

interface OverflowState {
    overflowMode: boolean;
    columnWidth: number;
    columnCount: number;
}

@Injectable()
export class OverflowService {

    private _overflowMode: boolean;
    private _columnWidth: number;
    private _columnCount: number;
    private _state: OverflowState;

    constructor(protected viewService: ViewService) {
        const overflow = localStorage.getItem(this.viewService.getViewId() + '-overflowMode');
        if (overflow !== undefined) {
            this._overflowMode = overflow === 'true';
        } else {
            this._overflowMode = false;
        }
        const count = localStorage.getItem(this.viewService.getViewId() + '-columnCount');
        if (count !== undefined) {
            this._columnCount = isNaN(parseInt(count, 10)) ? 6 : parseInt(count, 10);
        } else {
            this._columnCount = 6;
        }
        const width = localStorage.getItem(this.viewService.getViewId() + '-columnWidth');
        if (width !== undefined) {
            this._columnWidth = isNaN(parseInt(width, 10)) ? 190 : parseInt(width, 10);
        } else {
            this._columnWidth = 190;
        }
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
    }

    public restoreLastState(): void {
        this._overflowMode = this._state.overflowMode;
        this._columnWidth = this._state.columnWidth;
        this._columnCount = this._state.columnCount;
        this._state = undefined;
    }
}

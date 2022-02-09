import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaperViewService {
    private _paperView: boolean;

    constructor() {
        const paper = localStorage.getItem('PaperView');
        if (paper === null) {
            this._paperView = false;
            localStorage.setItem('PaperView', 'false');
        } else {
            if ( paper === 'true' ) {
                this._paperView = true;
            } else if ( paper === 'false' ) {
                this._paperView = false;
            } else {
                this._paperView = false;
                localStorage.setItem('PaperView', 'false');
            }
        }
    }

    set paperView(bool: boolean) {
        this._paperView = bool;
        localStorage.setItem('PaperView', `${bool}`);
    }

    get paperView(): boolean {
        return this._paperView;
    }
}

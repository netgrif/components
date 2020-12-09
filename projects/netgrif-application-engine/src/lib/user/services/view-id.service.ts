import {Inject, Injectable, Injector, Optional, SkipSelf} from '@angular/core';
import {NAE_VIEW_ID_SEGMENT} from '../models/view-id-injection-tokens';

@Injectable()
export class ViewIdService {

    protected _viewId: string;

    constructor(@Optional() @SkipSelf() parentInjector: Injector, @Inject(NAE_VIEW_ID_SEGMENT) idSegment: string) {
        this._viewId = '';
        if (parentInjector !== null) {
            const parentIdService = parentInjector.get(ViewIdService);
            this._viewId = parentIdService.viewId + '.';
        }
        this._viewId += idSegment;
    }

    public get viewId(): string {
        return this._viewId;
    }
}

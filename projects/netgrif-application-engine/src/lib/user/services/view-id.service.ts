import {Inject, Injectable, Injector, Optional, SkipSelf} from '@angular/core';
import {NAE_VIEW_ID_SEGMENT} from '../models/view-id-injection-tokens';

@Injectable()
export class ViewIdService {

    public static readonly VIEW_ID_SEGMENT_SEPARATOR = '-';

    protected _viewId: string;

    constructor(@Optional() @SkipSelf() parentInjector: Injector, @Inject(NAE_VIEW_ID_SEGMENT) idSegment: string) {
        this._viewId = '';
        if (parentInjector !== null) {
            const parentIdService = parentInjector.get(ViewIdService, null);
            if (parentIdService !== null) {
                this._viewId = parentIdService.viewId + ViewIdService.VIEW_ID_SEGMENT_SEPARATOR;
            }
        }
        this._viewId += idSegment;
    }

    public get viewId(): string {
        return this._viewId;
    }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NAE_VIEW_ID_SEGMENT, ViewIdService } from '@netgrif/components-core';

@Component({
    selector: 'app-empty-view',
    templateUrl: './empty-view.component.html',
    providers: [
        {
            provide: NAE_VIEW_ID_SEGMENT,
            useValue: 'emptyView'
        },
        ViewIdService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EmptyViewComponent {
    constructor() {}
}

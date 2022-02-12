import {Component} from '@angular/core';
import {NAE_VIEW_ID_SEGMENT, ViewIdService} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-wrapper-empty-view',
    templateUrl: './wrapper-empty-view.component.html',
    styleUrls: ['./wrapper-empty-view.component.scss'],
    providers: [
       {   provide: NAE_VIEW_ID_SEGMENT,
           useValue: 'wrapper'},
       ViewIdService,
   ]
})
export class WrapperEmptyViewComponent {

    constructor() {}

}

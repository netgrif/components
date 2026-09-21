import {Component} from '@angular/core';
import {AbstractSortModeComponent, HeaderColumn} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {createSortLabel} from '../sort-label';

@Component({
    selector: 'nc-sort-mode',
    templateUrl: './sort-mode.component.html',
    styleUrls: ['./sort-mode.component.scss']
})
export class SortModeComponent extends AbstractSortModeComponent {
    constructor(private translate: TranslateService) {
        super();
    }

    public sortLabel(header: HeaderColumn): string {
        return createSortLabel(header, this.translate);
    }

    public setValue() {
        this.approvalFormControl.setValue(true);
    }
}


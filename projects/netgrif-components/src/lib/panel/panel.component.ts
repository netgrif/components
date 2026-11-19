import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractPanelComponent} from '@netgrif/components-core';
import {CaseListFontColorService} from '@netgrif/components-core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'nc-app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PanelComponent extends AbstractPanelComponent {
    constructor(caseListFontColorService: CaseListFontColorService, activatedRoute: ActivatedRoute) {
        super(caseListFontColorService, activatedRoute);
    }
}

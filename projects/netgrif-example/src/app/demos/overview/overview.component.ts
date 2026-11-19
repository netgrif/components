import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DEMO_GROUPS} from '../../playground/demos';

@Component({
    selector: 'ne-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class OverviewComponent {
    readonly groups = DEMO_GROUPS;
}

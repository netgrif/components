import { Component, ChangeDetectionStrategy} from '@angular/core';
import { AbstractPanelItemComponent } from '@netgrif/components-core';

@Component({
  selector: 'nc-panel-item',
  templateUrl: './panel-item.component.html',
  styleUrls: ['./panel-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PanelItemComponent extends AbstractPanelItemComponent {

  constructor() {
      super();
  }
}

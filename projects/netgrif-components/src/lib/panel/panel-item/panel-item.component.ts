import {Component, Injector} from '@angular/core';
import {AbstractPanelItemComponent, PanelItemComponentRegistryService} from '@netgrif/components-core';

@Component({
  selector: 'nc-panel-item',
  templateUrl: './panel-item.component.html',
  styleUrls: ['./panel-item.component.scss']
})
export class PanelItemComponent extends AbstractPanelItemComponent {

  constructor(registry: PanelItemComponentRegistryService, injector: Injector) {
      super(registry, injector);
  }
}

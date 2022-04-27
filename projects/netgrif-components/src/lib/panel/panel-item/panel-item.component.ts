import { Component, OnInit } from '@angular/core';
import { AbstractPanelItemComponent } from '@netgrif/components-core';

@Component({
  selector: 'nc-panel-item',
  templateUrl: './panel-item.component.html',
  styleUrls: ['./panel-item.component.scss']
})
export class PanelItemComponent extends AbstractPanelItemComponent implements OnInit {

  constructor() {
      super();
  }

  ngOnInit(): void {
  }

}

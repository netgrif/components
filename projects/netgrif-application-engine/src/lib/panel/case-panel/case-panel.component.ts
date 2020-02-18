import {Component, Input, OnInit} from '@angular/core';
import {CasePanelDefinition} from "./case-panel-definition";

@Component({
  selector: 'nae-case-panel',
  templateUrl: './case-panel.component.html',
  styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent implements OnInit {

    @Input() casePanelDefinition: CasePanelDefinition;
    showSpinner = false;
    panelIcon: string;
    panelIconField: string;


    ngOnInit() {
        this.panelIcon = this.casePanelDefinition.panelIcon;
        this.panelIconField = this.casePanelDefinition.panelIconField;
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

}

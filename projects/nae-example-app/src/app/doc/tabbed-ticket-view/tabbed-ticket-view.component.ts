import { Component} from '@angular/core';
import {TabContent} from "netgrif-components-core";
import {DefaultTabbedSingleTaskViewComponent, DefaultTicketViewComponent} from "@netgrif/components";

@Component({
  selector: 'nae-app-tabbed-ticket-view',
  templateUrl: './tabbed-ticket-view.component.html',
  styleUrls: ['./tabbed-ticket-view.component.scss']
})
export class TabbedTicketViewComponent  {
    readonly TITLE = 'Tabbed Ticket View';
    readonly DESCRIPTION = 'Ukážka integracie tabbed-ticket view';

    tabs: Array<TabContent>;

    constructor() {
        this.tabs = [
            {
                label: {
                    text: 'Ticket View',
                    icon: 'add'
                },
                canBeClosed: false,
                tabContentComponent: DefaultTicketViewComponent,
                injectedObject: {
                    tabViewComponent: DefaultTabbedSingleTaskViewComponent,
                    tabViewOrder: 0,
                    exampleUseCache: true
                }
            },

        ];
    }

}

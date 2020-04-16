import {Component, Input, OnInit} from '@angular/core';
import {TabContent} from '../interfaces';
import {TabView} from '../classes/tab-view';

@Component({
    selector: 'nae-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit {

    @Input() initialTabs: Array<TabContent>;
    tabGroup: TabView;

    initializeTabLambda = (index: number) => {this.tabGroup.initializeTab(index); };

    ngOnInit(): void {
        this.tabGroup = new TabView(this.initialTabs);
    }
}

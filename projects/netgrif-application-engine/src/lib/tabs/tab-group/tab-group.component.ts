import {Component, Input, OnInit} from '@angular/core';
import {TabContent} from '../interfaces';
import {TabGroup} from '../classes/tab-group';

@Component({
    selector: 'nae-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

    initializeTabLambda = (index: number) => {this.tabGroup.initializeTab(index)};

    @Input() initialTabs: Array<TabContent>;
    tabGroup: TabGroup;

    ngOnInit(): void {
        this.tabGroup = new TabGroup(this.initialTabs);
    }
}

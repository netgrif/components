import {Component, Input, OnInit} from '@angular/core';
import {TabContent} from '../interfaces';
import {TabView} from '../classes/tab-view';

/**
 * Component that renders a tab view.
 *
 * See {@link TabView} for the class that holds the logic for this view.
 */
@Component({
    selector: 'nae-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit {

    /**
     * Tabs that are opened initially in the view
     */
    @Input() public initialTabs: Array<TabContent>;
    public tabView: TabView;

    /**
     * @ignore
     * lambda function that is passed to the {@link TabCreationDetectorComponent}s
     */
    public initializeTabLambda = (index: number) => {this.tabView.initializeTab(index); };

    ngOnInit(): void {
        this.tabView = new TabView(this.initialTabs);
    }
}

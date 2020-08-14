import {Component, Input, OnInit} from '@angular/core';
import {TabContent} from '../interfaces';
import {TabView} from '../classes/tab-view';
import {ViewService} from '../../routing/view-service/view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {ReplaySubject} from 'rxjs';

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
    /**
     * Flag if the height of the content has to stretch to fill the available window
     */
    @Input() public stretch: boolean;
    public tabView: TabView;

    @Input() public align = 'start';

    public offset = '';

    /**
     * @ignore
     * lambda function that is passed to the {@link TabCreationDetectorComponent}s
     */
    public initializeTabLambda = (index: number) => {this.tabView.initializeTab(index); };

    constructor(private _viewService: ViewService, private _logger: LoggerService) {
    }

    ngOnInit(): void {
        this.tabView = new TabView(this._viewService, this._logger, this.initialTabs);
    }

    badgeHidden(tab: TabContent) {
        const stream$ = new ReplaySubject<boolean>(1);
        if (tab.label && tab.label.count) {
            tab.label.count.subscribe(() => {
                stream$.next(false);
            });
        } else {
            stream$.next(true);
        }
        return stream$;
    }

    badgeCount(tab: TabContent) {
        const stream$ = new ReplaySubject<string>(1);
        if (tab.label && tab.label.count) {
            tab.label.count.subscribe(count => {
                stream$.next( count + '');
                this.setOffset((count + '').length);
            });
        } else {
            stream$.next('0');
        }
        return stream$;
    }

    private setOffset(count: number) {
        this.offset = Array(count * 2).join('\xa0');
    }
}

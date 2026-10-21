import {Component, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {TabContent, TabPersistenceAdapter} from '../interfaces';
import {TabView} from '../classes/tab-view';
import {ViewService} from '../../routing/view-service/view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {ReplaySubject} from 'rxjs';
import {take} from 'rxjs/operators';
import {TabPersistenceService} from '../services/tab-persistence.service';
import {NAE_TAB_PINNING_ENABLED} from '../tab-pinning-injection-token/tab-pinning-injection-token';

/**
 * Component that renders a tab view.
 *
 * See {@link TabView} for the class that holds the logic for this view.
 */
@Component({
    selector: 'ncc-abstract-tab-view',
    template: ''
})
export abstract class AbstractTabViewComponent implements OnInit, OnDestroy {

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

    @Input() public persistenceKey: string;

    @Input() public persistenceAdapter: TabPersistenceAdapter;

    @Input() public pinningEnabled: boolean | undefined;

    public offset = '';

    /**
     * @ignore
     * lambda function that is passed to the {@link AbstractTabCreationDetectorComponent}s
     */
    public initializeTabLambda = (index: number) => {this.tabView.initializeTab(index); };

    protected constructor(protected _viewService: ViewService, protected _logger: LoggerService, protected _injector: Injector) {
    }

    ngOnInit(): void {
        const pinningEnabled = this.pinningEnabled ?? this._injector.get(NAE_TAB_PINNING_ENABLED);
        const persistence = this.persistenceKey ? {
            key: this.persistenceKey,
            service: this._injector.get(TabPersistenceService),
            adapter: this.persistenceAdapter
        } : undefined;
        this.tabView = new TabView(
            this._viewService,
            this._logger,
            this.initialTabs ?? [],
            this._injector,
            persistence,
            pinningEnabled
        );
    }

    ngOnDestroy(): void {
        this.tabView?.persist();
        this.tabView?.openedTabs.forEach(tab => tab.destroy());
    }

    badgeHidden(tab: TabContent) {
        const stream$ = new ReplaySubject<boolean>(1);
        if (tab.label && tab.label.count) {
            tab.label.count.pipe(take(1)).subscribe(() => {
                stream$.next(false);
                stream$.complete();
            });
        } else {
            stream$.next(true);
            stream$.complete();
        }
        return stream$;
    }

    badgeCount(tab: TabContent) {
        const stream$ = new ReplaySubject<string>(1);
        if (tab.label && tab.label.count) {
            tab.label.count.pipe(take(1)).subscribe(count => {
                stream$.next( count + '');
                this.setOffset((count + '').length);
                stream$.complete();
            });
        } else {
            stream$.next('0');
            stream$.complete();
        }
        return stream$;
    }

    private setOffset(count: number) {
        this.offset = Array(count * 2).join('\xa0');
    }
}

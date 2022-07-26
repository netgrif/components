import {TabContent, TabLabel} from '../interfaces';
import {ComponentPortal} from '@angular/cdk/portal';
import {Type} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

/**
 * Holds the information of tab opened in a tab view.
 *
 * See {@link TabView} for more information.
 */
export class OpenedTab implements TabContent {

    /**
     * See {@link TabContent#label}.
     */
    public label: TabLabel;
    /**
     * See [TabContent.canBeClosed]{@link TabContent#canBeClosed}.
     */
    public canBeClosed: boolean;
    /**
     * See [TabContent.tabContentComponent]{@link TabContent#tabContentComponent}.
     */
    public tabContentComponent: Type<any>;
    /**
     * See [TabContent.injectedObject]{@link TabContent#injectedObject}.
     */
    public injectedObject: object = {};
    /**
     * See [TabContent.order]{@link TabContent#order}.
     */
    public order = 0;
    /**
     * See [TabContent.initial]{@link TabContent#initial}.
     */
    public initial = false;
    /**
     * See [TabContent.parentUniqueId]{@link TabContent#parentUniqueId}.
     */
    public parentUniqueId = undefined;
    /**
     * Reference to the component portal that is used to display the tab content
     */
    public portal: ComponentPortal<any>;
    /**
     * Whether the tab was initialized after it's creation.
     *
     * See [TabGroup.initializeTab()]{@link TabView#initializeTab} for more information.
     */
    public isTabInitialized = false;
    /**
     * A stream that is injected into each tab and is used to inform that tab whenever it is selected or deselected
     */
    public tabSelected$: BehaviorSubject<boolean>;
    /**
     * A stream that is injected into each tab and is used to inform the tab about its termination
     */
    public tabClosed$: Subject<void>;

    private _labelIcon$: BehaviorSubject<string | undefined>;

    private _labelText$: ReplaySubject<string>;


    /**
     * @param tabContent - content of the tab
     * @param uniqueId - unique identifier for the tab
     */
    constructor(tabContent: TabContent, public uniqueId: string) {
        Object.assign(this, tabContent);
        this.tabSelected$ = new BehaviorSubject<boolean>(false);
        this.tabClosed$ = new Subject();
        this._labelText$ = new ReplaySubject<string>(1);
        this._labelIcon$ = new BehaviorSubject<string>(this.label?.icon);
        if (!!this.label?.text) {
            this._labelText$.next(this.label.text);
        }
    }

    public setIcon(icon: string) {
        this._labelIcon$.next(icon);
    }

    public setText(text: string) {
        this._labelText$.next(text);
    }

    public getIcon$(): Observable<string> {
        return this._labelIcon$.asObservable();
    }

    public getIcon(): string | undefined {
        return this._labelIcon$.getValue();
    }

    public getText$(): Observable<string> {
        return this._labelText$.asObservable();
    }

    /**
     * Closes the stream held in this object
     */
    public destroy(): void {
        this.tabSelected$.complete();
        this.tabClosed$.complete();
        this._labelText$.complete();
        this._labelIcon$.complete();
    }
}

import {Component, Inject, Input, Optional, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../tabs/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AbstractDefaultTaskListComponent} from './default-task-panel-list/abstract-default-task-list.component';
import {Observable} from 'rxjs';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import {I18nFieldValue} from "../../data-fields/i18n-field/models/i18n-field-value";
import {LanguageService} from "../../translate/language.service";

@Component({
    selector: 'ncc-abstract-task-list',
    template: ''
})
export abstract class AbstractTaskListComponent extends AbstractDefaultTaskListComponent {

    @Input() emptyContentText: I18nFieldValue | undefined;
    @Input() emptyContentIcon: string = 'check_box';

    @Input()
    set tasks$(tasks: Observable<Array<TaskPanelData>>) {
        this._tasks$ = tasks;
    }

    get tasks$(): Observable<Array<TaskPanelData>> {
        return this._tasks$;
    }
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    protected constructor(protected _taskViewService: TaskViewService,
                          protected _log: LoggerService,
                          @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                          protected _selectLangService: LanguageService,
                          protected route?: ActivatedRoute) {
        super(_taskViewService, _log, injectedTabData, route);
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._taskViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }

    public hasEmptyContentText(): boolean {
        const text: string = this.getEmptyContentText();
        return text !== undefined && text !== '';
    }

    public getEmptyContentText(): string | undefined {
        if (!this.emptyContentText) {
            return undefined;
        }
        const lang: string = this._selectLangService.getLanguage();
        const translations = this.emptyContentText.translations ?? {};
        let resultText: string | undefined = translations[lang];
        if (!resultText) {
            resultText = this.emptyContentText.defaultValue;
        }
        return resultText;
    }

    public getEmptyContentIcon(): string {
        return !!this.emptyContentIcon && this.emptyContentIcon !== '' ? this.emptyContentIcon : 'check_box';
    }
}

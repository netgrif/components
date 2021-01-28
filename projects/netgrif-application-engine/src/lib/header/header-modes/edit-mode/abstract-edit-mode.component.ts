import {Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {HeaderColumn} from '../../models/header-column';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {FieldsGroup} from '../../models/fields-group';
import {orderBy} from 'natural-orderby';
import {Observable, Subscription} from 'rxjs';
import {LoggerService} from '../../../logger/services/logger.service';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';

export interface HeaderOption {
    groupTitle: string;
    fields: Array<HeaderColumn>;
}

export abstract class AbstractEditModeComponent extends AbstractHeaderModeComponent implements OnInit, OnDestroy {
    public formControls: Array<FormControl> = [];
    public filterOptions: Array<Observable<Array<HeaderOption>>> = [];
    protected subHeader: Subscription;

    @Input() public headerService: AbstractHeaderService;

    protected constructor(protected _translate: TranslateService,
                          protected _log: LoggerService) {
        super();
    }

    ngOnInit(): void {
        this.subHeader = this.headerService.headerColumnCount$.subscribe(newCount => this.updateHeaderCount(newCount));
    }

    ngOnDestroy(): void {
        this.subHeader.unsubscribe();
    }

    protected updateHeaderCount(newCount: number): void {
        if (this.formControls.length > newCount) {
            this.formControls = this.formControls.slice(0, newCount);
            this.filterOptions = this.filterOptions.slice(0, newCount);
            return;
        }

        while (this.formControls.length < newCount) {
            const i = this.formControls.length;
            const formControl = new FormControl();
            formControl.setValue(this.headerService.headerState.selectedHeaders[i]);
            this.formControls.push(formControl);
            this.filterOptions.push(formControl.valueChanges.pipe(
                startWith(''),
                map(inputText => this._filter(inputText)))
            );
        }
    }

    protected _filter(value): Array<HeaderOption> {
        let filterValue;
        if (typeof value === 'string') {
            filterValue = (value as string).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        } else {
            filterValue = '';
        }

        const arrayGroup: Array<FieldsGroup> = [];
        arrayGroup.push(...this.headerService.fieldsGroup);
        const meta = arrayGroup.splice(0, 1);
        // TODO IMPROVEMENT 17.7.2020 - don't sort the fieldsGroup array here, but sort it once in the headerService and maintain
        //  the sorted order there
        meta.push(...orderBy(arrayGroup, v => v.groupTitle, 'asc'));
        meta.forEach(group => group.fields = orderBy(group.fields, v => v.title, 'asc'));

        return meta.map(group => ({
            groupTitle: group.groupTitle,
            fields: group.fields.filter(option => this.checkImmediateTitle(option) &&
                this._translate.instant(option.title).toLowerCase().normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0)
        })).filter(group => group.fields.length > 0);
    }

    public headerColumnSelected(columnIndex: number, newHeaderColumn: HeaderColumn) {
        this.headerService.headerColumnSelected(columnIndex, newHeaderColumn);
    }

    public renderSelection = (header) => {
        return header ? this._translate.instant(header.title) : '';
    }

    private checkImmediateTitle(option: HeaderColumn): boolean {
        if (option.title === undefined || option.title === '') {
            this._log.warn('Immediate field in column [' + option.uniqueId + '] does not have a title');
            return false;
        }
        return true;
    }
}

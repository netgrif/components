import {Component, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {HeaderColumn} from '../../models/header-column';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {FieldsGroup} from '../../models/fields-group';
import {orderBy} from 'natural-orderby';

@Component({
    selector: 'nae-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
    public formControls = {
        0: new FormControl(),
        1: new FormControl(),
        2: new FormControl(),
        3: new FormControl(),
        4: new FormControl(),
    };

    public filterOptions = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
    };

    @Input() public headerService: AbstractHeaderService;

    constructor(private _translate: TranslateService) {
    }

    ngOnInit(): void {
        const array = [0, 1, 2, 3, 4];
        array.forEach( index => {
            this.formControls[index].setValue(this.headerService.headerState.selectedHeaders[index]);
            this.filterOptions[index] = this.formControls[index].valueChanges
                .pipe(
                    startWith(''),
                    map(inputText => this._filter(inputText))
            );
        });
    }

    private _filter(value): string[] {
        let filterValue;
        if (typeof value === 'string') {
            filterValue = (value as string).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        } else {
            filterValue = '';
        }

        const arrayGroup: Array<FieldsGroup> = [];
        arrayGroup.push(...this.headerService.fieldsGroup);
        const meta = arrayGroup.splice(0, 1);
        meta.push(...orderBy(arrayGroup, v => v.groupTitle, 'asc'));
        meta.forEach(group => group.fields = orderBy(group.fields, v => v.title, 'asc'));

        return meta.map(group => ({
            groupTitle: group.groupTitle,
            fields: group.fields.filter(option => this._translate.instant(option.title).toLowerCase().normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0)
        })).filter(group => group.fields.length > 0) as any;
    }

    public headerColumnSelected(columnIndex: number, newHeaderColumn: HeaderColumn) {
        this.headerService.headerColumnSelected(columnIndex, newHeaderColumn);
    }

    public renderSelection = (header) => {
        return header ? this._translate.instant(header.title) : '';
    }
}

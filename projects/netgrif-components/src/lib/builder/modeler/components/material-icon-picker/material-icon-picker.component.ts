import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {MaterialIconList} from './material-icon-list';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MaterialModule} from "@netgrif/components-core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {FlexModule} from "@ngbracket/ngx-layout";
import {MatOption} from "@angular/material/core";

@Component({
    selector: 'nc-builder-material-icon-picker',
    templateUrl: './material-icon-picker.component.html',
    standalone: true,
    styleUrls: ['./material-icon-picker.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, AsyncPipe, MaterialModule, NgForOf, MatAutocomplete, MatFormField, MatLabel, MatOption, MatIcon, MatAutocompleteTrigger, MatInput, FlexModule]
})
export class MaterialIconPickerComponent implements OnInit {

    formControlRef: FormControl;
    public icons = MaterialIconList.icons;
    public filteredIcons: Observable<Array<string>>;
    protected _icon: string;
    @Output() iconChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        this.formControlRef = new FormControl('');
    }

    @Input()
    set icon(value: string) {
        this._icon = value;
        this.formControlRef.setValue(this._icon);
    }

    get icon(): string {
        return this._icon;
    }

    ngOnInit(): void {
        this.filteredIcons = this.formControlRef.valueChanges.pipe(
            startWith(''),
            tap(value => {
                if (value !== this._icon) {
                    this._icon = value;
                    this.iconChange.next(this._icon);
                }
            }),
            map(value => this._filter(value || '')),
            map(value => {
                if (value.length > 20) {
                    return value.slice(0, 20)
                }
                return value;
            })
        );
    }

    private _filter(value: string): Array<string> {
        const filterValue = value.toLowerCase();
        if (value === '') {
            return new Array<string>();
        }
        const startsWith = new Array<string>();
        const includes = new Array<string>();
        this.icons.forEach(icon => {
            if (icon.includes(filterValue)) {
                if (icon.startsWith(filterValue)) {
                    startsWith.push(icon);
                } else {
                    includes.push(icon);
                }
            }
        });
        return startsWith.concat(includes);
    }
}

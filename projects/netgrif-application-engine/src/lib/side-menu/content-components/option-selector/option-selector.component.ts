import {Component, Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {Option, OptionSelectorInjectionData} from './model/option-selector-injection-data';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'nae-option-selector',
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.component.scss']
})
export class OptionSelectorComponent {

    data: OptionSelectorInjectionData;
    selectorFormControl = new FormControl('', Validators.required);
    filteredOptions: Observable<Array<Option>>;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl) {
        this.data = _sideMenuControl.data as OptionSelectorInjectionData;

        this.filteredOptions = this.selectorFormControl.valueChanges.pipe(
            startWith(''),
            map(input => typeof input === 'string' ? input : input.value),
            map(name => name ? this._filter(name) : this.data.options.slice())
        );
    }

    submit(): void {
        if (this.selectorFormControl.valid) {
            this._sideMenuControl.close({
                opened: false,
                message: 'Selected option was confirmed',
                data: this.selectorFormControl.value
            });
        }
    }

    displayFn(option: Option): string {
        return option.text;
    }

    private _filter(value: string): Array<Option> {
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.data.options.filter(option => option.value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

}

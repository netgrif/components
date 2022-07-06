import { Component} from '@angular/core';
import {AbstractMultichoiceAutocompleteFieldComponentComponent} from 'netgrif-components-core';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'nc-multichoice-autocomplete-field',
  templateUrl: './multichoice-autocomplete-field.component.html',
  styleUrls: ['./multichoice-autocomplete-field.component.scss']
})
export class MultichoiceAutocompleteFieldComponent  extends AbstractMultichoiceAutocompleteFieldComponentComponent {

    constructor() {
        console.log("totok");
        super();
    }

    add(event: MatChipInputEvent): void {
        console.log("totok");
        const value = (event.value || '').trim();
        console.log(value);
        if (value) {
            this.multichoiceField.value.push(value);
        }

        event.chipInput!.clear();
        this.formControlRef.setValue(null);

    }

    remove(value: string): void {
        const index = this.multichoiceField.value.indexOf(value);

        if (index >= 0) {
            this.multichoiceField.value.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        console.log("totok");
        this.multichoiceField.value.push(event.option.viewValue);
        // this.formControlRef.setValue(null);
    }

}

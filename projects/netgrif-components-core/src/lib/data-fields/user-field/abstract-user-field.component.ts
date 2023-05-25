import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {UserField} from './models/user-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
@Component({
    selector: 'ncc-abstract-user-field',
    template: ''
})
export abstract class AbstractUserFieldComponent extends AbstractDataFieldComponent implements OnInit {

    @Input() public dataField: UserField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}

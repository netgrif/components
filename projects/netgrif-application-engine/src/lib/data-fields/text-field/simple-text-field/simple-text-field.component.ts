import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {Subject} from 'rxjs';
import {ChangedFields} from '../ChangedFields';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'nae-simple-text-field',
    templateUrl: './simple-text-field.component.html',
    styleUrls: ['./simple-text-field.component.scss']
})
export class SimpleTextFieldComponent implements OnInit {

    @Input() textField: TextField;
    @Input() formControlRef: FormControl;
    @Input() changedFields: Subject<ChangedFields>;
    @Input() showLargeLayout: WrappedBoolean;

    constructor() {
    }

    ngOnInit() {
        this.textField.resolve(this.formControlRef);
        this.changedFields.pipe(
            filter(fields => this.textField.stringId in fields),
            map(fields => fields[this.textField.stringId])
        ).subscribe(change => {
            this.textField.applyChange(change);
            this.textField.resolve(this.formControlRef);
        });
    }
}

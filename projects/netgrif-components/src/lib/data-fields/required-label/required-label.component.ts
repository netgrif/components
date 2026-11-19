import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'nc-required-label',
    templateUrl: './required-label.component.html',
    styleUrls: ['./required-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RequiredLabelComponent {

    @Input() public isIn = false;

    constructor() {
    }
}

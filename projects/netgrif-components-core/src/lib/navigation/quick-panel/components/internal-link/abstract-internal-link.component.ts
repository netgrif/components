import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'ncc-abstract-internal-link',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractInternalLinkComponent {

    @Input() public link: string;
    @Input() public icon: string;

    constructor() {
    }

}

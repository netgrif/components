import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ncc-abstract-internal-link',
    template: ''
})
export abstract class AbstractInternalLinkComponent {

    @Input() public link: string;
    @Input() public icon: string;

    constructor() {
    }

}

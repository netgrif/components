import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'nc-required-label',
    templateUrl: './required-label.component.html',
    styleUrls: ['./required-label.component.scss']
})
export class RequiredLabelComponent implements OnInit {

    @Input() public isIn = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}

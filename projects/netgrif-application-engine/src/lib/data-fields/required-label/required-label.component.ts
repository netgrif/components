import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'nae-required-label',
    templateUrl: './required-label.component.html',
    styleUrls: ['./required-label.component.scss']
})
export class RequiredLabelComponent implements OnInit {

    @Input() public isIn: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}

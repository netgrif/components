import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-internal-link',
    templateUrl: './internal-link.component.html',
    styleUrls: ['./internal-link.component.scss']
})
export class InternalLinkComponent implements OnInit {

    @Input() public link: string;
    @Input() public icon: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}

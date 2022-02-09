import {Input, OnInit} from '@angular/core';

export abstract class AbstractInternalLinkComponent implements OnInit {

    @Input() public link: string;
    @Input() public icon: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}

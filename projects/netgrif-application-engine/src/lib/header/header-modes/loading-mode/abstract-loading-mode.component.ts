import {Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';

export abstract class AbstractLoadingModeComponent implements OnInit {

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit(): void {
    }

}

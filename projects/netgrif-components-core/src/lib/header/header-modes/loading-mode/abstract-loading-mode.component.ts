import {Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';

export abstract class AbstractLoadingModeComponent extends AbstractHeaderModeComponent implements OnInit {

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}

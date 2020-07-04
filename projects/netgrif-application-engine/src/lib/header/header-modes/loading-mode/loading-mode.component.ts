import {Component, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';

@Component({
    selector: 'nae-loading-mode',
    templateUrl: './loading-mode.component.html',
    styleUrls: ['./loading-mode.component.scss']
})
export class LoadingModeComponent implements OnInit {

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit(): void {
    }

}

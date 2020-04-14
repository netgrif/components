import {Component, Input, OnInit} from '@angular/core';
import {DashboardParams} from './dashboard-params';
import {DashboardCardTypes} from '../cards/model/dashboard-card-types';
import {CardGridElement} from '../cards/model/card-grid-element';
import {LoggerService} from '../../logger/services/logger.service';
import {GridLayoutHelper} from '../../utility/grid-layout/grid-layout-helper';


@Component({
    selector: 'nae-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {

    @Input() public params: DashboardParams;
    public readonly cardTypes = DashboardCardTypes;
    public gridElements: Array<CardGridElement>;

    constructor(private _log: LoggerService) {
        this.gridElements = [];
    }

    ngOnInit(): void {
        const gridLayoutHelper = new GridLayoutHelper(this._log);
        this.gridElements = gridLayoutHelper.fillBlankSpace(this.params.cards, this.params.columns);
    }

}

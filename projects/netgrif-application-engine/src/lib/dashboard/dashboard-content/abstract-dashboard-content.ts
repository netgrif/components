import {Input, OnInit} from '@angular/core';
import {DashboardParams} from './dashboard-params';
import {DashboardCardTypes} from '../cards/model/dashboard-card-types';
import {CardGridElement} from '../cards/model/card-grid-element';
import {LoggerService} from '../../logger/services/logger.service';
import {GridLayoutHelper} from '../../utility/grid-layout/grid-layout-helper';
import {ComponentPortal} from '@angular/cdk/portal';

export abstract class AbstractDashboardContent implements OnInit {

    @Input() public params: DashboardParams;
    @Input() public portalComponent: ComponentPortal<any>;
    public readonly cardTypes = DashboardCardTypes;
    public gridElements: Array<CardGridElement>;

    protected constructor(protected _log: LoggerService) {
        this.gridElements = [];
    }

    ngOnInit(): void {
        const gridLayoutHelper = new GridLayoutHelper(this._log);
        this.gridElements = gridLayoutHelper.fillBlankSpace(this.params.cards, this.params.columns) as Array<CardGridElement>;
    }
}

import {Component, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {Filter} from '../../../filter/models/filter';
import {CustomCard} from '../model/custom-dashboard-model/custom-card';
import {DashboardResourceService} from '../../../resources/engine-endpoint/dashboard-resource.service';
import {TranslateService} from '@ngx-translate/core';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {DashboardSingleData} from '../model/custom-dashboard-model/dashboard-single-data';
import {DashboardMultiData} from '../model/custom-dashboard-model/dashboard-multi-data';
import {LoggerService} from '../../../logger/services/logger.service';
import {AggregationResult} from '../model/custom-dashboard-model/aggregation-result';
import {Color} from "@swimlane/ngx-charts";

@Component({
    selector: 'ncc-abstract-custom-card',
    template: ''
})
export abstract class AbstractCustomCardComponent implements OnInit, OnDestroy {

    @Input() public card: CustomCard;
    protected _filter: Filter;
    public loading: LoadingEmitter;

    public count: number;
    public value: number;

    @Input() public single: Array<DashboardSingleData>;
    public multi: Array<DashboardMultiData>;

    public showLegend = true;
    public showLabels = true;
    public animations = true;
    public xAxis = true;
    public yAxis = true;
    public showYAxisLabel = true;
    public showXAxisLabel = true;
    public gradient = true;
    public colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5',
            '#a8385d', '#aae3f5', '#cfeacd', '#25e491',
            '#a10ed6', '#b9c9e3', '#a8385d', '#aae3f5',
            '#bbbfbf', '#e7a897', '#854618', '#7aa3e5',
            '#a8385d', '#0db8ee']
    } as Color;

    protected constructor(protected _injector: Injector,
                          protected resourceService: DashboardResourceService,
                          protected translateService: TranslateService,
                          protected loggerService: LoggerService) {
        this.loading = new LoadingEmitter();
        this.single = new Array<DashboardSingleData>();
        this.multi = new Array<DashboardMultiData>();
        this.value = 0;
        this.count = 0;
    }

    ngOnInit(): void {
        this.card.units = this.translateService.instant('dashboard.' + this.card.units);
        this.resourceService.getDashboardData(this.getResourceTypeAsString(), this.card.query).subscribe(json  => {
            this.convertData(json);
        }, error => {
            this.loggerService.error('Error occurred when calling dashboard resource service');
        });
    }

    ngOnDestroy(): void {
        this.loading.complete();
    }

    public getResourceTypeAsString(): string {
        return this.card.resourceType.toLowerCase();
    }

    public abstract convertData(json: AggregationResult): void;

}

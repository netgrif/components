import {Component, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {CountCard} from '../model/count-card';
import {CountService} from '../../../resources/abstract-endpoint/count-service';
import {Filter} from '../../../filter/models/filter';
import {FilterType} from '../../../filter/models/filter-type';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-count-card',
    template: ''
})
export abstract class AbstractCountCardComponent implements OnInit, OnDestroy {

    @Input() public card: CountCard;
    protected _countService: CountService;
    protected _filter: Filter;
    public loading: boolean;
    public count: number;
    protected subCount: Subscription;

    constructor(protected _injector: Injector) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.resolveFilter();
        this.resolveResourceService();
        this.subCount = this._countService.count(this._filter).subscribe(result => {
            this.count = result.count;
            this.loading = false;
        });
    }

    private resolveResourceService(): void {
        switch (this._filter.type) {
            case FilterType.CASE:
                this._countService = this._injector.get(CaseResourceService);
                break;
            case FilterType.TASK:
                this._countService = this._injector.get(TaskResourceService);
                break;
        }
    }

    private resolveFilter(): void {
        this._filter = new SimpleFilter('', this.card.resourceType, this.card.filter);
    }

    ngOnDestroy(): void {
        this.subCount.unsubscribe();
    }
}

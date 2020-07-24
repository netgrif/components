import {Component, Injector, Input, OnInit} from '@angular/core';
import {CountCard} from '../model/count-card';
import {CountService} from '../../../resources/abstract-endpoint/count-service';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {FilterType} from '../../../filter/models/filter-type';
import {Filter} from '../../../filter/models/filter';
import {SimpleFilter} from '../../../filter/models/simple-filter';


@Component({
    selector: 'nae-count-card',
    templateUrl: './count-card.component.html',
    styleUrls: ['./count-card.component.scss']
})
export class CountCardComponent implements OnInit {

    @Input() public card: CountCard;
    private _countService: CountService;
    private _filter: Filter;
    public loading: boolean;
    public count: number;

    constructor(private _injector: Injector) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.resolveFilter();
        this.resolveResourceService();
        this._countService.count(this._filter).subscribe(result => {
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

}

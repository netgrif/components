import {Component, Injector, Input, OnInit} from '@angular/core';
import {CountCard} from '../model/count-card';
import {CountService} from '../../../resources/abstract-endpoint/count-service';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';


@Component({
    selector: 'nae-count-card',
    templateUrl: './count-card.component.html',
    styleUrls: ['./count-card.component.scss']
})
export class CountCardComponent implements OnInit {

    @Input() public card: CountCard;
    private _countService: CountService;
    public loading: boolean;
    public count: number;

    constructor(private _injector: Injector) {
        this.loading = true;
    }

    ngOnInit(): void {
        this.resolveResourceService();
        // TODO 10.4.2020 - don't pass filters as strings
        this._countService.count(JSON.parse(this.card.filter)).subscribe(result => {
            this.count = result.count;
            this.loading = false;
        });
    }

    private resolveResourceService() {
        switch (this.card.resourceType) {
            case 'case':
                this._countService = this._injector.get(CaseResourceService);
                break;
            case 'task':
                this._countService = this._injector.get(TaskResourceService);
                break;
        }
    }

}

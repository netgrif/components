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

    constructor(private _injector: Injector) {
    }

    ngOnInit(): void {
        this.resolveResourceService();

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

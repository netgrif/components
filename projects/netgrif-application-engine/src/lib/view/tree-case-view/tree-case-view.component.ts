import {Component, OnInit} from '@angular/core';
import {Filter} from '../../filter/models/filter';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {ProcessService} from '../../process/process.service';

@Component({
    selector: 'nae-tree-case-view',
    templateUrl: './tree-case-view.component.html',
    styleUrls: ['./tree-case-view.component.scss']
})
export class TreeCaseViewComponent implements OnInit {

    public filter: Filter;
    public loading: boolean;

    constructor(private _caseResource: CaseResourceService, private _processService: ProcessService) {
        this.loading = true;
        this._processService.getNet('all_data').subscribe(net => {
            const newCase = {
                title: 'Nová zmluva',
                color: 'panel-primary-icon',
                netId: net.stringId
            };
            this._caseResource.createCase(newCase).subscribe( kaze => {
                this.filter = new SimpleFilter('id', FilterType.CASE, {
                    query: 'stringId:' + kaze.stringId
                });
                this.loading = false;
            });
        });
    }

    ngOnInit(): void {
    }

}

import {Component, OnInit} from '@angular/core';
import {Filter} from '../../filter/models/filter';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {ProcessService} from '../../process/process.service';
import {TreeCaseViewService} from './tree-case-view.service';
import {HttpParams} from '@angular/common/http';
import {FilterRepository} from '../../filter/filter.repository';

@Component({
    selector: 'nae-tree-case-view',
    templateUrl: './tree-case-view.component.html',
    styleUrls: ['./tree-case-view.component.scss'],
    providers: [TreeCaseViewService]
})
export class TreeCaseViewComponent implements OnInit {

    public filter: Filter;
    // public loading: boolean;

    constructor(private _caseResource: CaseResourceService,
                private _processService: ProcessService,
                private _filterRepository: FilterRepository) {
        this.filter = _filterRepository.getFilter('id');
        // this.loading = true;
        // let params: HttpParams = new HttpParams();
        // params = params.set('sort', 'creationDateSortable,asc');
        // this._caseResource.searchCases(
        //     new SimpleFilter('', FilterType.CASE, {petriNet: {identifier: 'tree_test'}, query: '(title:root)'}), params)
        //     .subscribe(page => {
        //         if (page && page.content && Array.isArray(page.content) && page.content.length > 0) {
        //             this.filter = new SimpleFilter('id', FilterType.CASE, {
        //                 query: 'stringId:' + page.content[0].stringId
        //             });
        //             this.loading = false;
        //         } else {
        //             this._processService.getNet('tree_test').subscribe(net => {
        //                 const newCaseRequest = {
        //                     title: 'root',
        //                     color: 'panel-primary-icon',
        //                     netId: net.stringId
        //                 };
        //                 this._caseResource.createCase(newCaseRequest).subscribe(newCase => {
        //                     this.filter = new SimpleFilter('id', FilterType.CASE, {
        //                         query: 'stringId:' + newCase.stringId
        //                     });
        //                     this.loading = false;
        //                 });
        //             });
        //         }
        //     });
    }

    ngOnInit(): void {
    }

}

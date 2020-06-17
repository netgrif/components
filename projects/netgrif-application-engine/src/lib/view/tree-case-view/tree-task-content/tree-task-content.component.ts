import {Component, OnInit} from '@angular/core';
import {TreeCaseViewService} from '../tree-case-view.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'nae-tree-task-content',
    templateUrl: './tree-task-content.component.html',
    styleUrls: ['./tree-task-content.component.scss']
})
export class TreeTaskContentComponent implements OnInit {

    public show = false;
    public loading = false;

    constructor(private _treeCaseService: TreeCaseViewService, private  _taskResourceService: TaskResourceService) {
    }

    ngOnInit(): void {
        this._treeCaseService.caseId.subscribe(kazeId => {
            this.loading = true;
            if (kazeId) {
                let params: HttpParams = new HttpParams();
                params = params.set('size', 100 + '');
                params = params.set('page', 0 + '');
                this._taskResourceService.getTasks({case: kazeId}, params).subscribe(tasks => {
                    if (tasks && tasks.content && Array.isArray(tasks.content)) {
                        // TODO CALL the datafields of that concrete tasks

                    }
                });
            }
        });
    }

}

import {Injectable} from '@angular/core';
import {DataGroup} from '../../../resources/interface/data-groups';
import {Subject} from 'rxjs';

@Injectable()
export class TaskPanelContentService {
    $shouldCreate: Subject<DataGroup[]>;
    taskId: string;

    constructor() {
        this.$shouldCreate = new Subject<DataGroup[]>();
    }
}
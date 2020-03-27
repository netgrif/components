import {EventEmitter, Injectable} from '@angular/core';
import {DataGroup} from '../../../resources/interface/data-groups';

@Injectable({
    providedIn: 'root'
})
export class TaskPanelContentService {
    $shouldCreate: EventEmitter<DataGroup>;

    constructor() {
        this.$shouldCreate = new EventEmitter<DataGroup>();
    }
}

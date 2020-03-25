import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TaskPanelContentService {
    $shouldCreate: EventEmitter<void>;

    constructor() {
        this.$shouldCreate = new EventEmitter<void>();
    }
}

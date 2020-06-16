import {Injectable} from '@angular/core';
import {DataFocusPolicy} from '../../task-content/model/policy';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskHandlingService} from './task-handling-service';

@Injectable()
export class DataFocusPolicyService extends TaskHandlingService {

    constructor(_taskContentService: TaskContentService) {
        super(_taskContentService);
    }

    public buildDataFocusPolicy(success: boolean): void {
        if (this._task.dataFocusPolicy === DataFocusPolicy.autoRequired) {
            this.autoRequiredDataFocusPolicy(success);
        }
    }

    private autoRequiredDataFocusPolicy(success: boolean): void {
        if (success) {
            // TODO Implement focus in FUTURE, if someone wants this feature (for now we don't want it )
        }
    }
}

import {TaskEventOutcome} from '../task-outcomes/task-event-outcome';
import {LayoutContainerResource} from '../../../../task-content/model/resource-interfaces';

export interface GetDataLayoutsEventOutcome extends TaskEventOutcome {
    layout: LayoutContainerResource;
}

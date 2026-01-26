import { TaskResourceService } from '../../resources/engine-endpoint/task-resource.service';

export const TaskResourceServiceProvider = {
    provide: TaskResourceService,
    useClass: TaskResourceService
}

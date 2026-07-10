import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Page} from "../../../resources/interface/page";
import {Task} from "../../../resources/interface/task";
import {TaskResourceService} from "../../../resources/engine-endpoint/task-resource.service";
import {ProviderProgress} from "../../../resources/resource-provider.service";
import {EventOutcomeMessageResource} from "../../../resources/interface/message-resource";
import {SetDataEventOutcome} from "../../../event/model/event-outcomes/data-outcomes/set-data-event-outcome";
import {Change} from "../../../data-fields/models/changed-fields";

@Injectable()
export class MockTaskResourceService extends TaskResourceService {

    searchTask(): Observable<Page<Task>> {
        return of();
    }

    getTasks(): Observable<Page<Task>> {
        return of();
    }


    uploadFile(taskId: string, body: object, multipleFiles: boolean): Observable<ProviderProgress | EventOutcomeMessageResource> {
        return of({
            outcome: {
                net: undefined,
                aCase: undefined,
                task: undefined,
                changedFields: {
                    changedFields: {
                        text: {
                            value: ""
                        } as Change
                    }
                }
            } as SetDataEventOutcome
        });
    }
}

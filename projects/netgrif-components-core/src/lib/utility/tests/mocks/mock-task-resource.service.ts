import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Filter} from "../../../filter/models/filter";
import {Params} from "../../../resources/resource-provider.service";
import {Page} from "../../../resources/interface/page";
import {Task} from "../../../resources/interface/task";

@Injectable()
export class MockTaskResourceService {
    public numberOfCalls = 0;

    public getTasks(filterParam: Filter, params?: Params): Observable<Page<Task>> {
        this.numberOfCalls++;
        return of(undefined);
    }
}

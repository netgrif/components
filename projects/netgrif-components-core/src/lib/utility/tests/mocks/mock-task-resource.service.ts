import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Page} from "../../../resources/interface/page";
import {Task} from "../../../resources/interface/task";

@Injectable()
export class MockTaskResourceService {

    searchTask(): Observable<Page<Task>> {
        return of();
    }

    getTasks(): Observable<Page<Task>> {
        return of();
    }
}

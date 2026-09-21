import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable()
export class MockProcessService {
    public numberOfCalls = 0;

    public getNets() {
        this.numberOfCalls++;
        return of([]);
    }
}

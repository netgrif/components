import {InjectionToken} from "@angular/core";
import {SortChangeDescription} from "../../../header/models/user-changes/sort-change-description";
import {Observable} from "rxjs";

export const NAE_DYNAMIC_DEFAULT_SORT = new InjectionToken<Observable<SortChangeDescription>>('NaeDynamicDefaultSort');

import {Injectable} from '@angular/core';
import {ProcessService} from '../../process/process.service';
import {UserService} from '../../user/services/user.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {HttpParams} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {Case} from '../../resources/interface/case';
import {BehaviorSubject, of} from 'rxjs';
import {createMockCase} from '../../utility/tests/utility/create-mock-case';

@Injectable({
  providedIn: 'root'
})
export class NextGroupService {

    private _groupOfUser: BehaviorSubject<Case>;

    constructor(protected processService: ProcessService,
                protected caseService: CaseResourceService,
                protected userService: UserService) {
        this._groupOfUser = new BehaviorSubject<Case>(undefined);

        userService.user$.pipe(
            switchMap(user => {
                if (user.id === '') {
                    const emptyCase: Case = createMockCase();
                    return of([emptyCase]);
                }

                const params = new HttpParams();
                params.set('size', `${(user as any).nextGroups.length}`);

                return this.caseService.searchCases(SimpleFilter.fromCaseQuery({stringId: (user as any).nextGroups}), params)
                    .pipe(
                        map(page => page.content ? page.content : []),
                        map(groups => groups.filter(group => group.author.fullName !== 'application engine'))
                    );
            })
        ).subscribe(groups => {
            const myGroup = groups.find(g => g.author.email === this.userService.user.email);
            this._groupOfUser.next(myGroup);
        });
    }

    get groupOfUser(): Case {
        return this._groupOfUser.getValue();
    }
}

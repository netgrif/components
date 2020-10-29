import {Injectable} from '@angular/core';
import {ProcessService} from '../../process/process.service';
import {UserService} from '../../user/services/user.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Case} from '../../resources/interface/case';

@Injectable({
  providedIn: 'root'
})
export class NextGroupService {

    private _groupOfUser: Case;

    constructor(protected processService: ProcessService,
                protected caseService: CaseResourceService,
                protected userService: UserService) {
        this.resolveGroupsOfUser();
    }

    get groupsOfUser(): Case {
        return this._groupOfUser;
    }

    private resolveGroupsOfUser() {
        const user = this.userService.user;
        const params = new HttpParams();
        params.set('size', `${(user as any).nextGroups.length}`);

        this.caseService.searchCases(SimpleFilter.fromCaseQuery({stringId: user.nextGroups}), params)
            .pipe(
                map(page => page.content ? page.content : []),
            ).subscribe( groups => {
                    this._groupOfUser = groups.find(group => group.author.email === this.userService.user.email);
                }
            );
    }
}

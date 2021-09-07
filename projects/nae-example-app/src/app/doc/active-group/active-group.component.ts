import {Component, OnDestroy} from '@angular/core';
import {ActiveGroupService, Case, NextGroupService} from '@netgrif/application-engine';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'nae-app-active-group',
    templateUrl: './active-group.component.html',
    styleUrls: ['./active-group.component.scss']
})
export class ActiveGroupComponent implements OnDestroy {

    options: Array<Case>;

    fcGroup: FormControl;
    fcGroups: FormControl;

    private _subGroups: Subscription;
    private _subGroupFc: Subscription;
    private _subGroupsFc: Subscription;

    constructor(private _activeGroup: ActiveGroupService, private _group: NextGroupService) {
        this._subGroups = this._group.memberGroups$.subscribe(groups => {
            this.options = groups;
        });

        this.fcGroup = new FormControl(this._activeGroup.activeGroup);
        this._subGroupFc = this.fcGroup.valueChanges.subscribe((groupId: string) => {
            this._activeGroup.activeGroup = this.options.find(it => it.stringId === groupId);
        });

        this.fcGroups = new FormControl(this._activeGroup.activeGroups);
        this._subGroupsFc = this.fcGroups.valueChanges.subscribe((groupIds: Array<string>) => {
            this._activeGroup.activeGroups = this.options.filter(it => groupIds.some(gid => gid === it.stringId));
        });
    }

    ngOnDestroy(): void {
        this._subGroups.unsubscribe();
        this._subGroupFc.unsubscribe();
        this._subGroupsFc.unsubscribe();
    }

    trackByFn(index, group: Case) {
        return group.stringId;
    }

}

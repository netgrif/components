import {Component, OnDestroy} from '@angular/core';
import {ActiveGroupService, Case, NextGroupService} from '@netgrif/components-core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';

@Component({
    selector: 'nae-app-active-group',
    templateUrl: './active-group.component.html',
    styleUrls: ['./active-group.component.scss']
})
export class ActiveGroupComponent implements OnDestroy {

    options: Array<Case>;

    activeGroups: Array<string>;

    fcGroup: FormControl<string>;
    fcGroups: FormControl<string[]>;

    private _subGroups: Subscription;
    private _subGroupFc: Subscription;
    private _subGroupsFc: Subscription;
    private _subActiveGroups: Subscription;

    constructor(private _activeGroupService: ActiveGroupService, private _groupService: NextGroupService) {
        this._subGroups = this._groupService.memberGroups$.subscribe(groups => {
            this.options = groups;
        });

        this.fcGroup = new FormControl();
        this._subGroupFc = this.fcGroup.valueChanges.subscribe((groupId: string) => {
            this._activeGroupService.activeGroup = this.options.find(it => it.stringId === groupId);
        });

        this.fcGroups = new FormControl();
        this._subGroupsFc = this.fcGroups.valueChanges.subscribe((groupIds: Array<string>) => {
            this._activeGroupService.activeGroups = this.options.filter(it => groupIds.some(gid => gid === it.stringId));
        });

        this._subActiveGroups = this._activeGroupService.activeGroups$.subscribe(activeGroups => {
            this.activeGroups = activeGroups.map(it => it.title);
        });

        this._activeGroupService.activeGroups$.pipe(filter(it => it.length > 0), take(1)).subscribe(value => {
            this.fcGroup.setValue(value[0].stringId);
            this.fcGroups.setValue(value.map(it => it.stringId));
        });
    }

    ngOnDestroy(): void {
        this._subGroups.unsubscribe();
        this._subGroupFc.unsubscribe();
        this._subGroupsFc.unsubscribe();
        this._subActiveGroups.unsubscribe();
    }

    trackByFn(index, group: Case) {
        return group.stringId;
    }

}

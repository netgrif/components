import {Component} from '@angular/core';
import {ImpersonationService, ImpersonationUserSelectService, UserService} from 'netgrif-components-core';

@Component({
    selector: 'nc-impersonate-quick-panel',
    templateUrl: './impersonate-quick-panel.component.html',
    styleUrls: []
})
export class ImpersonateQuickPanelComponent {

    constructor(
        private impersonateUserSelect: ImpersonationUserSelectService,
        private impersonationService: ImpersonationService,
        private user: UserService,
    ) {}

    public impersonate(): void {
        this.impersonateUserSelect.selectImpersonate();
    }

    public stopImpersonating(): void {
        this.impersonationService.cease();
    }

    public isImpersonating(): boolean {
        return this.user.user.isImpersonating();
    }

}

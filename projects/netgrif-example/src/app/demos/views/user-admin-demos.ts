import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TabContent, UriNodeResource, UriService} from '@netgrif/components-core';
import {DefaultTicketViewComponent} from '@netgrif/components';
import {CodeSnippet} from '../../playground/code-block/code-block.component';
import {PlaygroundTabbedTaskViewComponent} from './playground-views';

/* ------------------------------------------------------------------ ticket view */

@Component({
    selector: 'ne-ticket-view-demo',
    template: `
        <ne-demo-page title="Ticket view" [description]="description" [stacked]="true" previewHeight="620px"
                      [api]="['nc-default-ticket-view', 'InjectedTabbedTicketViewData', 'DoubleDrawerNavigationService']"
                      [snippets]="snippets">
            <div demoPreview>
                <nc-tab-view [initialTabs]="tabs" stretch="true"></nc-tab-view>
            </div>
            <div demoConfig class="ne-config">
                <p class="mat-body-small">The buttons are the views of the opened menu folder ("Tickets" in the navigation demo).
                    A click creates a case of the process of the view (<code>task_allowed_nets</code> of its
                    <code>all_menu_data</code> task) and opens its task in a new tab.</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class TicketViewDemoComponent implements OnInit {
    readonly description = 'Create a case ("ticket") by picking one of the views of a menu folder, its first task opens in a tab.';

    readonly tabs: Array<TabContent> = [{
        label: {text: 'New ticket', icon: 'confirmation_number'},
        canBeClosed: false,
        tabContentComponent: DefaultTicketViewComponent,
        injectedObject: {tabViewComponent: PlaygroundTabbedTaskViewComponent, tabViewOrder: 0, navigationItemTaskData: []},
    }];

    readonly snippets: Array<CodeSnippet> = [{
        label: 'TypeScript',
        code: `tabs: Array<TabContent> = [{
    label: {text: 'New ticket', icon: 'confirmation_number'},
    canBeClosed: false,
    tabContentComponent: DefaultTicketViewComponent,
    injectedObject: {
        tabViewComponent: TabbedTaskViewComponent,   // opened with {baseFilter, allowedNets} of the new case
        tabViewOrder: 0,
        navigationItemTaskData: [],
    },
}];`,
    }, {
        label: 'HTML',
        code: `<nc-tab-view [initialTabs]="tabs"></nc-tab-view>`,
    }];

    constructor(private _uriService: UriService) {
    }

    /** the ticket view offers the views of the active menu folder */
    ngOnInit(): void {
        this._uriService.getNodeByPath('/tickets').subscribe((node: UriNodeResource) => this._uriService.activeNode = node);
    }
}

/* ------------------------------------------------------------------ profile */

@Component({
    selector: 'ne-profile-demo',
    template: `
        <ne-demo-page title="User profile" [description]="description" [stacked]="true"
                      [api]="['nc-user-profile', 'UserService', 'ProfileComponentModule']" [snippets]="snippets">
            <div demoPreview>
                <nc-user-profile></nc-user-profile>
            </div>
            <div demoConfig class="ne-config">
                <p class="mat-body-small">The logged user of the playground ("user/me" of the mock engine).</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class ProfileDemoComponent {
    readonly description = 'Profile of the logged user: personal data, roles, groups and authorities.';
    readonly snippets: Array<CodeSnippet> = [{
        label: 'HTML',
        code: `<!-- ProfileComponentModule -->\n<nc-user-profile></nc-user-profile>`,
    }];
}

/* ------------------------------------------------------------------ admin */

@Component({
    selector: 'ne-role-assignment-demo',
    template: `
        <ne-demo-page title="Role assignment" [description]="description" [stacked]="true" previewHeight="640px"
                      [api]="['nc-role-assignment', 'RoleAssignmentService', 'AdminComponentModule']" [snippets]="snippets">
            <div demoPreview>
                <nc-role-assignment class="admin" [ngClass]="'ne-density-' + -density"></nc-role-assignment>
            </div>
            <div demoConfig class="ne-config">
                <mat-form-field>
                    <mat-label>Density</mat-label>
                    <mat-select [(ngModel)]="density">
                        @for (d of densities; track d) {
                        <mat-option [value]="d">{{ d }}{{ d === 0 ? ' (default)' : '' }}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>
                <p class="mat-body-small">Users and process roles of the mock engine; pick users, then the roles to assign.</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class RoleAssignmentDemoComponent {
    /** Material 3 density of the component, `ne-density-*` classes of the playground styles */
    readonly densities = [0, -1, -2, -3, -4, -5];
    density = 0;
    // the user and process lists are virtual scrolls, they need the height of the preview
    readonly description = 'Administration: assigning process roles to users.';
    readonly snippets: Array<CodeSnippet> = [{
        label: 'HTML',
        code: `<!-- AdminComponentModule -->\n<nc-role-assignment></nc-role-assignment>`,
    }];
}

@Component({
    selector: 'ne-ldap-role-assignment-demo',
    template: `
        <ne-demo-page title="LDAP group role assignment" [description]="description" [stacked]="true" previewHeight="640px"
                      [api]="['nc-ldap-group-role-assignment', 'RoleAssignmentLdapGroupService', 'AdminComponentModule']" [snippets]="snippets">
            <div demoPreview>
                <nc-ldap-group-role-assignment class="admin" [ngClass]="'ne-density-' + -density"></nc-ldap-group-role-assignment>
            </div>
            <div demoConfig class="ne-config">
                <mat-form-field>
                    <mat-label>Density</mat-label>
                    <mat-select [(ngModel)]="density">
                        @for (d of densities; track d) {
                        <mat-option [value]="d">{{ d }}{{ d === 0 ? ' (default)' : '' }}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>
                <p class="mat-body-small">LDAP groups and process roles of the mock engine; pick groups, then the roles to assign.</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class LdapRoleAssignmentDemoComponent {
    /** Material 3 density of the component, `ne-density-*` classes of the playground styles */
    readonly densities = [0, -1, -2, -3, -4, -5];
    density = 0;
    readonly description = 'Administration: assigning process roles to LDAP groups (same layout as the role assignment).';
    readonly snippets: Array<CodeSnippet> = [{
        label: 'HTML',
        code: `<!-- AdminComponentModule -->\n<nc-ldap-group-role-assignment></nc-ldap-group-role-assignment>`,
    }];
}

@Component({
    selector: 'ne-user-invite-demo',
    template: `
        <ne-demo-page title="User invite" [description]="description" [stacked]="true" previewHeight="640px"
                      [api]="['nc-user-invite', 'SignUpService', 'AdminComponentModule']" [snippets]="snippets">
            <div demoPreview>
                <nc-user-invite class="admin" [ngClass]="'ne-density-' + -density"></nc-user-invite>
            </div>
            <div demoConfig class="ne-config">
                <mat-form-field>
                    <mat-label>Density</mat-label>
                    <mat-select [(ngModel)]="density">
                        @for (d of densities; track d) {
                        <mat-option [value]="d">{{ d }}{{ d === 0 ? ' (default)' : '' }}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>
                <p class="mat-body-small">The invitation is "sent" to the mock engine, no e-mail leaves the browser.</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class UserInviteDemoComponent {
    /** Material 3 density of the component, `ne-density-*` classes of the playground styles */
    readonly densities = [0, -1, -2, -3, -4, -5];
    density = 0;
    readonly description = 'Administration: inviting a new user by e-mail with groups and process roles.';
    readonly snippets: Array<CodeSnippet> = [{
        label: 'HTML',
        code: `<!-- AdminComponentModule -->\n<nc-user-invite></nc-user-invite>`,
    }];
}

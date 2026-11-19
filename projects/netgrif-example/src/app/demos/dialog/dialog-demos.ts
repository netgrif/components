/** a dialog of the libraries shown on the Dialogs pages (`dialogs/:id`) and what the page shows around it */
export interface DialogDemo {
    id: string;
    title: string;
    icon: string;
    description: string;
    /** api chips of the demo page */
    api: Array<string>;
    /** the dialog has a variant with long texts (long case titles, long names) */
    longTexts?: boolean;
}

/**
 * Dialogs of `DialogComponentsModule` (`@netgrif/components`) and the other dialogs of the libraries. Every demo opens the
 * dialog the same way the library does (same component, `MatDialog` config and data), the snippet shows that call.
 * Alert / confirm / prompt of `DialogService` have their own page (`dialogs/basic`).
 */
export const DIALOG_DEMOS: Array<DialogDemo> = [
    {
        id: 'user-assign', title: 'User assign', icon: 'person_search',
        description: 'Picks one user, opened by the user field and by the user column of the search header. '
            + 'The list is searchable and can be limited to the users of some roles.',
        api: ['UserAssignDialogComponent', 'NAE_USER_ASSIGN_DIALOG_COMPONENT', 'UserListInjectedData'],
    },
    {
        id: 'multi-user-assign', title: 'Multi user assign', icon: 'group_add',
        description: 'Picks several users, opened by the user list field. The users of the current value are preselected.',
        api: ['MultiUserAssignDialogComponent', 'NAE_MULTI_USER_ASSIGN_DIALOG_COMPONENT', 'UserListInjectedData'],
    },
    {
        id: 'new-case', title: 'New case', icon: 'note_add', longTexts: true,
        description: 'Creates a case: the process (when more of them are allowed) and the title. A process with a default case '
            + 'name ("Insurance claim") names the case itself, the user picks only the process; "Leave request" has none and '
            + 'asks for the title. Opened by the create case button of the case views (CaseViewService.createNewCase).',
        api: ['NewCaseDialogComponent', 'NAE_NEW_CASE_DIALOG_COMPONENT', 'NewCaseCreationConfigurationData'],
    },
    {
        id: 'task-view', title: 'Task view dialog', icon: 'assignment', longTexts: true,
        description: 'Tasks of a case in a dialog, e.g. the settings of a menu item of the double drawer (edit mode). '
            + 'The search body selects the tasks, the dialog can close itself after a task event.',
        api: ['TaskViewDialogComponent', 'NAE_TASK_VIEW_COMPONENT', 'TaskViewDialogInjectionData'],
    },
    {
        id: 'single-task-view', title: 'Single task view dialog', icon: 'task', longTexts: true,
        description: 'One task with its form in a dialog (the task is found by the search body).',
        api: ['SingleTaskViewDialogComponent', 'NAE_SINGLE_TASK_VIEW_COMPONENT', 'TaskViewDialogInjectionData'],
    },
    {
        id: 'import-net', title: 'Import process', icon: 'upload_file',
        description: 'Uploads a Petriflow process (.xml) and deploys it, opened by the workflow view. The mock engine accepts '
            + 'any file and answers like the engine.',
        api: ['ImportNetDialogComponent', 'NAE_IMPORT_NET_DIALOG_COMPONENT'],
    },
    {
        id: 'filter-selector', title: 'Filter selector', icon: 'filter_list',
        description: 'Picks a saved filter (case and task filters of the FilterRepository of the application), the search '
            + 'filters them by their title.',
        api: ['FilterSelectorDialogComponent', 'FilterRepository', 'FilterSelectorInjectionData'],
    },
    {
        id: 'user-impersonate', title: 'Impersonate (user)', icon: 'supervisor_account', longTexts: false,
        description: 'Impersonation configs of the logged user (cases of the impersonation_config process): whom the user can act '
            + 'as and with which roles. Opened by ImpersonationUserSelectService for a user without the admin role.',
        api: ['UserImpersonateDialogComponent', 'ImpersonationUserSelectService', 'NAE_USER_IMPERSONATE_DIALOG_COMPONENT'],
    },
    {
        id: 'admin-impersonate', title: 'Impersonate (admin)', icon: 'admin_panel_settings',
        description: 'Any user for the administrator to act as (impersonation resource, impersonate/search). Opened by '
            + 'ImpersonationUserSelectService for an admin. The demo only shows the selected user, it does not impersonate.',
        api: ['AdminImpersonateDialogComponent', 'ImpersonationUserSelectService', 'NAE_ADMIN_IMPERSONATE_DIALOG_COMPONENT'],
    },
    {
        id: 'session-idle', title: 'Session idle', icon: 'timer',
        description: 'Warning before the session of an idle user expires (nc-session-idle opens it when the remaining time of '
            + 'SessionIdleTimerService runs low). The demo does not log out.',
        api: ['PopupSessionIdleComponent', 'SessionIdleComponent', 'SessionIdleTimerService'],
    },
    {
        id: 'appearance', title: 'Appearance', icon: 'palette',
        description: 'Color, contrast and density of the application, opened from the account menu of the double drawer.',
        api: ['AppearanceDialogComponent'],
    },
];

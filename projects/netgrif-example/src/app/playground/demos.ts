import {FIELD_SPECS} from '../demos/data-field/field-specs';
import {DIALOG_DEMOS} from '../demos/dialog/dialog-demos';

export interface DemoLink {
    path: string;
    label: string;
    icon: string;
    description?: string;
}

export interface DemoGroup {
    label: string;
    items: Array<DemoLink>;
}

/**
 * Navigation of the playground. Add a demo: create a component with `ne-demo-page`,
 * declare it in AppModule, add a route in AppRoutingModule and an item here.
 */
export const DEMO_GROUPS: Array<DemoGroup> = [
    {
        label: 'Views',
        items: [
            {path: 'views/cases', label: 'Case view', icon: 'folder', description: 'Search, create and delete cases.'},
            {path: 'views/search', label: 'Advanced search', icon: 'manage_search', description: 'Search conditions as a PFQL query.'},
            {path: 'views/tasks', label: 'Task view', icon: 'assignment', description: 'Task forms and task events.'},
            {path: 'views/tabbed', label: 'Tabbed views', icon: 'tab', description: 'Case list, tasks of a case in a new tab.'},
            {path: 'views/single-task', label: 'Single task view', icon: 'task', description: 'One task with its form.'},
            {path: 'views/builder', label: 'Process view', icon: 'design_services',
                description: 'Processes, the Petriflow builder in a tab.'},
            {path: 'views/dashboard', label: 'Dashboard', icon: 'dashboard', description: 'Welcome dashboard tiles.'},
            {path: 'views/tickets', label: 'Ticket view', icon: 'confirmation_number', description: 'Create a case from a menu folder.'},
        ],
    },
    {
        label: 'Account',
        items: [
            {path: 'account/login', label: 'Login', icon: 'login', description: 'Sign in with the user name and the password.'},
            {path: 'account/registration', label: 'Registration', icon: 'person_add', description: 'Account from an invitation link.'},
            {path: 'account/recovery', label: 'Password recovery', icon: 'lock_reset', description: 'Forgotten password, e-mail and link.'},
            {path: 'account/change-password', label: 'Change password', icon: 'password', description: 'New password of the logged user.'},
        ],
    },
    {
        label: 'User & administration',
        items: [
            {path: 'user/profile', label: 'User profile', icon: 'account_circle', description: 'Profile of the logged user.'},
            {path: 'admin/roles', label: 'Role assignment', icon: 'admin_panel_settings', description: 'Assign process roles to users.'},
            {path: 'admin/ldap-roles', label: 'LDAP role assignment', icon: 'group', description: 'Assign process roles to LDAP groups.'},
            {path: 'admin/invite', label: 'User invite', icon: 'person_add', description: 'Invite a new user.'},
        ],
    },
    {
        label: 'Navigation',
        items: [
            {path: 'views/navigation', label: 'Double drawer', icon: 'menu_open', description: 'Rail and drawer of the dynamic menu.'},
            {path: 'views/breadcrumbs', label: 'Breadcrumbs', icon: 'linear_scale', description: 'Path of the active node.'},
        ],
    },
    {
        label: 'Data fields',
        items: FIELD_SPECS.map(spec => ({
            path: `fields/${spec.type}`,
            label: spec.label,
            icon: spec.icon,
            description: spec.description,
        })),
    },
    {
        label: 'Feedback',
        items: [
            {path: 'feedback/snack-bar', label: 'Snack bar', icon: 'notifications', description: 'Success, warning, error and generic notifications.'},
        ],
    },
    {
        label: 'Dialogs',
        items: [
            {path: 'dialogs/basic', label: 'Alert, confirm, prompt', icon: 'chat_bubble', description: 'Alert, confirm and prompt dialogs of DialogService.'},
            ...DIALOG_DEMOS.map(demo => ({path: `dialogs/${demo.id}`, label: demo.title, icon: demo.icon, description: demo.description})),
        ],
    },
];

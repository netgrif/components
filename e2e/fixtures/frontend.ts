import {expect, Locator, Page} from '@playwright/test';
import * as path from 'path';

/** the saved login of the frontend tests (gitignored), written by frontend/auth.setup.ts */
export const FRONTEND_AUTH = path.join(__dirname, '..', '.auth', 'frontend-user.json');

function escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

/** a user of the role assignment: the text of its option ("<name> <e-mail>") and the text that searches it */
export interface UserRef {
    option: RegExp;
    search: string;
}

/** a user of the role assignment by the name and the e-mail */
export function userRef(name: string, email: string): UserRef {
    return {option: new RegExp(`^${escapeRegExp(name)} ${escapeRegExp(email)}`), search: email};
}

/**
 * The administrator, the login of the tests. Read when it is used: playwright.config imports this file before it loads
 * e2e/.env.
 */
export const ADMIN: UserRef = {
    get option() {
        return userRef('Admin Netgrif', process.env['E2E_USERNAME'] ?? 'super@netgrif.com').option;
    },
    get search() {
        return process.env['E2E_USERNAME'] ?? 'super@netgrif.com';
    }
};

/**
 * The role assignment of the administrator (in the Account menu of the rail) with the user selected. The list of the
 * users is a virtual scroll of the first users only, the user is searched first.
 */
export async function openRoleAssignment(page: Page, user: UserRef) {
    await page.goto('/');
    await page.getByRole('button', {name: 'Account', exact: true}).click();
    await page.getByRole('menuitem', {name: 'Role assignment'}).click();
    await expect(page.getByRole('heading', {name: 'Users'})).toBeVisible();
    // the search reloads the list a while after the typing (debounce): a user selected before that is not selected then
    // (the first load of the list is a search too, the response of the search with the text is waited for)
    const searched = page.waitForResponse(response => response.url().includes('/user/search')
        && (response.request().postData() ?? '').includes(user.search));
    await page.getByRole('textbox', {name: 'Search users'}).fill(user.search);
    await searched;
    const option = page.getByRole('option', {name: user.option});
    await expect(async () => {
        if (await option.getAttribute('aria-selected') !== 'true') {
            await option.click();
        }
        await expect(page.getByText('No user selected')).toBeHidden({timeout: 2000});
        await expect(option).toHaveAttribute('aria-selected', 'true', {timeout: 1000});
    }).toPass({timeout: 15_000});
}

/**
 * The roles of the process in the role assignment or in the user invite (every deployed version has its roles, the
 * newest version is the first). The processes are loaded a while (the pane shows "No processes found" until then), the
 * roles are loaded when the panel is expanded: Material listens to the end of the expand animation 200 ms after the
 * panel is rendered, so it is expanded after that.
 */
export async function processRoles(page: Page, process: string): Promise<Locator> {
    await page.getByRole('textbox', {name: 'Search processes'}).fill(process);
    const panel = page.locator('mat-expansion-panel').filter({hasText: process}).first();
    await expect(panel).toHaveClass(/mat-expansion-panel-animations-enabled/, {timeout: 30_000});
    await panel.getByRole('button', {name: new RegExp(`^${escapeRegExp(process)}`)}).click();
    const region = page.getByRole('region', {name: new RegExp(`^${escapeRegExp(process)}`)}).first();
    await expect(region.getByRole('checkbox').first()).toBeVisible();
    return region;
}

/** switches the edit mode of the menu (Account menu of the rail) */
export async function menuEditMode(page: Page, on: boolean) {
    await page.getByRole('button', {name: 'Account', exact: true}).click();
    await page.getByRole('menuitem', {name: on ? 'Enable edit mode' : 'Disable edit mode'}).click();
}

/**
 * The menu item with a simple case view, created by the first run only: a menu item can not be deleted (a case of an
 * item deleted by the API stays in the children of its parent and breaks the navigation), the next runs reuse it.
 * @returns the link of the item in the navigation, the menu is left in the edit mode
 */
export async function ensureMenuItemExists(page: Page, name: string, identifier: string): Promise<Locator> {
    await page.goto('/');
    await menuEditMode(page, true);
    const link = page.getByRole('navigation').getByRole('link', {name, exact: true});
    await expect(page.getByText('Create new menu item')).toBeVisible();
    if (await link.count() === 0) {
        const dialog = page.getByRole('dialog');
        await page.getByText('Create new menu item').click();
        await dialog.getByRole('textbox', {name: 'Name of the item'}).fill(name);
        await dialog.getByRole('textbox', {name: 'Menu item identifier'}).fill(identifier);
        await dialog.getByRole('combobox', {name: 'Autocomplete'}).click();
        await page.locator('mat-option').filter({hasText: /^\s*Simple case view\s*$/}).click();
        await dialog.getByRole('button', {name: 'Create', exact: true}).click();
        await expect(dialog).toBeHidden();
        // the new item is in the navigation after it is loaded again (the engine creates the case of the item a while)
        await expect(async () => {
            await page.goto('/');
            await menuEditMode(page, true);
            await expect(link).toBeVisible({timeout: 5000});
        }).toPass({timeout: 60_000});
    }
    return link;
}

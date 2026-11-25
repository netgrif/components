import {Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {loginAsJohn} from '../fixtures/account';
import {ensureMenuItemExists, menuEditMode} from '../fixtures/frontend';
import {deployForSpec, setProcessRoles} from '../fixtures/engine';

const PROCESS = 'E2E no create';

/** the menu item of the test: it is created once and reused by the next runs (the menu has no delete of an item) */
const ITEM = 'E2E no nets';

/**
 * The menu item with a simple case view of the cases of the PFQL filter. A menu item can not be deleted (a case of an
 * item deleted by the API stays in the children of its parent and breaks the navigation), so the item is created by
 * the first run only, the next runs set its filter again.
 */
async function ensureMenuItem(page: Page, filter: string) {
    const link = await ensureMenuItemExists(page, ITEM, 'e2e_no_nets');

    // the settings of the item: the case view shows the cases of the filter
    await link.getByRole('button').click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', {name: new RegExp(`^${ITEM} Item settings`)}).click();
    const settings = dialog.getByRole('region', {name: new RegExp(`^${ITEM} Item settings`)});
    await settings.getByRole('button', {name: 'Filter', exact: true}).click();
    const query = settings.getByRole('textbox', {name: 'Filter'});
    await query.fill(filter);
    await query.blur();
    await page.waitForLoadState('networkidle');
    await dialog.getByRole('button', {name: 'Close', exact: true}).click();
    await expect(dialog).toBeHidden();
    await menuEditMode(page, false);
}

/**
 * NAE-TC-020: the Ranorex test deleted every process and checked that the case view has no New case button. Here
 * a menu item shows the cases of a process without the default role (only the role Creator may create its cases), so
 * the user without the role has no process to create a case of.
 */
test.describe('No allowed processes (NAE)', () => {

    // the settings of a menu item (a task ref list) log NG0100 ExpressionChangedAfterItHasBeenCheckedError in the
    // development mode of Angular, a bug of TaskRefListFieldComponent
    test.use({knownConsoleErrors: [/NG0100: ExpressionChangedAfterItHasBeenCheckedError.*TaskRefListFieldComponent/]});

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_no_create.xml'));

    // the menu item of the test stays in the menu, the next runs reuse it (ensureMenuItem)

    test('NAE-TC-020 No_allowed_nets_btn_check the case view hides New case when the user may create no process', async ({page, browser}) => {
        test.setTimeout(300_000);
        await ensureMenuItem(page, "cases: processIdentifier eq 'e2e_no_create'");
        const name = ITEM;

        await test.step('John Doe (no role of the process) has no New case button', async () => {
            const john = await loginAsJohn(browser);
            await john.getByRole('navigation').getByRole('link', {name}).click();
            await expect(john.getByRole('textbox', {name: 'Search'})).toBeVisible({timeout: 30_000});
            await expect(john.getByRole('button', {name: 'New case', exact: true})).toHaveCount(0);
            await john.context().close();
        });

        await test.step('the administrator with the role Creator has it', async () => {
            await setProcessRoles(page, PROCESS, ['Creator'], true);
            try {
                await page.goto('/');
                await page.getByRole('navigation').getByRole('link', {name}).click();
                await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeVisible({timeout: 30_000});
            } finally {
                await setProcessRoles(page, PROCESS, ['Creator'], false);
            }
        });
    });
});

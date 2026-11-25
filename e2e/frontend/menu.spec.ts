import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {ensureMenuItemExists, menuEditMode} from '../fixtures/frontend';

/** the menu item of the test: created by the first run, reused by the next ones (a menu item can not be deleted) */
const ITEM = 'E2E menu';
const RENAMED = 'E2E menu renamed';
/** the folder of the move, created by the first move and reused */
const FOLDER = 'e2e_folder';

/** opens the menu item (edit mode) and expands the panel of its task ("Item settings", "Move item" ...) */
async function openItemTask(page: Page, link: Locator, name: string, taskTitle: string): Promise<{dialog: Locator, region: Locator}> {
    await link.getByRole('button').click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', {name: new RegExp(`^${name} ${taskTitle}`)}).click();
    const region = dialog.getByRole('region', {name: new RegExp(`^${name} ${taskTitle}`)});
    await expect(region).toBeVisible();
    return {dialog, region};
}

/** renames the item in its settings, the navigation shows the new name after it is loaded again */
async function renameItem(page: Page, from: string, to: string) {
    const link = page.getByRole('navigation').getByRole('link', {name: from, exact: true});
    const {dialog, region} = await openItemTask(page, link, from, 'Item settings');
    const name = region.getByRole('textbox', {name: 'Name of the item'});
    await name.fill(to);
    await name.blur();
    await page.waitForLoadState('networkidle');
    await dialog.getByRole('button', {name: 'Close', exact: true}).click();
    await expect(dialog).toBeHidden();
    await expect(async () => {
        await page.goto('/');
        await menuEditMode(page, true);
        await expect(page.getByRole('navigation').getByRole('link', {name: to, exact: true})).toBeVisible({timeout: 5000});
    }).toPass({timeout: 30_000});
}

/**
 * The editing of the menu (Account → Enable edit mode): a menu item is renamed and moved into a folder and back. The
 * item and the folder stay in the menu (no delete of a menu item), the test restores the name and the place of the item.
 */
test.describe('Menu (NAE)', () => {

    // the settings of a menu item (a task ref list) log NG0100 ExpressionChangedAfterItHasBeenCheckedError in the
    // development mode of Angular, a bug of TaskRefListFieldComponent
    test.use({knownConsoleErrors: [/NG0100: ExpressionChangedAfterItHasBeenCheckedError.*TaskRefListFieldComponent/]});

    test('NC-E2E-017 Menu a menu item is renamed and the new name is in the navigation', async ({page}) => {
        test.setTimeout(180_000);
        await page.goto('/');
        await menuEditMode(page, true);
        // a run that failed before the name was restored left the item renamed
        if (await page.getByRole('navigation').getByRole('link', {name: RENAMED, exact: true}).count() > 0) {
            await renameItem(page, RENAMED, ITEM);
        }
        await ensureMenuItemExists(page, ITEM, 'e2e_menu');
        try {
            await renameItem(page, ITEM, RENAMED);
            await expect(page.getByRole('navigation').getByRole('link', {name: ITEM, exact: true})).toHaveCount(0);
        } finally {
            if (await page.getByRole('navigation').getByRole('link', {name: RENAMED, exact: true}).count() > 0) {
                await renameItem(page, RENAMED, ITEM);
            }
        }
    });

    test('NC-E2E-017 Menu a menu item is moved into a folder and back', async ({page}) => {
        test.setTimeout(180_000);
        const link = await ensureMenuItemExists(page, ITEM, 'e2e_menu');

        // into the folder: a new node of the destination URI
        let {dialog, region} = await openItemTask(page, link, ITEM, 'Move item');
        await region.getByRole('textbox', {name: 'New node to be added'}).fill(FOLDER);
        await region.getByRole('button', {name: 'Add', exact: true}).click();
        await expect(region.getByRole('row', {name: FOLDER})).toBeVisible();
        await region.getByRole('button', {name: 'Move', exact: true}).click();
        await page.waitForLoadState('networkidle');
        await dialog.getByRole('button', {name: 'Close', exact: true}).click();
        await expect(dialog).toBeHidden();

        // the item is not on the top level, the folder is
        const folder = page.getByRole('navigation').getByRole('link', {name: FOLDER, exact: true});
        await expect(async () => {
            await page.goto('/');
            await menuEditMode(page, true);
            await expect(folder).toBeVisible({timeout: 5000});
            await expect(link).toHaveCount(0, {timeout: 1000});
        }).toPass({timeout: 30_000});
        await folder.click();
        const moved = page.getByRole('navigation').getByRole('link', {name: ITEM, exact: true});
        await expect(moved).toBeVisible();

        // back to the top level: the destination URI without the folder
        ({dialog, region} = await openItemTask(page, moved, ITEM, 'Move item'));
        const folderNode = region.getByRole('row', {name: FOLDER});
        await folderNode.getByRole('button').click();
        await expect(folderNode).toHaveCount(0);
        await region.getByRole('button', {name: 'Move', exact: true}).click();
        await page.waitForLoadState('networkidle');
        await dialog.getByRole('button', {name: 'Close', exact: true}).click();
        await expect(dialog).toBeHidden();
        await expect(async () => {
            await page.goto('/');
            await menuEditMode(page, true);
            await expect(link).toBeVisible({timeout: 5000});
        }).toPass({timeout: 30_000});
    });
});

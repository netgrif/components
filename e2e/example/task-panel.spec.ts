import {Locator, Page} from '@playwright/test';
import {expect, openDemo, snackBar, test} from '../fixtures/playground';

/** the task panel of the task view with the case title */
function taskPanel(page: Page, caseTitle: string) {
    return page.locator('nc-task-panel').filter({hasText: caseTitle});
}

/**
 * Expands the panel when it is collapsed. The list reloads after a task event and the panel can be rendered again,
 * so the click is repeated until the panel is expanded.
 */
async function expandPanel(panel: Locator, caseTitle: string | RegExp) {
    const header = panel.getByRole('button', {name: caseTitle}).first();
    await expect(async () => {
        if (await header.getAttribute('aria-expanded') !== 'true') {
            await header.click();
        }
        await expect(panel.getByRole('region')).toBeVisible({timeout: 2000});
    }).toPass();
    return panel;
}

async function expand(page: Page, caseTitle: string) {
    return expandPanel(taskPanel(page, caseTitle), new RegExp(caseTitle));
}

test.describe('Task panel', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/views/tasks'));

    test('NAE-TC-018 the form is editable only after assign', async ({page}) => {
        const panel = await expand(page, 'Lost luggage');
        await expect(panel.getByRole('textbox', {name: 'Client'})).toBeDisabled();
        await panel.getByRole('button', {name: 'Assign'}).click();
        await expect(panel.getByRole('textbox', {name: 'Client'})).toBeEditable();
        await expect(panel.getByRole('button', {name: 'Finish'})).toBeVisible();
    });

    test('NAE-TC-018 finish right after editing a field keeps the value', async ({page}) => {
        const panel = await expand(page, 'Lost luggage');
        await panel.getByRole('button', {name: 'Assign'}).click();
        const client = panel.getByRole('textbox', {name: 'Client'});
        await client.fill('Edited client');
        // no blur: the click on finish has to send the value first (set data), then finish the task
        await panel.getByRole('button', {name: 'Finish'}).click();
        await expect(page.locator('nc-task-panel').filter({hasText: /Lost luggage\s*Register claim/})).toHaveCount(0);

        // the mock engine keeps the values per case (in memory, so no reload): the next task of the case shows the value
        await page.getByRole('textbox', {name: 'Search'}).fill('luggage');
        const next = page.locator('nc-task-panel').filter({hasText: /Lost luggage\s*Assess claim/});
        await expandPanel(next, /Lost luggage/);
        await expect(next.getByRole('textbox', {name: 'Client'})).toHaveValue('Edited client');
    });

    test('NAE-TC-008 cancel returns the task', async ({page}) => {
        const panel = await expand(page, 'Ski accident');
        await panel.getByRole('button', {name: 'Assign'}).click();
        await panel.getByRole('button', {name: 'Cancel'}).click();
        // the panel may collapse after the event, the task is not assigned any more either way
        await expect(panel.getByRole('button', {name: 'Finish'})).toBeHidden();
        await expandPanel(panel, /Ski accident/);
        await expect(panel.getByRole('button', {name: 'Assign'})).toBeVisible();
        await expect(panel.getByRole('textbox', {name: 'Client'})).toBeDisabled();
    });

    test('NAE-TC-013 delegate opens the user assign dialog', async ({page}) => {
        const panel = await expand(page, 'Broken windshield');
        await panel.getByRole('button', {name: 'Delegate'}).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(dialog.getByRole('textbox')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(dialog).toBeHidden();
        await expect(snackBar(page)).toBeHidden();
    });
});

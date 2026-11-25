import {Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {createCase, deployForSpec} from '../fixtures/engine';

const PROCESS = 'E2E validations';

/** the task row of the task view ("<case title> <task title> ..."), the search waits for the search index of the engine */
async function searchTask(page: Page, caseTitle: string, taskTitle: string) {
    const row = page.getByRole('button', {name: new RegExp(`^${caseTitle} ${taskTitle} `)});
    await expect(async () => {
        await page.goto('/tasks');
        await page.getByRole('textbox', {name: 'Search'}).fill(caseTitle);
        await expect(row.first()).toBeVisible({timeout: 3000});
    }).toPass({timeout: 30_000});
    return row;
}

/**
 * The task view (Tasks of the navigation): the task of a new case is found by the search, assigned, filled in and
 * finished there, the next task of the case is then in the task view.
 */
test.describe('Task view (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_validations.xml'));

    test('NC-E2E-016 Task view a task is found, assigned and finished in the task view', async ({page}) => {
        test.setTimeout(120_000);
        const title = `TaskView${Date.now()}`;
        await createCase(page, PROCESS, title);

        const row = await searchTask(page, title, 'Fill');
        await expect(row).toHaveCount(1);
        // the list is drawn again after the search, a click during that is lost: it is clicked until the panel is expanded
        await expect(async () => {
            if (await row.getAttribute('aria-expanded') !== 'true') {
                await row.click();
            }
            await expect(row).toHaveAttribute('aria-expanded', 'true', {timeout: 2000});
        }).toPass({timeout: 15_000});
        const task = page.getByRole('region', {name: new RegExp(`^${title} Fill `)});
        await expect(task).toBeVisible();
        await task.getByRole('button', {name: 'Assign', exact: true}).click();
        await expect(page.getByRole('button', {name: new RegExp(`^${title} Fill .*Admin Netgrif`)})).toBeVisible();
        await task.getByRole('textbox', {name: 'Name'}).fill('Task view');
        await task.getByRole('button', {name: 'Finish', exact: true}).click();
        await expect(row).toHaveCount(0);

        // the next task of the case
        await expect(await searchTask(page, title, 'Done')).toHaveCount(1);
        await expect(page.getByRole('button', {name: new RegExp(`^${title} Fill `)})).toHaveCount(0);
    });
});

import {Browser, Locator, Page} from '@playwright/test';
import {expect, snackBar, test} from '../fixtures/playground';
import {loginAsJohn} from '../fixtures/account';
import {createCase, deployForSpec, expandTask, openCase} from '../fixtures/engine';

const PROCESS = 'E2E validations';

/**
 * Both users have the task Fill of a new case open and not assigned, the administrator assigns it, then John Doe clicks
 * Assign of his stale task.
 * @returns the page of John Doe, his task and the title of the case
 */
async function assignTwice(page: Page, browser: Browser): Promise<{john: Page, johnTask: Locator, title: string}> {
    const title = `Concurrency${Date.now()}`;
    await createCase(page, PROCESS, title);
    const john = await loginAsJohn(browser);
    await expect(async () => {
        await openCase(john, title);
    }).toPass({timeout: 30_000});

    const johnTask = await expandTask(john, title, 'Fill');
    const johnAssign = johnTask.getByRole('button', {name: 'Assign', exact: true});
    await expect(johnAssign).toBeVisible();
    const adminTask = await expandTask(page, title, 'Fill');
    await adminTask.getByRole('button', {name: 'Assign', exact: true}).click();
    await expect(adminTask.getByRole('button', {name: 'Finish', exact: true})).toBeVisible();

    await johnAssign.click();
    await expect(snackBar(john)).toBeVisible();
    return {john, johnTask, title};
}

/**
 * Two users work on the same task (e2e_validations.xml, the default role: every user may perform its tasks): the
 * administrator assigns it first, the assign of the second user is refused.
 */
test.describe('Two users on one task (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_validations.xml'));

    test('NC-E2E-014 Concurrency the second assign of the same task is refused', async ({page, browser}) => {
        test.setTimeout(120_000);
        const {john, johnTask} = await assignTwice(page, browser);
        await expect(snackBar(john)).toContainText('cannot be assigned');
        await expect(johnTask.getByRole('button', {name: 'Finish', exact: true})).toHaveCount(0);
    });

    test('NC-E2E-014 Concurrency the refused assign shows the current assignee of the task', async ({page, browser}) => {
        test.setTimeout(120_000);
        const {john, johnTask, title} = await assignTwice(page, browser);
        await expect(john.getByRole('button', {name: new RegExp(`^${title} Fill .*Admin Netgrif`)})).toBeVisible();
        await expect(johnTask.getByRole('button', {name: 'Assign', exact: true})).toHaveCount(0);
    });
});

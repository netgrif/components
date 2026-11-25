import {expect, test} from '../fixtures/playground';
import {deployForSpec, expandTask, openCase} from '../fixtures/engine';

const IDENTIFIER = 'e2e_public';

/**
 * The public view of netgrif-frontend (e2e_public.xml with the anonymous role): a user without a login opens
 * /process/<base64 of the process identifier>, the frontend creates a case and shows its tasks, the anonymous user fills
 * in and finishes the public task; the logged administrator sees the message in the next task of the case.
 */
test.describe('Public view (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_public.xml'));

    test('NC-E2E-010 Public view an anonymous user creates a case and finishes its public task', async ({page, browser}) => {
        test.setTimeout(120_000);
        const message = `Anonymous${Date.now()}`;
        const context = await browser.newContext({storageState: {cookies: [], origins: []}, baseURL: test.info().project.use.baseURL});
        try {
            const anonymous = await context.newPage();
            const processPath = `/process/${Buffer.from(IDENTIFIER).toString('base64')}`;
            await anonymous.goto(processPath);
            // the created case is added to the address (the router encodes the '=' of the base64)
            await expect(anonymous).toHaveURL(/\/process\/[^/]+\/[0-9a-f]{24}$/);
            const task = anonymous.getByRole('region', {name: /Public form/});
            if (!await task.isVisible()) {
                await anonymous.getByRole('button', {name: /Public form/}).first().click();
            }
            await expect(task).toBeVisible();
            const assign = task.getByRole('button', {name: 'Assign', exact: true});
            if (await assign.isVisible()) {
                await assign.click();
            }
            await task.getByRole('textbox', {name: 'Message'}).fill(message);
            await task.getByRole('button', {name: 'Finish', exact: true}).click();
            await expect(anonymous.getByRole('button', {name: /Public form/})).toHaveCount(0);
            // the task of the logged users is not offered to the anonymous user
            await expect(anonymous.getByRole('button', {name: /Review/})).toHaveCount(0);
        } finally {
            await context.close();
        }

        // the administrator sees the case of the anonymous user with the message
        await expect(async () => {
            await openCase(page, 'Public request');
            const review = await expandTask(page, 'Public request', 'Review');
            await expect(review.getByRole('textbox', {name: 'Message'})).toHaveValue(message, {timeout: 3000});
        }).toPass({timeout: 30_000});
    });
});

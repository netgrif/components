import {expect, test} from '../fixtures/playground';
import {createCase, deployForSpec, expandTask, finishTask, openCase, taskHeader} from '../fixtures/engine';

/**
 * The triggers model: the Fork task chooses the way, the auto / time (1 s) triggered transitions run by the engine
 * lead to the next task of the user.
 */
test.describe('Triggers (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'triggers.xml'));

    for (const [option, next] of [['Auto trigger', 'after auto'], ['Time trigger', 'after time'], ['Other', 'after auto parallel']]) {
        test(`NAE Triggers "${option}" runs the triggered transitions to the task "${next}"`, async ({page}) => {
            test.setTimeout(120_000);
            const title = `E2E_triggers_${Date.now()}`;
            await createCase(page, 'Triggers', title);
            const fork = await expandTask(page, title, 'Fork');
            await fork.getByRole('combobox').first().click();
            await page.locator('mat-option').filter({hasText: new RegExp(`^\\s*${option}\\s*$`)}).click();
            await finishTask(page, title, 'Fork');

            // the engine runs the triggered transitions (the time trigger a second later), the case is opened again
            await expect(async () => {
                await openCase(page, title);
                await expect(taskHeader(page, title, next).first()).toBeVisible({timeout: 3000});
            }).toPass({timeout: 30_000});

            await finishTask(page, title, next);
            await openCase(page, title);
            await expect(page.getByRole('button', {name: new RegExp(`^${title} `)})).toHaveCount(0);
        });
    }
});

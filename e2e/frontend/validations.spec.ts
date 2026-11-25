import {Locator} from '@playwright/test';
import {expect, snackBar, test} from '../fixtures/playground';
import {assignTask, createCase, deployForSpec, expandTask, taskHeader} from '../fixtures/engine';

const PROCESS = 'E2E validations';

/** the error text of the field (mat-error of its form field) */
function fieldError(field: Locator): Locator {
    return field.locator('xpath=ancestor::mat-form-field').locator('mat-error');
}

/**
 * The validations of the fields block the finish of the task (e2e_validations.xml): a required text, a number in a range,
 * a text of a pattern with an own message and an e-mail. The errors are shown at the fields, Finish keeps the task
 * until the values are valid, then the next task follows.
 */
test.describe('Validations (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_validations.xml'));

    test('NC-E2E-008 Validations invalid and missing values block the finish of the task', async ({page}) => {
        test.setTimeout(120_000);
        const title = `Validations${Date.now()}`;
        await createCase(page, PROCESS, title);
        const task = await expandTask(page, title, 'Fill');
        await assignTask(task);
        const finish = task.getByRole('button', {name: 'Finish', exact: true});
        const name = task.getByRole('textbox', {name: 'Name'});
        const amount = task.getByRole('textbox', {name: 'Amount'}).or(task.getByRole('spinbutton', {name: 'Amount'}));
        const code = task.getByRole('textbox', {name: 'Code'});
        const email = task.getByRole('textbox', {name: 'Contact e-mail'});

        await test.step('the empty required field blocks the finish', async () => {
            await finish.click();
            // the empty required field is reported as an invalid value ("Some required fields are empty" is not shown)
            await expect(snackBar(page).filter({hasText: 'Some fields have invalid values'})).toBeVisible();
            await expect(fieldError(name)).toHaveText('This field is required!');
            await expect(taskHeader(page, title, 'Fill')).toBeVisible();
        });

        await test.step('the invalid values show their errors and block the finish', async () => {
            await name.fill('Validated');
            await amount.fill('5');
            await code.fill('abc');
            await email.fill('not-an-email');
            await email.blur();
            await expect(fieldError(amount)).toHaveText('Entered number must be in range 10,100');
            await expect(fieldError(code)).toHaveText('The code has three capital letters');
            await expect(fieldError(email)).toHaveText('Entered text must be in email format');
            // the snack bar of the first finish closes by itself, the new one is checked then
            await expect(snackBar(page)).toHaveCount(0, {timeout: 15_000});
            await finish.click();
            await expect(snackBar(page).filter({hasText: 'Some fields have invalid values'})).toBeVisible();
            await expect(taskHeader(page, title, 'Fill')).toBeVisible();
        });

        await test.step('the valid values finish the task, the next task follows', async () => {
            await amount.fill('50');
            await code.fill('ABC');
            await email.fill('valid@netgrif.test');
            await email.blur();
            for (const field of [amount, code, email]) {
                await expect(fieldError(field)).toHaveCount(0);
            }
            await finish.click();
            await expect(taskHeader(page, title, 'Fill')).toHaveCount(0);
            await expect(taskHeader(page, title, 'Done')).toBeVisible();
        });
    });
});

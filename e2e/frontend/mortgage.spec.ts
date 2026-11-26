import * as path from 'path';
import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {assignTask, createCase, deployForSpec, expandTask, finishTask, openCase, setProcessRoles, taskHeader} from '../fixtures/engine';

const PROCESS = 'Mortgage';
/** an action of the process names the case after the user */
const CASE = 'Mortgage of Admin Netgrif';
const ROLES = ['Loan officer', 'Property appraiser', 'System', 'Account clerk'];

/** the status of the mortgage in the Status / Client task */
async function expectStatus(page: Page, status: string) {
    const task = await expandTask(page, CASE, 'Status / Client');
    await expect(task.getByRole('textbox').first()).toHaveValue(status);
}

async function write(field: Locator, value: string) {
    await field.fill(value);
    await field.blur();
}

/** fills the application of the client and finishes it (the city comes from the postal codes of the engine) */
async function applyForMortgage(page: Page) {
    const task = await expandTask(page, CASE, 'Apply for mortgage / Client');
    await expect(task.getByRole('textbox', {name: 'Name', exact: true})).toHaveValue('Admin');
    await write(task.getByRole('textbox', {name: 'Date of Birth'}), '10.1.2001');
    await write(task.getByRole('textbox', {name: 'Street Number'}), '106');
    await write(task.getByRole('textbox', {name: 'Street', exact: true}), 'Slávičie údolie');
    await write(task.getByRole('textbox', {name: 'Postal code'}), '81102');
    // the cities of the postal code come from the postal codes of the engine (PostalCodeImporter)
    const city = task.getByRole('combobox', {name: 'City'});
    const bratislava = page.locator('mat-option').filter({hasText: /^\s*Bratislava\s*$/});
    await city.focus();
    await city.press('Enter');
    await page.locator('mat-option').first().waitFor();
    test.skip(!await bratislava.isVisible(),
        'The engine has no postal codes: start it with nae.postal.codes.import=true (the dev profile has false)');
    await bratislava.click();
    await write(task.getByRole('spinbutton', {name: 'Monthly Income in EUR'}), '2000');
    await finishTask(page, CASE, 'Apply for mortgage / Client', task);
    await expectStatus(page, 'Mortgage Applied');
}

/** the appraisal report of the property: the value and the report file */
async function appraise(page: Page, value: string) {
    const task = await expandTask(page, CASE, 'Appraisal report / Property appraiser');
    await assignTask(task);
    await write(task.getByRole('spinbutton').first(), value);
    const chooser = page.waitForEvent('filechooser');
    await task.getByRole('button', {name: /choose a file/i}).first().click();
    await (await chooser).setFiles(path.join(__dirname, '..', 'fixtures', 'test.txt'));
    await expect(task).toContainText('test.txt');
    await finishTask(page, CASE, 'Appraisal report / Property appraiser', task);
}

/**
 * The mortgage of the Ranorex tests (mortgage_builder.xml). The Ranorex test assigned the roles of the next task to the
 * user one by one, here the administrator has all of them for the test (the roles of the newest version).
 */
test.describe('Mortgage (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'mortgage_builder.xml'));

    test.beforeEach(async ({page}) => setProcessRoles(page, PROCESS, ROLES, true));

    test.afterEach(async ({page}) => setProcessRoles(page, PROCESS, ROLES, false));

    test('NAE Mortgage_approve the mortgage is applied for, approved, signed and paid', async ({page}) => {
        test.setTimeout(240_000);
        await createCase(page, PROCESS, `E2E_mortgage_${Date.now()}`, CASE);

        await test.step('Apply for mortgage / Client', () => applyForMortgage(page));

        await test.step('Approve / Loan Officer', async () => {
            await finishTask(page, CASE, 'Approve / Loan Officer');
            await expectStatus(page, 'Mortgage pre-approved');
        });

        await test.step('Appraisal report / Property appraiser', async () => {
            await appraise(page, '100000');
            await expectStatus(page, 'Mortgage Approved');
        });

        await test.step('Mortgage application form / System', async () => {
            // the form of the application is enabled again after it is finished (not assigned to anybody then)
            const form = await expandTask(page, CASE, 'Mortgage application form / System');
            await assignTask(form);
            await form.getByRole('button', {name: 'Finish', exact: true}).click();
            await expect(taskHeader(page, CASE, 'Mortgage application form / System').first()).toHaveAccessibleName(/ high( More actions)?$/);
            await expect(taskHeader(page, CASE, 'Sign loan contract / Client')).toHaveCount(1);
        });

        await test.step('Sign loan contract and Sign insurance contract / Client', async () => {
            const loan = await expandTask(page, CASE, 'Sign loan contract / Client');
            await assignTask(loan);
            await write(loan.getByRole('textbox').first(), '123456789');
            await finishTask(page, CASE, 'Sign loan contract / Client', loan);
            const insurance = await expandTask(page, CASE, 'Sign insurance contract / Client');
            await assignTask(insurance);
            await insurance.getByRole('combobox').first().click();
            await page.locator('mat-option').filter({hasText: /^\s*Allianz\s*$/}).click();
            await finishTask(page, CASE, 'Sign insurance contract / Client', insurance);
        });

        await test.step('Confirm lien inscription / Loan officer and Send money / Account clerk', async () => {
            await finishTask(page, CASE, 'Confirm lien inscription / Loan officer');
            await finishTask(page, CASE, 'Send money / Account clerk');
            await expect(taskHeader(page, CASE, 'Send money / Account clerk')).toHaveCount(0);
        });
    });

    test('NAE Mortgage_reject the loan officer rejects the mortgage, the client deletes it', async ({page}) => {
        test.setTimeout(240_000);
        await createCase(page, PROCESS, `E2E_mortgage_${Date.now()}`, CASE);
        await applyForMortgage(page);
        for (const task of ['Reject / Loan officer', 'Approve / Loan Officer', 'Case info / Loan officer / Property appraiser']) {
            await expect(taskHeader(page, CASE, task)).toHaveCount(1);
        }
        await finishTask(page, CASE, 'Reject / Loan officer');
        await expect(taskHeader(page, CASE, 'Approve / Loan Officer')).toHaveCount(0);
        await finishTask(page, CASE, 'Delete / Client');
    });

    test('NAE Mortgage_reject_system a low appraised value rejects the mortgage by the system', async ({page}) => {
        test.setTimeout(240_000);
        await createCase(page, PROCESS, `E2E_mortgage_${Date.now()}`, CASE);
        await applyForMortgage(page);
        await finishTask(page, CASE, 'Approve / Loan Officer');
        await expectStatus(page, 'Mortgage pre-approved');
        await appraise(page, '1500');
        await expectStatus(page, 'Mortgage Rejected');
        // the engine rejects it by the system transition, the tasks of the case are shown again to see Delete
        await expect(async () => {
            await openCase(page, CASE);
            await expect(taskHeader(page, CASE, 'Delete / Client')).toHaveCount(1, {timeout: 3000});
        }).toPass({timeout: 30_000});
        await finishTask(page, CASE, 'Delete / Client');
    });
});

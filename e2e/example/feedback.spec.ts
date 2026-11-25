import {Page} from '@playwright/test';
import {expect, openDemo, snackBar, test} from '../fixtures/playground';

async function choose(page: Page, label: string, option: string): Promise<void> {
    await page.getByRole('combobox', {name: label}).click();
    await page.getByRole('option', {name: option, exact: true}).click();
}

test.describe('Snack bar', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/feedback/snack-bar'));

    for (const type of ['Success', 'Warning', 'Error']) {
        test(`NAE-TC-014 ${type.toLowerCase()} snack bar shows the message`, async ({page}) => {
            await choose(page, 'Type', type);
            await page.getByRole('textbox', {name: 'Message'}).fill(`${type} message`);
            await page.getByRole('button', {name: `Open ${type.toLowerCase()} snack bar`}).click();
            await expect(snackBar(page)).toContainText(`${type} message`);
        });
    }

    test('NAE-TC-014 error snack bar stays until it is closed', async ({page}) => {
        await choose(page, 'Type', 'Error');
        await page.getByRole('button', {name: 'Open error snack bar'}).click();
        await expect(snackBar(page)).toBeVisible();
        await page.waitForTimeout(4000);
        await expect(snackBar(page)).toBeVisible();
        await snackBar(page).getByRole('button').click();
        await expect(snackBar(page)).toBeHidden();
    });
});

test.describe('Alert, confirm, prompt', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/dialogs/basic'));

    test('NAE-TC-015 confirm dialog returns the chosen answer', async ({page}) => {
        await page.getByRole('button', {name: 'Open confirm dialog'}).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toContainText('Delete case');
        await expect(dialog).toContainText('Do you really want to delete the case?');
        await dialog.getByRole('button', {name: 'Delete'}).click();
        await expect(dialog).toBeHidden();
        await expect(page.getByText('Result:')).toContainText('true');

        await page.getByRole('button', {name: 'Open confirm dialog'}).click();
        await page.getByRole('dialog').getByRole('button', {name: 'Cancel'}).click();
        await expect(page.getByText('Result:')).toContainText('false');
    });

    test('NAE-TC-015 prompt dialog returns the typed text', async ({page}) => {
        await choose(page, 'Type', 'Prompt');
        await page.getByRole('button', {name: 'Open prompt dialog'}).click();
        const dialog = page.getByRole('dialog');
        await dialog.getByRole('textbox').fill('Red pill');
        await dialog.getByRole('button').last().click();
        await expect(dialog).toBeHidden();
        await expect(page.getByText('Result:')).toContainText('Red pill');
    });

    test('NAE-TC-015 alert dialog closes', async ({page}) => {
        await choose(page, 'Type', 'Alert');
        await page.getByRole('button', {name: 'Open alert dialog'}).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await dialog.getByRole('button').last().click();
        await expect(dialog).toBeHidden();
    });
});

import {Page} from '@playwright/test';
import {expect, openDemo, test} from '../fixtures/playground';

/** the value of the field shown by the playground (`field.value`) */
function shownValue(page: Page) {
    return page.locator('pre.value');
}

test.describe('Text field', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/fields/text'));

    test('NAE-TC-003 typed text is the value of the field', async ({page}) => {
        const input = page.getByRole('textbox', {name: 'Name'});
        await input.fill('John Smith');
        await input.blur();
        await expect(shownValue(page)).toHaveText('"John Smith"');
    });

    test('NAE-TC-003 required and length validations', async ({page}) => {
        const input = page.getByRole('textbox', {name: 'Name'});
        const invalid = page.getByText('invalid', {exact: true});
        await page.getByRole('switch', {name: 'required'}).click();
        await page.getByRole('checkbox', {name: 'maxLength 20'}).check();
        // the playground renders the field again after a change of the configuration
        await expect(input).toHaveAttribute('aria-required', 'true');

        const typed = async (text: string, isInvalid: boolean) => expect(async () => {
            await input.fill(text);
            await input.blur();
            await expect(invalid).toBeVisible({visible: isInvalid, timeout: 1000});
        }).toPass();
        await typed('', true);
        await typed('A text longer than twenty characters', true);
        await typed('Short', false);
    });

    test('NAE-TC-004 visible behavior makes the field read only', async ({page}) => {
        await page.getByRole('radio', {name: 'visible'}).check();
        await expect(page.getByRole('textbox', {name: 'Name'})).toBeDisabled();
    });
});

test.describe('Number field', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/fields/number'));

    test('NAE-TC-003 typed number is the value of the field', async ({page}) => {
        const input = page.locator('nc-data-field-template input').first();
        await input.fill('1234');
        await input.blur();
        await expect(shownValue(page)).toHaveText('1234');
    });
});

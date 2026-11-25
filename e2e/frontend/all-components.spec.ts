import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {createCase, deployForSpec, openCase, openTask} from '../fixtures/engine';

/** the default case name of the all_data model (the case is created without a title step) */
const CASE = 'All data test default case name';

/**
 * An option of the opened select / autocomplete panel. The panels are `mat-option`s (the list fields of the form are
 * `mat-list-option`s), the CDK renders the panel as a popover next to the field.
 */
function panelOption(page: Page, option: string) {
    return page.locator('mat-option').filter({hasText: new RegExp(`^\\s*${option}\\s*$`)});
}

/** chooses the option of a select (combobox) of the task */
async function choose(page: Page, select: Locator, option: string) {
    await select.click();
    await panelOption(page, option).click();
}

/** writes into a field and leaves it, the frontend sends the value to the engine on blur */
async function write(field: Locator, value: string) {
    await field.fill(value);
    await field.blur();
}

test.describe('All components (NAE)', () => {

    // every case of the model has the same default name, the tests open "the newest" case, so they run one by one
    test.describe.configure({mode: 'serial'});

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'all_data.xml'));

    test('NAE-TC-003 All_components_1 the editable fields show their values and take new ones', async ({page}) => {
        // fails without the fix of NAE-2509-opravy: TaskDataService sent only the last changed field of a task
        // (the other changes were lost), remove test.fail() when the fix is merged
        test.fail();
        test.setTimeout(120_000);
        await createCase(page, 'All Data', CASE);
        const task = await openTask(page, 'Task - editable');

        await test.step('number fields', async () => {
            const number = task.getByRole('spinbutton', {name: 'Number'});
            await expect(number).toHaveValue('10000');
            await write(number, '20000');
            await expect(number).toHaveValue('20000');
            // the EUR currency shows the same number field (as in the Ranorex test), the USD one its own field
            await expect(task.getByRole('textbox', {name: 'Number currency'}).first()).toHaveValue(/^20\s000,00\s€\s*$/);
            await expect(task.getByRole('textbox', {name: 'Number currency'}).nth(1)).toHaveValue(/^\$10,000\.00\s*$/);
        });

        await test.step('text fields', async () => {
            const text = task.getByRole('textbox', {name: 'Text', exact: true});
            await expect(text).toHaveValue('Lorem ipsum');
            await write(text, 'testing text');
            await expect(text).toHaveValue('testing text');
            const area = task.getByRole('textbox', {name: 'Text area'});
            await expect(area).toHaveValue(/^Lorem ipsum dolor sit amet/);
            await write(area, 'Pellentesque vitae magna in libero semper vulputate ut eu sapien.');
            await expect(area).toHaveValue('Pellentesque vitae magna in libero semper vulputate ut eu sapien.');
        });

        await test.step('password fields', async () => {
            const password = task.getByRole('textbox', {name: 'Password from data', exact: true});
            await write(password, 'abcd');
            await expect(password).toHaveAttribute('type', 'password');
            await password.locator('xpath=ancestor::mat-form-field').getByRole('button', {name: /password/i}).click();
            await expect(password).toHaveAttribute('type', 'text');
            await expect(password).toHaveValue('abcd');
        });

        await test.step('enumeration steppers', async () => {
            const stepper = task.getByRole('tablist').first();
            // the steps before the value are completed, the steps after it can not be chosen yet
            await expect(stepper.getByRole('tab', {name: 'Completed Alice'})).toBeVisible();
            await expect(stepper.getByRole('tab', {name: 'Carol'})).toBeDisabled();
            await expect(stepper.getByRole('tab', {name: 'Bob'})).toHaveAttribute('aria-selected', 'true');
            // the arrow stepper: every value can be chosen
            const arrow = task.getByRole('button', {name: 'Alice', exact: true}).first();
            await arrow.click();
            await expect(arrow).toHaveAttribute('aria-pressed', 'true');
            await expect(task.getByRole('button', {name: 'Bob', exact: true}).first()).toHaveAttribute('aria-pressed', 'false');
        });

        await test.step('enumeration fields', async () => {
            const enumeration = task.getByRole('combobox', {name: 'Enumeration', exact: true});
            await expect(enumeration).toHaveText('Bob');
            await choose(page, enumeration, 'Alice');
            await expect(enumeration).toHaveText('Alice');

            const autocomplete = task.getByRole('combobox', {name: 'Autocomplete'}).first();
            await expect(autocomplete).toHaveValue('Bob');
            await autocomplete.fill('Car');
            await panelOption(page, 'Carol').click();
            await expect(autocomplete).toHaveValue('Carol');

            const list = task.getByRole('listbox', {name: 'Enumeration list', exact: true});
            await expect(list.getByRole('option', {name: 'Bob'})).toHaveAttribute('aria-selected', 'true');
            await list.getByRole('option', {name: 'Carol'}).click();
            await expect(list.getByRole('option', {name: 'Carol'})).toHaveAttribute('aria-selected', 'true');
            await expect(list.getByRole('option', {name: 'Bob'})).toHaveAttribute('aria-selected', 'false');
        });

        await test.step('multichoice fields', async () => {
            const multichoice = task.getByRole('combobox', {name: 'Multichoice', exact: true});
            await expect(multichoice).toHaveText('Alice, Bob');
            await multichoice.click();
            await panelOption(page, 'Carol').click();
            await page.keyboard.press('Escape');
            await expect(multichoice).toHaveText('Alice, Bob, Carol');

            const list = task.getByRole('listbox', {name: 'Multichoice list'});
            await list.getByRole('option', {name: 'Alice'}).click();
            await expect(list.getByRole('option', {name: 'Alice'})).toHaveAttribute('aria-selected', 'false');
            await expect(list.getByRole('option', {name: 'Bob'})).toHaveAttribute('aria-selected', 'true');
        });

        await test.step('boolean and date fields', async () => {
            const boolean = task.getByRole('switch', {name: 'Boolean'});
            await expect(boolean).not.toBeChecked();
            await boolean.click();
            await expect(boolean).toBeChecked();
            const date = task.getByRole('textbox', {name: 'Date', exact: true});
            await expect(date).toHaveValue('01.01.2019');
            await write(date, '24.12.2024');
            await expect(date).toHaveValue('24.12.2024');
        });

        await test.step('other fields are shown', async () => {
            for (const group of ['File fields', 'User fields', 'Button fields', 'I18n fields', 'Task ref test group', 'Filter fields']) {
                await expect(task.getByRole('heading', {name: group})).toBeVisible();
            }
            await expect(task.getByRole('textbox', {name: 'i18n field'})).toHaveValue('This is english translation of i18n');
            await expect(task.getByRole('textbox', {name: 'Text datafield z iného transitionu'})).toHaveValue('Field načítaný pomocou taskrefu');
        });

        await test.step('the changes are saved on the engine (the case opened again)', async () => {
            // the tabs of the case view are not in the URL, the case is opened again from the list
            await openCase(page, CASE);
            const again = await openTask(page, 'Task - editable');
            await expect(again.getByRole('spinbutton', {name: 'Number'})).toHaveValue('20000');
            await expect(again.getByRole('textbox', {name: 'Text', exact: true})).toHaveValue('testing text');
            await expect(again.getByRole('textbox', {name: 'Text area'})).toHaveValue('Pellentesque vitae magna in libero semper vulputate ut eu sapien.');
            await expect(again.getByRole('combobox', {name: 'Enumeration', exact: true})).toHaveText('Alice');
            await expect(again.getByRole('combobox', {name: 'Autocomplete'}).first()).toHaveValue('Carol');
            await expect(again.getByRole('combobox', {name: 'Multichoice', exact: true})).toHaveText('Alice, Bob, Carol');
            await expect(again.getByRole('listbox', {name: 'Multichoice list'}).getByRole('option', {name: 'Alice'})).toHaveAttribute('aria-selected', 'false');
            await expect(again.getByRole('switch', {name: 'Boolean'})).toBeChecked();
            await expect(again.getByRole('textbox', {name: 'Date', exact: true})).toHaveValue('24.12.2024');
        });
    });

    test('NAE-TC-003 All_components_1 an option chosen in the enumeration autocomplete is saved when another field is clicked', async ({page}) => {
        // the choice is sent after a debounce, together with the other field changed meanwhile (TaskDataService
        // created the request body for every changed field again, only the last field was sent)
        test.setTimeout(120_000);
        await createCase(page, 'All Data', CASE);
        const task = await openTask(page, 'Task - editable');
        const autocomplete = task.getByRole('combobox', {name: 'Autocomplete'}).first();
        await autocomplete.click();
        await autocomplete.fill('Car');
        await panelOption(page, 'Carol').click();
        const sent = page.waitForRequest(request => request.method() === 'POST' && request.url().endsWith('/data')
            && (request.postData() ?? '').includes('"enumeration_list"'));
        await task.getByRole('listbox', {name: 'Enumeration list', exact: true}).getByRole('option', {name: 'Carol'}).click();
        await expect(autocomplete).toHaveValue('Carol');
        // one request with both changed fields
        expect(Object.keys(Object.values(JSON.parse((await sent).postData()!))[0] as object).sort())
            .toEqual(['enumeration_autocomplete', 'enumeration_list']);

        await openCase(page, CASE);
        const again = await openTask(page, 'Task - editable');
        await expect(again.getByRole('combobox', {name: 'Autocomplete'}).first()).toHaveValue('Carol', {timeout: 3000});
    });

    test('NAE-TC-004 All_components_2 the visible task shows the values of the editable task, read only', async ({page}) => {
        test.setTimeout(120_000);
        await createCase(page, 'All Data', CASE);
        const editable = await openTask(page, 'Task - editable');
        await write(editable.getByRole('spinbutton', {name: 'Number'}), '20000');
        await write(editable.getByRole('textbox', {name: 'Text', exact: true}), 'funguje to');
        await editable.getByRole('button', {name: 'Carol', exact: true}).first().click();
        await choose(page, editable.getByRole('combobox', {name: 'Enumeration', exact: true}), 'Alice');
        await editable.getByRole('listbox', {name: 'Enumeration list', exact: true}).getByRole('option', {name: 'Carol'}).click();
        await editable.getByRole('switch', {name: 'Boolean'}).click();
        await write(editable.getByRole('textbox', {name: 'Date', exact: true}), '17.01.2019');
        // the enumerations are sent after a debounce, the visible task loads the data of the engine
        await page.waitForLoadState('networkidle');

        const visible = await openTask(page, 'Task - visible');
        const number = visible.getByRole('spinbutton', {name: 'Number'});
        await expect(number).toHaveValue('20000');
        await expect(number).toBeDisabled();
        await expect(visible.getByRole('textbox', {name: 'Number currency'}).first()).toHaveValue(/^20\s000,00\s€\s*$/);
        await expect(visible.getByRole('textbox', {name: 'Text', exact: true})).toHaveValue('funguje to');
        await expect(visible.getByRole('textbox', {name: 'Text', exact: true})).toBeDisabled();
        const arrowCarol = visible.getByRole('button', {name: 'Carol', exact: true}).first();
        await expect(arrowCarol).toHaveAttribute('aria-pressed', 'true');
        await expect(arrowCarol).toBeDisabled();
        await expect(visible.getByRole('combobox', {name: 'Enumeration', exact: true})).toHaveText('Alice');
        await expect(visible.getByRole('combobox', {name: 'Enumeration', exact: true})).toHaveAttribute('aria-disabled', 'true');
        const list = visible.getByRole('listbox', {name: 'Enumeration list', exact: true});
        await expect(list.getByRole('option', {name: 'Carol'})).toHaveAttribute('aria-selected', 'true');
        await expect(list.getByRole('option', {name: 'Carol'})).toHaveAttribute('aria-disabled', 'true');
        await expect(visible.getByRole('switch', {name: 'Boolean'})).toBeChecked();
        await expect(visible.getByRole('switch', {name: 'Boolean'})).toBeDisabled();
        await expect(visible.getByRole('textbox', {name: 'Date', exact: true})).toHaveValue('17.01.2019');
        await expect(visible.getByRole('textbox', {name: 'Date', exact: true})).toBeDisabled();
        // no field of the visible task can be edited: the buttons, the user and the file fields too
        for (const button of await visible.getByRole('button', {name: 'Push'}).all()) {
            await expect(button).toBeDisabled();
        }
        await expect(visible.getByRole('textbox', {name: 'User', exact: true})).toBeDisabled();
        await expect(visible.getByRole('group', {name: 'File', exact: true})).toContainText('No file');
    });
});

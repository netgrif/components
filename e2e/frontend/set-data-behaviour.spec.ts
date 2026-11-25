import * as path from 'path';
import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {createCase, deployForSpec, openTask, renderWholeTask} from '../fixtures/engine';

/**
 * The fields of the editable task in the order of the form, every field has its own Editable/visible and Hidden
 * button (the n-th button belongs to the n-th field), the event results are named by `events`.
 */
const FIELDS: Array<{name: string, events: string, field: (task: Locator) => Locator, editable: boolean}> = [
    {name: 'Number', events: 'Number', field: t => t.getByRole('spinbutton', {name: 'Number', exact: true}), editable: true},
    {name: 'Text', events: 'Text', field: t => t.getByRole('textbox', {name: 'Text', exact: true}), editable: true},
    {name: 'Text area', events: 'Text area', field: t => t.getByRole('textbox', {name: 'Text area', exact: true}), editable: true},
    {name: 'Enumeration', events: 'Enumeration', field: t => t.getByRole('combobox', {name: 'Enumeration', exact: true}), editable: true},
    {name: 'Enumeration map', events: 'Enumeration map', field: t => t.getByRole('combobox', {name: 'Enumeration Map'}), editable: true},
    {name: 'Multichoice', events: 'Multichoice', field: t => t.getByRole('combobox', {name: 'Multichoice', exact: true}), editable: true},
    {name: 'Multichoice map', events: 'Multichoice map', field: t => t.getByRole('combobox', {name: 'Multichoice Map'}), editable: true},
    {name: 'Boolean', events: 'Boolean', field: t => t.getByRole('switch', {name: 'Boolean'}), editable: true},
    {name: 'Date', events: 'Date', field: t => t.getByRole('textbox', {name: 'Date', exact: true}), editable: true},
    {name: 'Datetime', events: 'Datetime', field: t => t.getByRole('textbox', {name: 'Datetime', exact: true}), editable: true},
    // the file fields are a drop zone, the editability is checked on the other fields
    {name: 'File', events: 'File', field: t => t.getByRole('group', {name: 'File', exact: true}), editable: false},
    {name: 'File list', events: 'Filelist', field: t => t.getByRole('group', {name: 'File List'}), editable: false},
    {name: 'User', events: 'User', field: t => t.getByRole('textbox', {name: 'User', exact: true}), editable: true},
];

function preSet(task: Locator, events: string) {
    return task.getByRole('textbox', {name: `${events} field pre set event result`});
}

function postSet(task: Locator, events: string) {
    return task.getByRole('textbox', {name: `${events} field post set event result`});
}

/** chooses the option of a select of the task (the panel is a popover next to the field) */
async function choose(page: Page, select: Locator, option: string) {
    await select.click();
    await page.locator('mat-option').filter({hasText: new RegExp(`^\\s*${option}\\s*$`)}).click();
}

/**
 * The set_data_test model: every field has buttons whose actions change its behavior (hidden, editable / visible,
 * required / optional), the pre and post set events of the field write the value into two other fields.
 */
test.describe('Set data behaviour (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'set_data_test.xml'));

    test('NAE-TC-018 Set_data_behaviour1 number field: behavior from the actions, pre and post set events', async ({page}) => {
        test.setTimeout(120_000);
        await createCase(page, 'Set data test net', 'Set_data');
        const task = await openTask(page, 'Task - editable');
        const number = task.getByRole('spinbutton', {name: 'Number', exact: true});
        const preSet = task.getByRole('textbox', {name: 'Number field pre set event result'});
        const postSet = task.getByRole('textbox', {name: 'Number field post set event result'});

        await expect(number).toHaveValue('10000');
        await expect(preSet).toHaveValue('No value from pre set event');
        await expect(postSet).toHaveValue('No value from post set event');

        await test.step('hidden', async () => {
            await task.getByRole('button', {name: 'Hidden'}).first().click();
            await expect(number).toBeHidden();
            await task.getByRole('button', {name: 'Editable/visible'}).first().click();
            await expect(number).toBeVisible();
        });

        await test.step('visible and editable', async () => {
            await task.getByRole('button', {name: 'Editable/visible'}).first().click();
            await expect(number).toBeDisabled();
            await task.getByRole('button', {name: 'Editable/visible'}).first().click();
            await expect(number).toBeEditable();
        });

        await test.step('deleted value: the pre set event sees the old value, the post set event the new one', async () => {
            await number.fill('');
            await number.blur();
            await expect(preSet).toHaveValue('Value changed from pre set event, value of number field: 10000.0');
            await expect(postSet).toHaveValue('Value changed from pre set event, value of number field: null');
        });

        await test.step('required', async () => {
            // the button switches the requirement: the field starts required, the first click makes it optional
            const required = task.getByRole('button', {name: 'Required/optional'}).first();
            await required.click();
            await expect(number).toHaveAttribute('aria-required', 'false');
            await required.click();
            await expect(number).toHaveAttribute('aria-required', 'true');
            await expect(task.getByText('This field is required!')).toBeVisible();
            await number.fill('20');
            await number.blur();
            await expect(preSet).toHaveValue('Value changed from pre set event, value of number field: null');
            await expect(postSet).toHaveValue('Value changed from pre set event, value of number field: 20.0');
            await expect(task.getByText('This field is required!')).toBeHidden();
        });
    });

    test('NAE-TC-018 Set_data_behaviour1 every field is hidden, made visible and editable by the actions', async ({page}) => {
        test.setTimeout(180_000);
        await createCase(page, 'Set data test net', 'Set_data');
        const task = await openTask(page, 'Task - editable');
        await renderWholeTask(task);
        for (const [index, {name, field, editable}] of FIELDS.entries()) {
            await test.step(name, async () => {
                const element = field(task);
                const visibility = task.getByRole('button', {name: 'Editable/visible'}).nth(index);
                await element.scrollIntoViewIfNeeded();
                await expect(element).toBeVisible();
                await task.getByRole('button', {name: 'Hidden'}).nth(index).click();
                await expect(element).toBeHidden();
                await visibility.click();
                await expect(element).toBeVisible();
                if (editable) {
                    await visibility.click();
                    await expect(element).toBeDisabled();
                    await visibility.click();
                    await expect(element).toBeEnabled();
                }
            });
        }
    });

    test('NAE-TC-018 / NAE-TC-019 Set_data_behaviour the pre set event gets the old value, the post set event the new one', async ({page}) => {
        test.setTimeout(180_000);
        await createCase(page, 'Set data test net', 'Set_data');
        const task = await openTask(page, 'Task - editable');
        await renderWholeTask(task);
        const event = 'Value changed from pre set event, value of';

        await test.step('Text', async () => {
            const text = task.getByRole('textbox', {name: 'Text', exact: true});
            await text.fill('test text');
            await text.blur();
            await expect(preSet(task, 'Text')).toHaveValue(`${event} text field: Lorem ipsum`);
            await expect(postSet(task, 'Text')).toHaveValue(`${event} text field: test text`);
        });

        await test.step('Text area', async () => {
            const area = task.getByRole('textbox', {name: 'Text area', exact: true});
            await area.fill('test text area');
            await area.blur();
            await expect(preSet(task, 'Text area')).toHaveValue(new RegExp(`^${event} text area field: Lorem ipsum dolor`));
            await expect(postSet(task, 'Text area')).toHaveValue(`${event} text area field: test text area`);
        });

        await test.step('Enumeration', async () => {
            await choose(page, task.getByRole('combobox', {name: 'Enumeration', exact: true}), 'Alice');
            await expect(preSet(task, 'Enumeration')).toHaveValue('Value changed from pre set event, value of enumeration field: Bob');
            await expect(postSet(task, 'Enumeration')).toHaveValue('Value changed from post set event, value of enumeration field: Alice');
        });

        await test.step('Boolean (NAE-TC-019)', async () => {
            await task.getByRole('switch', {name: 'Boolean'}).click();
            await expect(preSet(task, 'Boolean')).toHaveValue('Value changed from pre set event, value of boolean field: false');
            await expect(postSet(task, 'Boolean')).toHaveValue('Value changed from post set event, value of boolean field: true');
        });

        await test.step('Date (NAE-TC-019)', async () => {
            const date = task.getByRole('textbox', {name: 'Date', exact: true});
            await date.fill('1.10.2020');
            await date.blur();
            await expect(preSet(task, 'Date')).toHaveValue('Value changed from pre set event, value of date field: 2018-12-31');
            await expect(postSet(task, 'Date')).toHaveValue('Value changed from post set event, value of date field: 2020-10-01');
        });

        await test.step('Datetime (NAE-TC-019)', async () => {
            const datetime = task.getByRole('textbox', {name: 'Datetime', exact: true});
            await datetime.fill('1.10.2020');
            await datetime.blur();
            await expect(preSet(task, 'Datetime')).toHaveValue(/^Value changed from pre set event, value of datetime field: 2019-01-01T19:00/);
            await expect(postSet(task, 'Datetime')).toHaveValue(/^Value changed from post set event, value of datetime field: 2020-10-01T/);
        });

        await test.step('File (NAE-TC-019)', async () => {
            const file = task.getByRole('group', {name: 'File', exact: true});
            const chooser = page.waitForEvent('filechooser');
            await file.getByRole('button', {name: 'choose a file'}).click();
            await (await chooser).setFiles(path.join(__dirname, '..', 'fixtures', 'test.txt'));
            await expect(file).toContainText('test.txt');
            await expect(preSet(task, 'File')).toHaveValue(/^Value changed from pre set event, value of file field/);
            await expect(postSet(task, 'File')).toHaveValue(/^Value changed from post set event, value of file field: .*test\.txt/);
        });

        await test.step('User (NAE-TC-019)', async () => {
            const user = task.getByRole('textbox', {name: 'User', exact: true});
            await user.locator('xpath=ancestor::mat-form-field').getByRole('button').click();
            const dialog = page.getByRole('dialog');
            await dialog.getByText('Admin Netgrif').first().click();
            await dialog.getByRole('button', {name: /assign/i}).click();
            await expect(dialog).toBeHidden();
            await expect(preSet(task, 'User')).toHaveValue('Value changed from pre set event, value of user field: null null');
            await expect(postSet(task, 'User')).toHaveValue('Value changed from post set event, value of user field: Admin Netgrif');
        });
    });

    test('NAE-TC-018 / NAE-TC-019 Set_data_behaviour a required field without a value shows the error', async ({page}) => {
        test.setTimeout(180_000);
        await createCase(page, 'Set data test net', 'Set_data');
        const task = await openTask(page, 'Task - editable');
        await renderWholeTask(task);
        const required = [['Text', 'test text'], ['Text area', 'test text area'], ['Date', '1.10.2020']];
        for (const [name, value] of required) {
            await test.step(name, async () => {
                const index = FIELDS.findIndex(field => field.name === name);
                const element = FIELDS[index].field(task);
                const error = element.locator('xpath=ancestor::mat-form-field').getByText('This field is required!');
                await element.fill('');
                await element.blur();
                // the button switches the requirement, it is switched until the field is required
                const switchRequired = task.getByRole('button', {name: 'Required/optional'}).nth(index);
                await expect(async () => {
                    if (await element.getAttribute('aria-required') !== 'true') {
                        await switchRequired.click();
                    }
                    await expect(element).toHaveAttribute('aria-required', 'true', {timeout: 2000});
                }).toPass();
                await expect(error).toBeVisible();
                await element.fill(value);
                await element.blur();
                await expect(error).toBeHidden();
            });
        }
    });
});

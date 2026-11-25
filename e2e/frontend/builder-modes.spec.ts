import * as fs from 'fs';
import {Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {petriflowElement, petriflowElements, petriflowText} from '../fixtures/petriflow';
import {builderButton, canvasElement, confirmDelete, draw, drawArc, exportModel, importModel, newProcess, rowButton} from '../fixtures/builder';

/** the detail of the selected item of a master / detail mode (data, roles, actions) */
function detail(page: Page, mode: 'data' | 'role' | 'actions') {
    return page.locator(`nc-builder-${mode}-mode`);
}

/** adds a data variable in the data mode, it is selected after that */
async function addData(page: Page, type: string, title: string) {
    await builderButton(page, 'mode_data').click();
    await page.getByRole('button', {name: 'Add data variable'}).click();
    const variable = detail(page, 'data');
    await variable.getByRole('combobox', {name: 'Type'}).click();
    await page.getByRole('option', {name: type, exact: true}).click();
    await variable.getByRole('textbox', {name: 'Title'}).fill(title);
    await variable.getByRole('textbox', {name: 'Title'}).blur();
}

/** the master item of the master / detail mode with the text (the id of the data variable, role or function) */
function masterItem(page: Page, mode: 'data' | 'role' | 'function', text: string) {
    return page.locator(`nc-builder-${mode}-master-item`).filter({hasText: text});
}

/** a transition t1 and its form (task mode of the transition: form builder and the events) */
async function openForm(page: Page) {
    await draw(page, 'tool_CreateTransitionTool', 700, 500);
    await builderButton(page, 'tool_SelectTool').click();
    await canvasElement(page, 'transition_t1').dblclick({force: true});
    await expect(page.getByRole('heading', {name: 'Data fields'})).toBeVisible();
}

/** adds a new field of the type with the component to the form (a click on the component in the field list) */
async function addFormField(page: Page, type: string, component: string) {
    const types = page.getByRole('region', {name: 'Create new fields'});
    const typeButton = types.getByRole('button', {name: type, exact: true});
    if (await typeButton.getAttribute('aria-expanded') !== 'true') {
        await typeButton.click();
    }
    await types.getByRole('region', {name: type, exact: true}).getByText(component, {exact: true}).click();
}

test.describe('Builder modes (NAB)', () => {

    test.beforeEach(async ({page}) => newProcess(page));

    test('Data_view_part1 data variables of several types are exported with their titles', async ({page}) => {
        const variables = [['Text', 'text', 'Client'], ['Number', 'number', 'Amount'], ['Enumeration', 'enumeration', 'Type'],
            ['Boolean', 'boolean', 'Approved'], ['Date', 'date', 'Reported']];
        for (const [type, , title] of variables) {
            await addData(page, type, title);
        }
        const xml = await exportModel(page);
        const data = petriflowElements(xml, 'data');
        expect(data).toHaveLength(variables.length);
        for (const [, type, title] of variables) {
            const variable = data.find(d => petriflowText(d, 'title') === title);
            expect(variable, `data variable ${title}`).toBeDefined();
            expect(variable).toContain(`type="${type}"`);
        }
    });

    test('Data_view_part2 a duplicated data variable is a copy, a deleted one is not exported', async ({page}) => {
        await addData(page, 'Number', 'Amount');
        await (await rowButton(masterItem(page, 'data', 'data1'), 'add_to_photos')).click();
        let data = petriflowElements(await exportModel(page), 'data');
        expect(data).toHaveLength(2);
        for (const variable of data) {
            expect(variable).toContain('type="number"');
            expect(petriflowText(variable, 'title')).toBe('Amount');
        }

        await (await rowButton(masterItem(page, 'data', 'data1').first(), 'delete')).click();
        await confirmDelete(page);
        data = petriflowElements(await exportModel(page), 'data');
        expect(data).toHaveLength(1);
        expect(petriflowText(data[0], 'id')).not.toBe('data1');
    });

    test('Data_ID_refactor a renamed data variable is renamed in the form too', async ({page}) => {
        await openForm(page);
        await addFormField(page, 'Text', 'Simple');
        await page.getByRole('button', {name: 'Back'}).click();

        await builderButton(page, 'mode_data').click();
        await masterItem(page, 'data', 'text_0').click();
        await detail(page, 'data').getByRole('textbox', {name: 'ID'}).locator('xpath=ancestor::mat-form-field//button').click();
        const rename = page.getByRole('dialog', {name: 'Rename ID'});
        await rename.getByRole('textbox', {name: 'New ID'}).fill('client_name');
        await rename.getByRole('button', {name: 'Rename'}).click();
        await expect(rename).toBeHidden();
        await expect(detail(page, 'data').getByRole('textbox', {name: 'ID'})).toHaveValue('client_name');

        const xml = await exportModel(page);
        expect(petriflowElement(xml, 'data', 'client_name')).toBeDefined();
        expect(petriflowElement(xml, 'data', 'text_0')).toBeUndefined();
        expect(petriflowElement(xml, 'transition', 't1')).toContain('<id>client_name</id>');
    });

    test('Roles_permissions added roles with titles, a deleted role is not exported', async ({page}) => {
        await builderButton(page, 'mode_roles').click();
        for (let i = 0; i < 3; i++) {
            await page.getByRole('button', {name: 'Add role'}).click();
        }
        await masterItem(page, 'role', 'role1').click();
        await detail(page, 'role').getByRole('textbox', {name: 'Title'}).fill('Clerk');
        await detail(page, 'role').getByRole('textbox', {name: 'Title'}).blur();
        await (await rowButton(masterItem(page, 'role', 'role3'), 'delete')).click();
        await confirmDelete(page);

        const xml = await exportModel(page);
        expect(petriflowElements(xml, 'role').map(role => petriflowText(role, 'id')).sort()).toEqual(['role1', 'role2']);
        expect(petriflowText(petriflowElement(xml, 'role', 'role1'), 'title')).toBe('Clerk');
    });

    test('Roles_permissions the permissions set from the Edit task dialog are kept', async ({page}) => {
        // fails: the Edit task dialog edits a copy of the transition, its Permissions button closes the dialog without
        // saving and the permissions are changed on that copy (the Permissions item of the context menu works)
        test.fail();
        await builderButton(page, 'mode_roles').click();
        await page.getByRole('button', {name: 'Add role'}).click();
        await builderButton(page, 'mode_modeler').click();
        await draw(page, 'tool_CreateTransitionTool', 700, 500);
        await builderButton(page, 'tool_SelectTool').click();
        await canvasElement(page, 'transition_t1').click({force: true, button: 'right'});
        await page.getByRole('menuitem', {name: /Edit/}).first().click();
        await page.getByRole('dialog', {name: 'Edit task'}).getByRole('button', {name: /^Permissions/}).click();
        const permissions = page.getByRole('dialog', {name: 'Task permissions'});
        await permissions.getByRole('row').filter({has: page.getByRole('cell', {name: 'role1', exact: true})})
            .getByRole('checkbox').first().check();
        await permissions.getByRole('button', {name: 'Close'}).click();
        await expect(permissions).toBeHidden();

        const roleRef = petriflowElements(petriflowElement(await exportModel(page), 'transition', 't1') ?? '', 'roleRef')[0] ?? '';
        expect(petriflowText(roleRef, 'id')).toBe('role1');
        expect(petriflowText(roleRef, 'perform')).toBe('true');
    });

    test('Metadata_editor the metadata of the model are exported', async ({page}) => {
        await page.mouse.click(700, 500, {button: 'right'});
        await page.getByRole('menuitem', {name: /Edit model/}).click();
        const model = page.getByRole('dialog', {name: 'Edit model'});
        await model.getByRole('textbox', {name: 'ID'}).fill('model_identifier');
        await model.getByRole('textbox', {name: 'Version'}).fill('1.0.0');
        await model.getByRole('textbox', {name: 'Title'}).fill('Model Title');
        await model.getByRole('textbox', {name: 'Initials'}).fill('INI');
        await model.getByRole('textbox', {name: 'Default case name'}).fill('Default case name');
        await model.getByRole('button', {name: 'Save'}).click();
        await expect(model).toBeHidden();

        const xml = await exportModel(page);
        expect(petriflowText(xml, 'id')).toBe('model_identifier');
        expect(petriflowText(xml, 'version')).toBe('1.0.0');
        expect(petriflowText(xml, 'title')).toBe('Model Title');
        expect(petriflowText(xml, 'initials')).toBe('INI');
        expect(petriflowText(xml, 'caseName')).toBe('Default case name');
    });

    test('Transition_event_editor the titles and messages of the task events are exported', async ({page}) => {
        await openForm(page);
        // the events in the order of the form: assign, finish, cancel, delegate
        await page.getByRole('textbox', {name: 'Title'}).nth(0).fill('Assign the claim');
        await page.getByRole('textbox', {name: 'Message'}).nth(0).fill('The claim is yours');
        await page.getByRole('textbox', {name: 'Title'}).nth(1).fill('Finish the claim');
        await page.getByRole('textbox', {name: 'Message'}).nth(1).blur();
        await page.getByRole('button', {name: 'Back'}).click();

        const transition = petriflowElement(await exportModel(page), 'transition', 't1');
        const events = petriflowElements(transition, 'event');
        const assign = events.find(event => event.includes('type="assign"'));
        expect(assign).toContain('Assign the claim');
        expect(assign).toContain('The claim is yours');
        expect(events.find(event => event.includes('type="finish"'))).toContain('Finish the claim');
    });

    test('Form_builder the fields added to the form are data references of the task', async ({page}) => {
        // fails without the fix of NAE-2509-opravy: the gridster of the form builder (OnPush) does not render a field
        // added from the field list, remove test.fail() when the fix is merged
        test.fail();
        await openForm(page);
        await addFormField(page, 'Text', 'Simple');
        await addFormField(page, 'Number', 'Currency');
        await addFormField(page, 'Boolean', 'Slide');
        // the fields are on the form at once, not only after a click into the form (the form is OnPush)
        await expect(page.locator('gridster gridster-item')).toHaveCount(3);
        await page.getByRole('button', {name: 'Back'}).click();

        const xml = await exportModel(page);
        expect(petriflowElements(xml, 'data').map(d => petriflowText(d, 'id')).sort()).toEqual(['boolean_0', 'number_0', 'text_0']);
        const transition = petriflowElement(xml, 'transition', 't1');
        expect(petriflowElements(transition, 'dataRef').map(ref => petriflowText(ref, 'id'))).toEqual(['text_0', 'number_0', 'boolean_0']);
        // the component of the form field is the component of the data reference
        expect(petriflowText(petriflowElements(transition, 'dataRef')[1], 'name')).toBe('currency');
        // the form places every field in a free cell, no field covers another one
        const cells = petriflowElements(transition, 'dataRef').map(ref => `${petriflowText(ref, 'x')},${petriflowText(ref, 'y')}`);
        expect(new Set(cells).size).toBe(cells.length);
    });

    test('Form_builder a field dragged to the form is a data reference of the task', async ({page}) => {
        // fails without the fix of NAE-2509-opravy: the drop of a component without properties parses the empty
        // properties (JSON.parse), remove test.fail() when the fix is merged
        test.fail();
        // a component without properties (Text - Simple): the drop parsed the empty properties (JSON.parse(''))
        await openForm(page);
        const types = page.getByRole('region', {name: 'Create new fields'});
        await types.getByRole('button', {name: 'Text', exact: true}).click();
        await types.getByRole('region', {name: 'Text', exact: true}).getByText('Simple', {exact: true})
            .dragTo(page.locator('gridster'), {targetPosition: {x: 100, y: 40}});
        await expect(page.locator('gridster gridster-item')).toHaveCount(1);
        await page.getByRole('button', {name: 'Back'}).click();
        const transition = petriflowElement(await exportModel(page), 'transition', 't1');
        expect(petriflowElements(transition, 'dataRef').map(ref => petriflowText(ref, 'id'))).toEqual(['text_0']);
    });

    test('Component_editor the component of a data variable is exported', async ({page}) => {
        // fails without the fix of NAE-2509-opravy: the components of a data variable are filtered by the name
        // case sensitively (no component is offered), remove test.fail() when the fix is merged
        test.fail();
        await addData(page, 'Number', 'Amount');
        await detail(page, 'data').getByRole('button', {name: 'Add component'}).click();
        // an autocomplete of the component names
        const component = detail(page, 'data').getByRole('combobox', {name: 'Component name'});
        // the filter ignores the case: the titles of the components start with a capital letter
        await component.fill('Curr');
        // the autocomplete is under the field at the bottom of the page, the option is chosen by the keyboard
        await expect(page.getByRole('option', {name: 'Currency', exact: true})).toBeAttached();
        await component.press('ArrowDown');
        await component.press('Enter');
        await expect(component).toHaveValue(/currency/i);

        const data = petriflowElement(await exportModel(page), 'data', 'data1');
        expect(petriflowText(data, 'name')).toBe('currency');
    });

    test('Function_editor added, renamed and deleted functions', async ({page}) => {
        await builderButton(page, 'mode_actions').click();
        await builderButton(page, 'tool_functions').click();
        await page.getByRole('button', {name: 'Add function'}).click();
        await detail(page, 'actions').getByRole('textbox', {name: 'Name'}).fill('calculate');
        await detail(page, 'actions').getByRole('textbox', {name: 'Name'}).blur();
        await page.getByRole('button', {name: 'Add function'}).click();

        let functions = petriflowElements(await exportModel(page), 'function');
        expect(functions).toHaveLength(2);
        expect(functions.some(f => f.includes('name="calculate"'))).toBe(true);

        await (await rowButton(masterItem(page, 'function', 'calculate'), 'delete')).click();
        await confirmDelete(page);
        functions = petriflowElements(await exportModel(page), 'function');
        expect(functions).toHaveLength(1);
        expect(functions[0]).not.toContain('name="calculate"');
    });

    test('I18n_editor a translation of the model title is exported', async ({page}) => {
        await builderButton(page, 'mode_i18n').click();
        await page.getByRole('combobox', {name: 'Language'}).click();
        await page.getByRole('option', {name: 'Slovak'}).click();
        await page.getByRole('button', {name: 'Add', exact: true}).click();
        await page.getByRole('button', {name: 'Slovak'}).click();
        const metadata = page.getByRole('tabpanel', {name: 'Model metadata'});
        await metadata.getByRole('textbox', {name: 'Translation'}).first().fill('Nový model');
        await metadata.getByRole('textbox', {name: 'Translation'}).first().blur();

        const i18n = petriflowElements(await exportModel(page), 'i18n').find(element => element.includes('locale="sk"'));
        expect(i18n).toBeDefined();
        expect(i18n).toMatch(/<i18nString name="model_title">Nový model<\/i18nString>/);
    });

    test('I18n_field the translation of a data variable is exported and imported again', async ({page}, testInfo) => {
        await addData(page, 'Text', 'Name');
        await builderButton(page, 'mode_i18n').click();
        await page.getByRole('combobox', {name: 'Language'}).click();
        await page.getByRole('option', {name: 'Slovak'}).click();
        await page.getByRole('button', {name: 'Add', exact: true}).click();
        await expect(page.getByRole('button', {name: 'Slovak'})).toBeVisible();
        await page.getByRole('button', {name: 'Slovak'}).click();
        await page.getByRole('tab', {name: 'Data variables'}).click();
        const translations = page.getByRole('tabpanel', {name: 'Data variables'});
        await translations.getByRole('textbox', {name: 'Translation'}).first().fill('Meno');
        await translations.getByRole('textbox', {name: 'Translation'}).first().blur();

        const xml = await exportModel(page);
        expect(petriflowElements(xml, 'i18n').find(i => i.includes('locale="sk"'))).toMatch(/<i18nString name="data_data1_title">Meno<\/i18nString>/);

        // the exported model imported again keeps the translation
        const file = testInfo.outputPath('i18n_field.xml');
        fs.writeFileSync(file, xml);
        await newProcess(page);
        await importModel(page, file);
        await builderButton(page, 'mode_i18n').click();
        await page.getByRole('button', {name: 'Slovak'}).click();
        await page.getByRole('tab', {name: 'Data variables'}).click();
        await expect(page.getByRole('tabpanel', {name: 'Data variables'}).getByRole('textbox', {name: 'Translation'}).first())
            .toHaveValue('Meno');
    });

    test('Check_components_elements the Markdown and HTML editors of a text field have their toolbars in the form', async ({page}) => {
        // fails without the fix of NAE-2509-opravy: the gridster of the form builder (OnPush) does not render a field
        // added from the field list, remove test.fail() when the fix is merged
        test.fail();
        await openForm(page);
        await addFormField(page, 'Text', 'Markdown editor');
        await expect(page.locator('gridster .editor-toolbar')).toBeVisible();
        await addFormField(page, 'Text', 'HTML editor');
        await expect(page.locator('gridster .ql-toolbar')).toBeVisible();
    });

    test('Fast_PN_mode reset, inhibitor and read arcs are exported with their types', async ({page}) => {
        // a place and a transition for each arc, the arcs to one transition would cover each other
        for (const y of [480, 540, 600]) {
            await draw(page, 'tool_CreatePlaceTool', 550, y);
            await draw(page, 'tool_CreateTransitionTool', 800, y);
        }
        await drawArc(page, 'tool_CreateResetArcTool', 'place_p1', 'transition_t1');
        await drawArc(page, 'tool_CreateInhibitorArcTool', 'place_p2', 'transition_t2');
        await drawArc(page, 'tool_CreateReadArcTool', 'place_p3', 'transition_t3');

        const arcs = petriflowElements(await exportModel(page), 'arc');
        expect(arcs.map(arc => `${petriflowText(arc, 'sourceId')}:${petriflowText(arc, 'type')}`).sort())
            .toEqual(['p1:reset', 'p2:inhibitor', 'p3:read']);
    });
});

test.describe('Builder simulation (NAB)', () => {

    /** the transitions that can fire in the simulation */
    async function enabledTransitions(page: Page): Promise<Array<string>> {
        return (await page.locator('rect.svg-transition-enabled[id^="svg_transition_"]').evaluateAll(
            rects => rects.map(rect => rect.id.replace('svg_transition_', '')))).sort();
    }

    test('Simulator a fired transition enables the next one, reset returns the initial marking', async ({page}) => {
        await newProcess(page);
        await importModel(page, 'mortgage.xml');
        await builderButton(page, 'mode_simulation').click();
        await expect.poll(() => enabledTransitions(page)).toEqual(['t24', 't25']);

        await canvasElement(page, 'transition_t25').click({force: true});
        await expect.poll(() => enabledTransitions(page)).toEqual(['t2', 't24']);

        await builderButton(page, 'tool_reset_simulation').click();
        await expect.poll(() => enabledTransitions(page)).toEqual(['t24', 't25']);
    });

    // the mortgage is wider than the default viewport, the transitions on the right are outside of the canvas
    test.use({viewport: {width: 1600, height: 1000}});

    /** the places with a token in the simulation (the first token of the place is drawn) */
    async function markedPlaces(page: Page): Promise<Array<string>> {
        return (await page.locator('[id^="svg_place_marking_token_0_"]').evaluateAll(tokens => tokens
            .filter(token => getComputedStyle(token).fill === 'rgb(0, 0, 0)')
            .map(token => token.id.replace('svg_place_marking_token_0_', '')))).sort();
    }

    test('Load_net the labels of the transitions of the loaded mortgage', async ({page}) => {
        await newProcess(page);
        await importModel(page, 'mortgage_demo.xml');
        const label = (id: string) => page.locator(`text[id="svg_transition_label_${id}"]`);
        await expect(label('288')).toHaveText('Constructor / System');
        await expect(label('1')).toHaveText('Apply for mortgage / Client');
        await expect(label('9')).toHaveText('Approve / Loan Officer');
        await expect(label('ok')).toHaveText('Approve / System');
        await expect(label('ko')).toHaveText('Reject / System');
        await expect(label('78')).toHaveText('Send money / Account clerk');
        await expect(page.locator('text[id^="svg_transition_label_"]')).toHaveCount(14);
    });

    test('Load_net the simulation of the mortgage from the application to the payment', async ({page}) => {
        await newProcess(page);
        await importModel(page, 'mortgage_demo.xml');
        await builderButton(page, 'mode_simulation').click();
        await expect.poll(() => enabledTransitions(page)).toEqual(['288']);
        await expect.poll(() => markedPlaces(page)).toEqual(['289']);

        // [fired transition, enabled transitions after it, places with a token after it]
        const steps: Array<[string, Array<string>, Array<string>]> = [
            ['288', ['1'], ['2']],                                   // Constructor / System
            ['1', ['14', '155', '53', '9'], ['11', '156', '204']],   // Apply for mortgage
            ['53', ['14', '155', '53', '9'], ['11', '156', '204']],  // Case info does not change the marking
            ['9', ['155', '39', '53'], ['156', '20', '204']],        // Approve / Loan officer
            ['39', ['155', '53', 'ko', 'ok'], ['156', '204', '316']], // Appraisal report
            ['ok', ['155', '53', '61'], ['156', '204', '41']],       // Approve / System
            ['61', ['155', '53', '59', '72'], ['156', '204', '67', '70']], // Sign loan contract
            ['59', ['155', '53', '72'], ['156', '204', '70', '74']], // Confirm lien inscription
            ['72', ['155', '53', '78'], ['156', '204', '74', '75']], // Sign insurance contract
            ['78', ['155', '53'], ['156', '204']],                   // Send money
        ];
        for (const [fired, enabled, marked] of steps) {
            await test.step(`fire ${fired}`, async () => {
                await canvasElement(page, `transition_${fired}`).click({force: true});
                await expect.poll(() => enabledTransitions(page)).toEqual([...enabled].sort());
                await expect.poll(() => markedPlaces(page)).toEqual([...marked].sort());
            });
        }
    });

    test('Load_net the roles of the loaded mortgage, a new role is added and deleted', async ({page}) => {
        await newProcess(page);
        await importModel(page, 'mortgage_demo.xml');
        await builderButton(page, 'mode_roles').click();
        for (const [id, title] of [['client', 'Client'], ['loan_officer', 'Loan Officer'],
            ['property_appraiser', 'Property Appraiser'], ['account_clerk', 'Account Clerk']]) {
            await expect(masterItem(page, 'role', id)).toContainText(title);
        }

        await page.getByRole('button', {name: 'Add role'}).click();
        const role = detail(page, 'role');
        await role.getByRole('textbox', {name: 'ID'}).fill('new_role');
        await role.getByRole('textbox', {name: 'Title'}).fill('New role');
        // the role detail saves its changes to the model when another role is selected (as the Ranorex test did)
        await masterItem(page, 'role', 'client').click();
        await expect(masterItem(page, 'role', 'new_role')).toContainText('New role');
        let roles = petriflowElements(await exportModel(page), 'role').map(r => petriflowText(r, 'id')).sort();
        expect(roles).toEqual(['account_clerk', 'client', 'loan_officer', 'new_role', 'property_appraiser']);

        await (await rowButton(masterItem(page, 'role', 'new_role'), 'delete')).click();
        await confirmDelete(page);
        roles = petriflowElements(await exportModel(page), 'role').map(r => petriflowText(r, 'id')).sort();
        expect(roles).toEqual(['account_clerk', 'client', 'loan_officer', 'property_appraiser']);
    });

    test('Load_net the data variables of the loaded mortgage', async ({page}) => {
        await newProcess(page);
        await importModel(page, 'mortgage_demo.xml');
        await builderButton(page, 'mode_data').click();
        const variable = detail(page, 'data');

        /** selects the data variable in the master list (it can be on another page of the list) */
        async function select(id: string) {
            const item = masterItem(page, 'data', id).filter({has: page.getByText(id, {exact: true})}).first();
            const next = page.locator('nc-builder-data-mode').getByRole('button', {name: 'Next page'});
            while (!await item.isVisible() && await next.isEnabled()) {
                await next.click();
            }
            await item.click();
            await expect(variable.getByRole('textbox', {name: 'ID'})).toHaveValue(id);
        }

        await select('personal_information');
        await expect(variable.getByRole('combobox', {name: 'Type'})).toHaveText('Task ref');
        await select('account_number');
        await expect(variable.getByRole('combobox', {name: 'Type'})).toHaveText('Text');
        // <desc> of the model (the Ranorex test called it the placeholder)
        await expect(variable.getByRole('textbox', {name: 'Description'})).toHaveValue('Please enter your account number');
        await select('appraisal');
        await expect(variable.getByRole('combobox', {name: 'Type'})).toHaveText('File');
        await select('appraised_value');
        await expect(variable.getByRole('combobox', {name: 'Type'})).toHaveText('Number');
        await select('insurance');
        await expect(variable.getByRole('combobox', {name: 'Type'})).toHaveText('Enumeration');
    });
});

test.describe('Builder actions (NAB)', () => {

    // Monaco cancels its pending suggestions when an editor is closed (e.g. the switch to the Get tab) and logs it
    test.use({knownConsoleErrors: [/^Canceled\b/]});

    test.beforeEach(async ({page}) => newProcess(page));

    /**
     * Adds an action of the event phase ("Add action" buttons of the actions mode in the order of the page) and types
     * its code into the new (empty) Monaco editor.
     */
    async function addAction(page: Page, button: number, code: string) {
        const actions = detail(page, 'actions');
        await actions.getByRole('button', {name: 'Add action'}).nth(button).click();
        const editors = actions.locator('.monaco-editor');
        // Monaco is created asynchronously after the action panel
        const emptyEditor = () => editors.evaluateAll(all => all.findIndex(editor =>
            editor.getBoundingClientRect().height > 0 && !(editor.querySelector('.view-lines')?.textContent ?? '').trim()));
        await expect.poll(emptyEditor, {message: 'a new empty action editor'}).toBeGreaterThanOrEqual(0);
        const empty = await emptyEditor();
        await editors.nth(empty).click();
        await page.keyboard.type(code);
        await expect(editors.nth(empty).locator('.view-lines')).toContainText(code);
    }

    /** the code of the actions of the event and phase of a data variable or a transition (in the exported XML) */
    function actionCodes(element: string, event: string, phase: 'pre' | 'post'): Array<string> {
        const xmlEvent = petriflowElements(element, 'event').find(e => e.includes(`type="${event}"`)) ?? '';
        const actions = petriflowElements(xmlEvent, 'actions').find(a => a.includes(`phase="${phase}"`)) ?? '';
        return petriflowElements(actions, 'action').map(action => action.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').trim());
    }

    test('Action_view1 the set and get actions of a data variable', async ({page}) => {
        await builderButton(page, 'mode_data').click();
        await page.getByRole('button', {name: 'Add data variable'}).click();
        await builderButton(page, 'mode_actions').click();
        await builderButton(page, 'tool_data').click();
        await detail(page, 'actions').locator('mat-list-item').filter({hasText: 'data1'}).first().click();

        // Set tab: pre and post
        await addAction(page, 0, 'data_set_pre_1');
        await addAction(page, 0, 'data_set_pre_2');
        await addAction(page, 1, 'data_set_post_1');
        // Get tab: pre
        await detail(page, 'actions').getByRole('tab', {name: /^Get/}).click();
        await addAction(page, 0, 'data_get_pre_1');

        const data = petriflowElement(await exportModel(page), 'data', 'data1');
        expect(actionCodes(data, 'set', 'pre')).toEqual(['data_set_pre_1', 'data_set_pre_2']);
        expect(actionCodes(data, 'set', 'post')).toEqual(['data_set_post_1']);
        expect(actionCodes(data, 'get', 'pre')).toEqual(['data_get_pre_1']);
        expect(actionCodes(data, 'get', 'post')).toEqual([]);
    });

    test('Action_view2 the actions of the task events of a transition', async ({page}) => {
        await draw(page, 'tool_CreateTransitionTool', 700, 520);
        await builderButton(page, 'mode_actions').click();
        await builderButton(page, 'tool_transition').click();
        await detail(page, 'actions').locator('mat-list-item').filter({hasText: 't1'}).first().click();

        // the Add action buttons: assign pre, assign post, finish pre, finish post, cancel..., delegate...
        await addAction(page, 0, 'assign_pre');
        await addAction(page, 1, 'assign_post');
        await addAction(page, 3, 'finish_post');

        const transition = petriflowElement(await exportModel(page), 'transition', 't1');
        expect(actionCodes(transition, 'assign', 'pre')).toEqual(['assign_pre']);
        expect(actionCodes(transition, 'assign', 'post')).toEqual(['assign_post']);
        expect(actionCodes(transition, 'finish', 'pre')).toEqual([]);
        expect(actionCodes(transition, 'finish', 'post')).toEqual(['finish_post']);
    });

    test('Action_view3 the actions of the role events and of the process upload', async ({page}) => {
        await builderButton(page, 'mode_roles').click();
        await page.getByRole('button', {name: 'Add role'}).click();
        await builderButton(page, 'mode_actions').click();
        const actions = detail(page, 'actions');

        await builderButton(page, 'tool_role').click();
        await actions.locator('mat-list-item').filter({hasText: 'role1'}).first().click();
        await addAction(page, 0, 'roles_assign_pre_1');
        await addAction(page, 1, 'roles_assign_post_1');
        await actions.getByRole('tab', {name: /^Cancel/}).click();
        await addAction(page, 0, 'roles_cancel_pre_1');

        await builderButton(page, 'tool_process').click();
        await actions.locator('mat-list-item').filter({hasText: /^\s*Process\s*$/}).first().click();
        await addAction(page, 0, 'process_upload_pre_1');

        const xml = await exportModel(page);
        const role = petriflowElement(xml, 'role', 'role1');
        expect(actionCodes(role, 'assign', 'pre')).toEqual(['roles_assign_pre_1']);
        expect(actionCodes(role, 'assign', 'post')).toEqual(['roles_assign_post_1']);
        expect(actionCodes(role, 'cancel', 'pre')).toEqual(['roles_cancel_pre_1']);
        expect(actionCodes(petriflowElements(xml, 'processEvents')[0] ?? '', 'upload', 'pre')).toEqual(['process_upload_pre_1']);
    });

    test('Action_view3 the actions of the case events create and delete', async ({page}) => {
        // fails: the actions of the case events are mixed up, the create action ended in the delete event or the
        // delete action was not saved at all (the role and process events are right)
        test.fail();
        await builderButton(page, 'mode_actions').click();
        const actions = detail(page, 'actions');
        await builderButton(page, 'tool_process').click();
        await actions.locator('mat-list-item').filter({hasText: /^\s*Case\s*$/}).first().click();
        await addAction(page, 0, 'case_create_pre_1');
        await actions.getByRole('tab', {name: /^Delete/}).click();
        await addAction(page, 1, 'case_delete_post_1');

        const caseEvents = petriflowElements(await exportModel(page), 'caseEvents')[0] ?? '';
        expect(actionCodes(caseEvents, 'create', 'pre')).toEqual(['case_create_pre_1']);
        expect(actionCodes(caseEvents, 'delete', 'post')).toEqual(['case_delete_post_1']);
    });
});

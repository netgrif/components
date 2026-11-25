import * as fs from 'fs';
import * as path from 'path';
import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {petriflowElements, petriflowText} from '../fixtures/petriflow';
import {builderButton, canvasElement, exportModel, importModel, MODELS, newProcess, openedDialog} from '../fixtures/builder';
import {assignTask, createCase, expandTask, finishTask, openCase, openProcesses, processRow, runVersion, setProcessRoles, taskHeader} from '../fixtures/engine';

/** a point of the canvas of the builder: a grid of the columns and rows from the top left corner of the canvas */
async function canvasPoint(page: Page, column: number, row: number, grid: {x: number, y: number, left: number, top: number}) {
    const canvas = (await page.locator('nc-builder-edit-mode').boundingBox())!;
    return {x: canvas.x + grid.left + column * grid.x, y: canvas.y + grid.top + row * grid.y};
}

/** draws the places or transitions at the points of the grid, in the order of their ids */
async function drawAll(page: Page, tool: string, points: Array<[number, number]>, grid: {x: number, y: number, left: number, top: number}) {
    await builderButton(page, tool).click();
    for (const [column, row] of points) {
        const point = await canvasPoint(page, column, row, grid);
        await page.mouse.click(point.x, point.y);
    }
}

/** draws the arcs ("p1>t2") with the tool */
async function drawArcs(page: Page, tool: string, arcs: Array<string>) {
    await builderButton(page, tool).click();
    for (const arc of arcs) {
        const [from, to] = arc.split('>').map(id => `${id.startsWith('p') ? 'place' : 'transition'}_${id}`);
        await canvasElement(page, from).click({force: true});
        await canvasElement(page, to).click({force: true});
    }
}

/** opens the edit dialog of a place or a transition from its context menu */
async function editElement(page: Page, id: string): Promise<Locator> {
    await builderButton(page, 'tool_SelectTool').click();
    await canvasElement(page, id).click({force: true, button: 'right'});
    await page.getByRole('menuitem', {name: /Edit/}).first().click();
    return openedDialog(page, id.startsWith('place') ? 'Edit place' : 'Edit task');
}

/**
 * The label (and the roles that perform the task) of a transition. The permissions are set from the context menu of
 * the transition: the Permissions button of the edit dialog changes a copy of the transition that is not saved (the
 * test "Permissions of the Edit task dialog" in builder-modes.spec.ts).
 */
async function editTransition(page: Page, id: string, label: string, perform: Array<string> = []) {
    const dialog = await editElement(page, `transition_${id}`);
    await dialog.getByRole('textbox', {name: 'Label'}).fill(label);
    await dialog.getByRole('button', {name: 'Save'}).click();
    await expect(dialog).toBeHidden();
    if (perform.length > 0) {
        await canvasElement(page, `transition_${id}`).click({force: true, button: 'right'});
        await page.getByRole('menuitem', {name: /Permissions/}).click();
        const permissions = page.getByRole('dialog', {name: 'Task permissions'});
        for (const role of perform) {
            // the columns: ID, Perform, Delegate, Cancel, Assign, View (a checked box changes the name of the row)
            await permissions.getByRole('row').filter({has: page.getByRole('cell', {name: role, exact: true})})
                .getByRole('checkbox').first().check();
        }
        await permissions.getByRole('button', {name: 'Close'}).click();
        await expect(permissions).toBeHidden();
    }
}

async function editPlace(page: Page, id: string, label: string, tokens?: number) {
    const dialog = await editElement(page, `place_${id}`);
    await dialog.getByRole('textbox', {name: 'Label'}).fill(label);
    if (tokens !== undefined) {
        const field = dialog.getByRole('spinbutton', {name: 'Tokens'});
        await expect(field).toHaveValue(/^\d+$/);
        await field.fill(String(tokens));
    }
    await dialog.getByRole('button', {name: 'Save'}).click();
    await expect(dialog).toBeHidden();
}

/** the metadata of the model (the context menu of the empty canvas) */
async function editModel(page: Page, values: Record<string, string>) {
    await builderButton(page, 'mode_modeler').click();
    await builderButton(page, 'tool_SelectTool').click();
    const canvas = (await page.locator('nc-builder-edit-mode').boundingBox())!;
    await page.mouse.click(canvas.x + canvas.width - 30, canvas.y + canvas.height - 30, {button: 'right'});
    await page.getByRole('menuitem', {name: /Edit model/}).click();
    const model = await openedDialog(page, 'Edit model');
    for (const [field, value] of Object.entries(values)) {
        await model.getByRole('textbox', {name: field, exact: true}).fill(value);
    }
    await model.getByRole('button', {name: 'Save'}).click();
    await expect(model).toBeHidden();
}

/** the form of a transition (the form builder opened by a double click) */
async function openForm(page: Page, id: string) {
    await builderButton(page, 'mode_modeler').click();
    await builderButton(page, 'tool_SelectTool').click();
    await canvasElement(page, `transition_${id}`).dblclick({force: true});
    await expect(page.getByRole('heading', {name: 'Data fields'})).toBeVisible();
}

/**
 * Adds a new field to the form (a click on the component of the type) and sets its properties, the new field is
 * selected after it is added.
 */
async function addNewField(page: Page, type: string, component: string, properties: FieldProperties) {
    const types = page.getByRole('region', {name: 'Create new fields'});
    if (!await types.isVisible()) {
        await page.getByRole('button', {name: 'Create new fields'}).click();
    }
    const typeButton = types.getByRole('button', {name: type, exact: true});
    if (await typeButton.getAttribute('aria-expanded') !== 'true') {
        await typeButton.click();
    }
    await types.getByRole('region', {name: type, exact: true}).getByText(component, {exact: true}).click();
    await setFieldProperties(page, properties);
}

/** adds an existing data variable to the form ("[id]" in the list of the existing fields) */
async function addExistingField(page: Page, id: string, properties: FieldProperties) {
    const existing = page.getByRole('region', {name: 'Existing fields'});
    if (!await existing.isVisible()) {
        await page.getByRole('button', {name: 'Existing fields'}).click();
    }
    await existing.locator('mat-list-item').filter({hasText: `[${id}]`}).click();
    await expect(page.locator('nc-builder').getByRole('banner').getByText(id, {exact: true}).first()).toBeVisible();
    await setFieldProperties(page, properties);
}

interface FieldProperties {
    title?: string;
    behavior?: 'Editable' | 'Visible' | 'Hidden';
    required?: boolean;
}

/** the properties of the selected field of the form */
async function setFieldProperties(page: Page, properties: FieldProperties) {
    if (properties.title !== undefined) {
        const title = page.getByRole('textbox', {name: 'Title', exact: true});
        await title.fill(properties.title);
        await title.blur();
    }
    if (properties.behavior) {
        const behavior = page.getByRole('combobox', {name: 'Behavior'});
        if ((await behavior.textContent())?.trim() !== properties.behavior) {
            await behavior.click();
            await page.getByRole('option', {name: properties.behavior, exact: true}).click();
            await expect(behavior).toHaveText(properties.behavior);
        }
    }
    if (properties.required) {
        await page.getByRole('switch', {name: 'Required'}).check();
    }
}

async function closeForm(page: Page) {
    await page.getByRole('button', {name: 'Back'}).click();
    await expect(builderButton(page, 'tool_SelectTool')).toBeVisible();
}

/** adds a role in the roles mode with its id and title */
async function addRoles(page: Page, roles: Array<[string, string]>) {
    await builderButton(page, 'mode_roles').click();
    const detail = page.locator('nc-builder-role-mode');
    for (const [id, title] of roles) {
        await page.getByRole('button', {name: 'Add role'}).click();
        await detail.getByRole('textbox', {name: 'ID'}).fill(id);
        await detail.getByRole('textbox', {name: 'Title'}).fill(title);
        await detail.getByRole('textbox', {name: 'Title'}).blur();
    }
    // the role detail saves its changes to the model when another role is selected
    await page.locator('nc-builder-role-master-item').filter({hasText: roles[0][0]}).click();
    for (const [id, title] of roles) {
        await expect(page.locator('nc-builder-role-master-item').filter({hasText: id})).toContainText(title);
    }
}

/** renames a data variable in the data mode (the refactoring renames its references too) */
async function renameData(page: Page, id: string, newId: string) {
    await builderButton(page, 'mode_data').click();
    await page.locator('nc-builder-data-master-item').filter({hasText: id}).first().click();
    const detail = page.locator('nc-builder-data-mode');
    await detail.getByRole('textbox', {name: 'ID'}).locator('xpath=ancestor::mat-form-field//button').click();
    const rename = page.getByRole('dialog', {name: 'Rename ID'});
    await rename.getByRole('textbox', {name: 'New ID'}).fill(newId);
    await rename.getByRole('button', {name: 'Rename'}).click();
    await expect(rename).toBeHidden();
    await expect(detail.getByRole('textbox', {name: 'ID'})).toHaveValue(newId);
}

/**
 * Adds an action to the event of the transition in the actions mode (the "Add action" buttons: assign pre / post,
 * finish pre / post...) and writes its code into the new Monaco editor. The code is inserted at once (as a paste),
 * typing would add the closing brackets of Monaco to the code.
 */
async function addTransitionAction(page: Page, transition: string, button: number, code: string) {
    await builderButton(page, 'mode_actions').click();
    await builderButton(page, 'tool_transition').click();
    const actions = page.locator('nc-builder-actions-mode');
    // the item shows the label and the id of the transition
    await actions.locator('mat-list-item').filter({has: page.getByText(transition, {exact: true})}).first().click();
    await actions.getByRole('button', {name: 'Add action'}).nth(button).click();
    const editors = actions.locator('.monaco-editor');
    const emptyEditor = () => editors.evaluateAll(all => all.findIndex(editor =>
        editor.getBoundingClientRect().height > 0 && !(editor.querySelector('.view-lines')?.textContent ?? '').trim()));
    await expect.poll(emptyEditor, {message: 'a new empty action editor'}).toBeGreaterThanOrEqual(0);
    const empty = await emptyEditor();
    await editors.nth(empty).click();
    await page.keyboard.insertText(code);
    await expect(editors.nth(empty).locator('.view-lines')).toContainText(code.split('\n')[0].trim());
}

/** the content of a model to compare: the elements with the values the test sets, without the positions */
function generalContent(xml: string) {
    const text = (element: string, tag: string) => petriflowText(element, tag) ?? '';
    const code = (action: string) => action.replace(/<!\[CDATA\[|\]\]>|<[^>]*>/g, '').replace(/\s+/g, '');
    const events = (element: string) => petriflowElements(element, 'event').flatMap(event =>
        petriflowElements(event, 'actions').flatMap(actions => petriflowElements(actions, 'action').map(action =>
            `${event.match(/type="(\w+)"/)?.[1]}:${actions.match(/phase="(\w+)"/)?.[1]}:${code(action)}`)));
    return {
        roles: petriflowElements(xml, 'role').map(role => `${text(role, 'id')}:${text(role, 'title')}`).sort(),
        data: petriflowElements(xml, 'data').map(data =>
            `${text(data, 'id')}:${data.match(/type="(\w+)"/)?.[1]}:${text(data, 'title')}`).sort(),
        transitions: petriflowElements(xml, 'transition').map(transition => ({
            id: text(transition, 'id'),
            label: text(transition, 'label'),
            perform: petriflowElements(transition, 'roleRef').filter(ref => text(ref, 'perform') === 'true').map(ref => text(ref, 'id')).sort(),
            dataRefs: petriflowElements(transition, 'dataRef').map(ref => [text(ref, 'id'),
                ...[...ref.matchAll(/<behavior>(\w+)<\/behavior>/g)].map(m => m[1]), text(petriflowElements(ref, 'component')[0] ?? '', 'name')]
                .filter(Boolean).join(':')).sort(),
            actions: events(transition).sort(),
        })).sort((a, b) => a.id.localeCompare(b.id)),
        places: petriflowElements(xml, 'place').map(place => `${text(place, 'id')}:${text(place, 'label')}:${text(place, 'tokens')}`).sort(),
        arcs: petriflowElements(xml, 'arc').map(arc => `${text(arc, 'sourceId')}>${text(arc, 'destinationId')}:${text(arc, 'type')}:${text(arc, 'multiplicity')}`).sort(),
    };
}

/** deploys the process opened in the builder (the Deploy task of the builder), it waits until the engine deployed it */
async function deployOpenedProcess(page: Page, version: string) {
    await editModel(page, {Version: version});
    await builderButton(page, 'mode_task').click();
    await page.locator('nc-builder').getByRole('button', {name: /^Deploy/}).click();
    const deploy = page.getByRole('region', {name: /^Deploy/});
    await expect(deploy.getByRole('textbox', {name: 'Version'})).toHaveValue(version);
    await deploy.getByRole('button', {name: 'Deploy', exact: true}).click();
    const deployed = processRow(page, new RegExp(` ${version.replace(/\./g, '\\.')} Deployed$`));
    await expect(async () => {
        await openProcesses(page);
        await expect(deployed).toBeVisible({timeout: 3000});
    }).toPass({timeout: 90_000});
}

test.describe('NAB scenarios', () => {

    // Monaco cancels its pending suggestions when an editor is closed and logs it
    test.use({knownConsoleErrors: [/^Canceled\b/], actionTimeout: 15_000});

    test('Generic_request the request process built in the builder is the model of the scenario and it runs on the engine', async ({page}) => {
        // fails without the fix of NAE-2509-opravy: the gridster of the form builder (OnPush) does not render a field
        // added from the field list, remove test.fail() when the fix is merged
        test.fail();
        test.setTimeout(600_000);
        const GRID = {x: 80, y: 120, left: 60, top: 80};
        await newProcess(page);

        await test.step('roles', async () => {
            await addRoles(page, [['registration', 'Registration'], ['system', 'System'], ['user', 'User']]);
        });

        await test.step('the net', async () => {
            await builderButton(page, 'mode_modeler').click();
            // t1 Form, t2 Submit request, t3 Registration, t4 To legal, t5 Legal department, t6 Skip legal, t7 PR, t8 Status
            await drawAll(page, 'tool_CreateTransitionTool', [[1, 0], [1, 1], [3, 1], [5, 0], [7, 0], [5, 1], [9, 1], [3, 2]], GRID);
            await drawAll(page, 'tool_CreatePlaceTool', [[0, 1], [2, 1], [4, 1], [6, 0], [8, 1], [10, 1], [2, 2]], GRID);
            await drawArcs(page, 'tool_CreateRegularArcTool', ['p1>t2', 't2>p2', 'p2>t3', 't3>p3', 'p3>t4', 't4>p4', 'p4>t5',
                't5>p5', 'p3>t6', 't6>p5', 'p5>t7', 't7>p6', 't2>p7']);
            await drawArcs(page, 'tool_CreateReadArcTool', ['p7>t8']);
            await expect(canvasElement(page, 'arc_a14')).toBeAttached();

            await editPlace(page, 'p1', 'start', 1);
            await editPlace(page, 'p2', 'submitted');
            for (const [id, label, perform] of [['t1', 'Form', ['system']], ['t2', 'Submit request', ['user']],
                ['t3', 'Registration', ['registration']], ['t4', 'To legal', ['system']], ['t5', 'Legal department', []],
                ['t6', 'Skip legal', ['system']], ['t7', 'PR', ['registration']], ['t8', 'Status', ['default']]] as Array<[string, string, Array<string>]>) {
                await editTransition(page, id, label, perform);
            }
        });

        await test.step('the forms', async () => {
            await openForm(page, 't1');
            await addNewField(page, 'Text', 'Simple', {title: 'Name'});
            await addNewField(page, 'Text', 'Simple', {title: 'Surname'});
            await addNewField(page, 'Text', 'Simple', {title: 'Email', required: true});
            await addNewField(page, 'Text', 'Simple', {title: 'Phone'});
            await addNewField(page, 'Text', 'Area', {title: 'Text of request'});
            await expect(page.locator('gridster gridster-item')).toHaveCount(5);
            await closeForm(page);

            await openForm(page, 't2');
            await addNewField(page, 'Task ref', 'Simple', {});
            await closeForm(page);

            await openForm(page, 't3');
            await addNewField(page, 'Boolean', 'Slide', {title: 'Go to legal - NO/YES?'});
            await addExistingField(page, 'taskRef_0', {behavior: 'Visible'});
            await closeForm(page);

            await openForm(page, 't8');
            await addNewField(page, 'Text', 'Simple', {title: 'Status'});
            await addExistingField(page, 'taskRef_0', {});
            await closeForm(page);

            await openForm(page, 't7');
            await addNewField(page, 'Text', 'Simple', {title: 'Answer of the registration', required: true});
            await addNewField(page, 'Text', 'Simple', {title: 'Answer of the department', behavior: 'Visible'});
            await addExistingField(page, 'taskRef_0', {behavior: 'Visible'});
            await closeForm(page);

            await renameData(page, 'boolean_0', 'decision');
        });

        await test.step('the actions', async () => {
            // finish pre = the third "Add action" button, finish post = the fourth one
            await addTransitionAction(page, 't2', 2, 'text_5: f.text_5;\ndef variable1 = "Request submitted.";\nchange text_5 value { variable1; }');
            await addTransitionAction(page, 't3', 2, 'text_5: f.text_5;\ndef variable2 = "Request registered.";\nchange text_5 value { variable2; }');
            await addTransitionAction(page, 't3', 3, 'decision: f.decision;\nif (decision.value == true) {\nasync.run{\nassignTask("t4")\nfinishTask("t4")\n}\n}else {\nasync.run{\nassignTask("t6")\nfinishTask("t6")\n}\n}');
            await addTransitionAction(page, 't7', 2, 't8: t.t8,\ntext_6: f.text_6,\ntext_5: f.text_5;\ndef variable3 = "Request finished.";\nchange text_5 value { variable3; }\nmake text_6, visible on t8 when { true }');
        });

        await test.step('the exported model is the model of the scenario', async () => {
            const exported = await exportModel(page);
            const expected = fs.readFileSync(path.join(MODELS, 'generic_request.xml'), 'utf8');
            expect(generalContent(exported)).toEqual(generalContent(expected));
        });

        const PROCESS = 'Generic request';
        const ROLES = ['Registration', 'System', 'User'];
        await test.step('deploy', async () => {
            // the action of PR makes the answer visible on Status, the model of the scenario does not have the answer
            // on Status ("Cannot get property 'behavior' on null object" on the finish of PR), it is added hidden
            await openForm(page, 't8');
            await addExistingField(page, 'text_6', {behavior: 'Hidden'});
            await closeForm(page);
            await editModel(page, {ID: 'e2e_generic_request', Title: PROCESS, Initials: 'GRQ'});
            await deployOpenedProcess(page, runVersion());
        });

        await setProcessRoles(page, PROCESS, ROLES, true);
        try {
            const title = `E2E_request_${Date.now()}`;
            await createCase(page, PROCESS, title);

            /** the value of the Status field in the task Status (enabled by the read arc after the request is submitted) */
            async function expectStatus(status: string) {
                // the case is opened again, the values of the open task are not reloaded after another task
                await openCase(page, title);
                const task = await expandTask(page, title, 'Status');
                await expect(task.getByRole('textbox', {name: 'Status'})).toHaveValue(status);
            }

            await test.step('the user submits the request', async () => {
                await finishTask(page, title, 'Submit request');
                await expectStatus('Request submitted.');
            });

            await test.step('the registration skips the legal department (the system finishes Skip legal)', async () => {
                const registration = await expandTask(page, title, 'Registration');
                await assignTask(registration);
                await finishTask(page, title, 'Registration', registration);
                // the action runs asynchronously after the finish, the case is opened again until its task PR is there
                await expect(async () => {
                    await openCase(page, title);
                    await expect(taskHeader(page, title, 'PR')).toBeVisible({timeout: 3000});
                }, `the tasks of the case: ${await page.getByRole('button', {name: new RegExp(`^${title} `)}).allTextContents()}`)
                    .toPass({timeout: 30_000});
                await expect(taskHeader(page, title, 'To legal')).toHaveCount(0);
                await expectStatus('Request registered.');
            });

            await test.step('the PR answers the request', async () => {
                const pr = await expandTask(page, title, 'PR');
                await assignTask(pr);
                await pr.getByRole('textbox', {name: 'Answer of the registration'}).fill('The request is accepted');
                await finishTask(page, title, 'PR', pr);
                await expectStatus('Request finished.');
                // the answer is visible on Status after PR (the action of PR)
                await expect((await expandTask(page, title, 'Status')).getByRole('textbox', {name: 'Answer of the registration'}))
                    .toHaveValue('The request is accepted');
            });
        } finally {
            await setProcessRoles(page, PROCESS, ROLES, false);
        }
    });

    test('Create_mortgage_net the mortgage net drawn in the builder keeps its labels and arcs after the export and import', async ({page}, testInfo) => {
        test.setTimeout(600_000);
        const GRID = {x: 60, y: 85, left: 40, top: 50};
        const LABELS: Record<string, string> = {
            p1: 'IN', t1: 'Constructor/System', t2: 'Apply for mortgage/Client', t3: 'Case info/Loan officer',
            t4: 'Approve/Loan officer', t5: 'Appraisal report', t6: 'Reject/Loan officer', t7: 'Status/Client',
            t8: 'Reject/System', t9: 'Delete/Client', t10: 'Approve/System', t11: 'Sign loan contract/Client',
            t12: 'Confirm lien inscription/Loan officer', t13: 'Sign insurance contract/Client', t14: 'Send money/Account clerk',
            p15: 'OUT',
        };
        const ARCS = ['p1>t1', 't1>p2', 'p2>t2', 't2>p3', 't2>p4', 't2>p7', 'p4>t4', 'p4>t6', 't4>p5', 'p5>t5', 't5>p6',
            'p6>t8', 't8>p8', 't6>p8', 'p8>t9', 'p7>t9', 't9>p9',
            'p6>t10', 't10>p10', 'p10>t11', 't11>p12', 't11>p11', 'p12>t12', 'p11>t13', 't12>p13', 't13>p14', 'p13>t14', 'p14>t14', 't14>p15'];
        const READ_ARCS = ['p3>t3', 'p7>t7'];
        await newProcess(page);

        await test.step('the net', async () => {
            await builderButton(page, 'mode_modeler').click();
            await drawAll(page, 'tool_CreatePlaceTool', [[0, 0], [0, 1], [2, 0], [2, 1], [4, 1], [6, 1], [2, 4], [8, 3], [10, 4],
                [8, 1], [10, 2], [10, 0], [12, 0], [12, 2], [14, 1]], GRID);
            await drawAll(page, 'tool_CreateTransitionTool', [[1, 0], [1, 1], [3, 0], [3, 1], [5, 1], [3, 3], [3, 5], [7, 2], [9, 4],
                [7, 1], [9, 1], [11, 0], [11, 2], [13, 1]], GRID);
            await drawArcs(page, 'tool_CreateRegularArcTool', ARCS);
            await drawArcs(page, 'tool_CreateReadArcTool', READ_ARCS);
            await expect(canvasElement(page, `arc_a${ARCS.length + READ_ARCS.length}`)).toBeAttached();
            for (const [id, label] of Object.entries(LABELS)) {
                if (id.startsWith('p')) {
                    await editPlace(page, id, label);
                } else {
                    await editTransition(page, id, label);
                }
            }
        });

        /** the labels and the arcs of the model */
        const net = (xml: string) => ({
            labels: Object.fromEntries([...petriflowElements(xml, 'place'), ...petriflowElements(xml, 'transition')]
                .filter(element => petriflowText(element, 'label'))
                .map(element => [petriflowText(element, 'id'), petriflowText(element, 'label')])),
            arcs: petriflowElements(xml, 'arc').map(arc =>
                `${petriflowText(arc, 'sourceId')}>${petriflowText(arc, 'destinationId')}:${petriflowText(arc, 'type')}`).sort(),
        });
        const expected = {
            labels: LABELS,
            arcs: [...ARCS.map(arc => `${arc}:regular`), ...READ_ARCS.map(arc => `${arc}:read`)].sort(),
        };

        const exported = await exportModel(page);
        expect(net(exported)).toEqual(expected);
        expect(petriflowElements(exported, 'place')).toHaveLength(15);
        expect(petriflowElements(exported, 'transition')).toHaveLength(14);

        await test.step('the saved net imported again', async () => {
            const file = testInfo.outputPath('mortgage_net.xml');
            fs.writeFileSync(file, exported);
            await newProcess(page);
            await importModel(page, file);
            const canvas = page.locator('nc-builder-edit-mode');
            for (const label of Object.values(LABELS)) {
                await expect(canvas.getByText(label, {exact: true})).toBeAttached();
            }
            expect(net(await exportModel(page))).toEqual(expected);
        });
    });
});

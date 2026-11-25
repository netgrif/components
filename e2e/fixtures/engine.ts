import * as path from 'path';
import {Browser, Locator, Page} from '@playwright/test';
import {expect, test} from './playground';
import {ADMIN, FRONTEND_AUTH, openRoleAssignment, processRoles, UserRef} from './frontend';
import {builderButton, MODELS, openedDialog} from './builder';

/**
 * Processes on the engine of netgrif-frontend. A process is uploaded by the process view: a new process opens
 * the builder, the Petriflow model is imported there and the Deploy task of the process deploys it.
 */

/** the process view with the list of the processes (cases of the builder's "process" net) */
export async function openProcesses(page: Page) {
    await page.goto('/processes');
    await expect(page.getByRole('button', {name: 'New process', exact: true})).toBeVisible();
}

/** the row of the process list with the title, identifier, version and state ("All components all_data 1.0.0 Deployed") */
export function processRow(page: Page, text: RegExp) {
    return page.getByRole('tabpanel', {name: 'Processes'}).getByRole('button', {name: text});
}

/**
 * Imports the model of e2e/fixtures/petriflow into a new process of the builder, sets its version and opens its Deploy
 * task (expanding it assigns it). The Ranorex models have no version (the old workflow view added it on the upload),
 * the deploy needs one, so it is set in the metadata of the model.
 * @returns the Deploy task, its Deploy button deploys the process
 */
export async function prepareDeploy(page: Page, file: string, version: string): Promise<Locator> {
    await openProcesses(page);
    await page.getByRole('button', {name: 'New process', exact: true}).click();
    await builderButton(page, 'tool_import').click();
    await page.locator('input[type=file]').setInputFiles(path.join(MODELS, file));
    const result = page.getByRole('dialog', {name: 'Import result'});
    await result.or(builderButton(page, 'mode_modeler')).first().waitFor();
    if (await result.isVisible()) {
        await result.getByRole('button', {name: 'Close'}).click();
        await expect(result).toBeHidden();
    }

    // the version in the metadata of the model (the context menu of the empty canvas)
    await builderButton(page, 'mode_modeler').click();
    // an empty point of the canvas: a big model covers the corners with its places and arcs
    const empty = await page.locator('nc-builder-edit-mode').evaluate(canvas => {
        const box = canvas.getBoundingClientRect();
        for (let y = box.bottom - 30; y > box.top + 30; y -= 25) {
            for (let x = box.right - 30; x > box.left + 30; x -= 25) {
                const element = document.elementFromPoint(x, y);
                if (element && canvas.contains(element) && element instanceof SVGElement && !element.closest('[id^="svg_"]')) {
                    return {x, y};
                }
            }
        }
        return {x: box.right - 40, y: box.bottom - 40};
    });
    await page.mouse.click(empty.x, empty.y, {button: 'right'});
    await page.getByRole('menuitem', {name: /Edit model/}).click();
    const model = await openedDialog(page, 'Edit model');
    await model.getByRole('textbox', {name: 'Version'}).fill(version);
    await model.getByRole('button', {name: 'Save'}).click();
    await expect(model).toBeHidden();

    // the Deploy task of the process (the control task view of the builder)
    await builderButton(page, 'mode_task').click();
    await page.locator('nc-builder').getByRole('button', {name: /^Deploy/}).click();
    const deploy = page.getByRole('region', {name: /^Deploy/});
    await expect(deploy.getByRole('textbox', {name: 'Version'})).toHaveValue(version);
    return deploy;
}

/** uploads and deploys the model of e2e/fixtures/petriflow with the version, it waits until the engine deployed it */
export async function deployProcess(page: Page, file: string, version: string) {
    const deploy = await prepareDeploy(page, file, version);
    await deploy.getByRole('button', {name: 'Deploy', exact: true}).click();

    // the deploy runs on the engine (longer for a big model or parallel deploys), the list shows it when it is done
    const deployed = processRow(page, new RegExp(` ${version.replace(/\./g, '\\.')} Deployed$`));
    await expect(async () => {
        await openProcesses(page);
        await expect(deployed).toBeVisible({timeout: 3000});
    }).toPass({timeout: 90_000});
}

/**
 * A version that is higher than the versions deployed by the earlier runs (the engine keeps every deployed version),
 * the random patch keeps the versions of parallel workers apart.
 */
export function runVersion(): string {
    return `1.${Math.floor(Date.now() / 1000)}.${Math.floor(Math.random() * 100_000)}`;
}

/**
 * Deploys the model once for the tests of a spec file (in `test.beforeAll`): the browser of beforeAll does not get
 * the options of the project, the saved login and the base URL are given here.
 */
export async function deployForSpec(browser: Browser, file: string): Promise<void> {
    // the hook has the default timeout of a test, a deploy takes longer on a busy engine
    test.setTimeout(120_000);
    // the desktop width: the narrow process list (a spec with the viewport of a phone) hides the version of the process
    const context = await browser.newContext({
        storageState: FRONTEND_AUTH, baseURL: test.info().project.use.baseURL, viewport: {width: 1280, height: 720},
    });
    const page = await context.newPage();
    try {
        await deployProcess(page, file, runVersion());
    } finally {
        await context.close();
    }
}

/**
 * Creates a case of the newest version of the process in the case view, the frontend opens the tasks of the new case
 * then. A process with a default case name creates the case right after it is chosen (no title step), then the case
 * has that name and `caseTitle` is the expected default name. An action of the process can rename the case, `shownTitle`
 * is the title then.
 */
export async function createCase(page: Page, processTitle: string, caseTitle: string, shownTitle = caseTitle) {
    const dialog = page.getByRole('dialog', {name: 'New case'});
    const process = dialog.getByRole('button', {name: new RegExp(`^${processTitle} `)});
    // a process deployed right before the test is offered by the engine a moment later, the dialog is opened again
    await expect(async () => {
        await page.goto('/cases');
        await page.getByRole('button', {name: 'New case', exact: true}).click();
        await dialog.getByRole('textbox', {name: 'Search processes'}).fill(processTitle);
        await expect(process).toBeVisible({timeout: 3000});
    }).toPass({timeout: 30_000});
    await process.click();
    const title = dialog.getByRole('textbox', {name: 'Fill out case title'});
    await expect(title.or(page.getByRole('heading', {name: shownTitle, level: 1}))).toBeVisible();
    if (await title.isVisible()) {
        await title.fill(caseTitle);
        await dialog.getByRole('button', {name: 'Create'}).click();
    }
    await expect(dialog).toBeHidden();
    // an action of the process can set its own title (shownTitle)
    await expect(page.getByRole('heading', {name: shownTitle, level: 1})).toBeVisible();
}

/** the task panel of the opened case with the task title, expanded (the frontend assigns the task then) */
export async function openTask(page: Page, taskTitle: string) {
    const header = page.getByRole('button', {name: new RegExp(` ${taskTitle} `)}).first();
    await header.click();
    const task = page.getByRole('region', {name: new RegExp(` ${taskTitle} `)});
    await expect(task).toBeVisible();
    return task;
}

/** opens the newest case with the title from the case view (the list is sorted by the creation date, newest first) */
export async function openCase(page: Page, caseTitle: string) {
    await page.goto('/cases');
    await page.getByRole('button', {name: new RegExp(`^${caseTitle} `)}).first().click();
    await expect(page.getByRole('heading', {name: caseTitle, level: 1})).toBeVisible();
}

/** a big task form renders its data groups while it is scrolled, this scrolls until every group is rendered */
export async function renderWholeTask(task: Locator) {
    const loading = task.getByRole('progressbar');
    await expect(async () => {
        if (await loading.count() > 0) {
            await loading.first().scrollIntoViewIfNeeded({timeout: 1000}).catch(() => undefined);
        }
        await expect(loading).toHaveCount(0, {timeout: 1000});
    }).toPass({timeout: 60_000});
}

/** the task of the opened case with the title (its header is "<case title> <task title> <priority> ...") */
export function taskHeader(page: Page, caseTitle: string, taskTitle: string) {
    return page.getByRole('button', {name: new RegExp(`^${caseTitle} ${escapeRegExp(taskTitle)} `)});
}

/** expands the task of the opened case (an automatically assigned task can be expanded already) */
export async function expandTask(page: Page, caseTitle: string, taskTitle: string): Promise<Locator> {
    const header = taskHeader(page, caseTitle, taskTitle).first();
    await expect(header).toBeVisible();
    if (await header.getAttribute('aria-expanded') !== 'true') {
        await header.click();
    }
    const task = page.getByRole('region', {name: new RegExp(`^${caseTitle} ${escapeRegExp(taskTitle)} `)}).first();
    await expect(task).toBeVisible();
    return task;
}

/** assigns the expanded task when it is not assigned yet */
export async function assignTask(task: Locator) {
    const assign = task.getByRole('button', {name: 'Assign', exact: true});
    if (await assign.isVisible()) {
        await assign.click();
        await expect(task.getByRole('button', {name: 'Finish', exact: true})).toBeVisible();
    }
}

/** finishes the task of the opened case (assigned first), the task is not in the list of the case then */
export async function finishTask(page: Page, caseTitle: string, taskTitle: string, task?: Locator) {
    task = task ?? await expandTask(page, caseTitle, taskTitle);
    await assignTask(task);
    await task.getByRole('button', {name: 'Finish', exact: true}).click();
    await expect(taskHeader(page, caseTitle, taskTitle)).toHaveCount(0);
}

export function escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

/**
 * Assigns (or removes) the roles of the newest version of the process to the user (the logged administrator by
 * default) in the role assignment (Account menu), the change is saved at once.
 */
export async function setProcessRoles(page: Page, process: string, roles: Array<string>, assigned: boolean,
                                      user: UserRef = ADMIN) {
    await openRoleAssignment(page, user);
    const region = await processRoles(page, process);
    for (const role of roles) {
        const checkbox = region.getByRole('checkbox', {name: role, exact: true}).first();
        await expect(checkbox).toBeVisible();
        if (await checkbox.isChecked() !== assigned) {
            await checkbox.click();
            await expect(checkbox).toBeChecked({checked: assigned});
            await expect(page.getByText('Saving')).toBeHidden();
        }
    }
}

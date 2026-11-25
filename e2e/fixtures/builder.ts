import * as fs from 'fs';
import * as path from 'path';
import {Locator, Page, test} from '@playwright/test';
import {expect, openDemo} from './playground';

export const MODELS = path.join(__dirname, 'petriflow');

/**
 * A button of the builder toolbar by its id: the modes (`mode_data`, `mode_roles`, `mode_simulation`...) and the tools
 * (`tool_import`, `tool_export`, `tool_CreateTransitionTool`...). The buttons have no accessible name (only a tooltip),
 * the ids are stable (the Ranorex tests used them too).
 */
export function builderButton(page: Page, id: string) {
    return page.locator(`nc-builder button[id="${id}"]`);
}

/** an element of the model on the canvas by its id (`transition_t1`, `place_p1`, `arc_a1`) */
export function canvasElement(page: Page, id: string) {
    return page.locator(`[id="svg_${id}"]`);
}

/** chooses the tool and clicks on the canvas, the points are in the empty area of the new process */
export async function draw(page: Page, tool: string, x: number, y: number) {
    await builderButton(page, tool).click();
    await page.mouse.click(x, y);
}

/** an arc of the tool from the first element to the second one (the elements by their canvas id) */
export async function drawArc(page: Page, tool: string, from: string, to: string) {
    await builderButton(page, tool).click();
    await canvasElement(page, from).click({force: true});
    await canvasElement(page, to).click({force: true});
}

/**
 * A new process in the builder: in netgrif-frontend from the process view (Processes, New process), in the playground
 * from its builder demo.
 */
export async function newProcess(page: Page) {
    if (test.info().project.name === 'example') {
        await openDemo(page, '/views/builder');
    } else {
        await page.goto('/processes');
    }
    await page.getByRole('button', {name: 'New process', exact: true}).click();
    await expect(builderButton(page, 'tool_import')).toBeVisible();
}

export async function importModel(page: Page, file: string) {
    await builderButton(page, 'tool_import').click();
    await page.locator('input[type=file]').setInputFiles(path.isAbsolute(file) ? file : path.join(MODELS, file));
    // a model with warnings shows the import result, the NAB test closes it
    const result = page.getByRole('dialog').filter({hasText: 'Import result'});
    await result.or(page.getByRole('tab', {selected: true})).first().waitFor();
    if (await result.isVisible()) {
        await result.getByRole('button', {name: 'Close'}).click();
        await expect(result).toBeHidden();
    }
}

/**
 * Exports the model as XML and returns it. A model without a transition is "dead", the builder asks before the
 * download, the test downloads it anyway.
 */
export async function exportModel(page: Page): Promise<string> {
    const download = page.waitForEvent('download');
    await builderButton(page, 'tool_export').click();
    const dead = page.getByRole('dialog', {name: 'No executable task'});
    const downloaded = download.then(() => true);
    // the wait for the dialog ends (times out) after the download, it is not an error then
    if (!await Promise.race([downloaded, dead.waitFor().then(() => false, () => true)])) {
        await dead.getByRole('button', {name: 'Download'}).click();
    }
    return fs.readFileSync(await (await download).path(), 'utf8');
}

/** a button of the row of a master list, the buttons are shown on the selected (or hovered) row */
export async function rowButton(row: Locator, icon: string) {
    await row.click();
    return row.getByRole('button').filter({hasText: icon});
}

/**
 * A dialog of the builder after its open animation: Material moves the focus into the dialog (its first field) when the
 * animation ends, a value typed before that can end up in the focused field (the tokens "1" of p1 made the id "p11").
 */
export async function openedDialog(page: Page, name: string): Promise<Locator> {
    const dialog = page.getByRole('dialog', {name});
    await expect(dialog).toBeVisible();
    const container = page.locator('mat-dialog-container').filter({has: page.getByRole('heading', {name})});
    await expect(container).toHaveClass(/mdc-dialog--open/);
    await expect(container).not.toHaveClass(/mdc-dialog--opening/);
    await expect.poll(() => dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
    return dialog;
}

/** confirms the delete dialog of the builder ("Delete this item?") */
export async function confirmDelete(page: Page) {
    const dialog = page.getByRole('dialog', {name: 'Delete this item?'});
    await dialog.getByRole('button', {name: 'Delete'}).click();
    await expect(dialog).toBeHidden();
}

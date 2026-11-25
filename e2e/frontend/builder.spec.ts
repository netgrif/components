import * as fs from 'fs';
import * as path from 'path';
import {Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {petriflowContent, petriflowElement, petriflowText} from '../fixtures/petriflow';
import {builderButton, canvasElement, draw, drawArc, exportModel, importModel, MODELS, newProcess, openedDialog} from '../fixtures/builder';

test.describe('Builder import and export (NAB)', () => {

    test('TC-01 mortgage model exported with the same content', async ({page}) => {
        await newProcess(page);
        await importModel(page, 'mortgage.xml');
        await expect(page.getByRole('tab', {name: /Mortgage/})).toBeVisible();
        const exported = await exportModel(page);
        expect(petriflowContent(exported)).toEqual(petriflowContent(fs.readFileSync(path.join(MODELS, 'mortgage.xml'), 'utf8')));
    });

    test('Example_mortgage_drag_import_export the model dropped on the canvas is imported', async ({page}) => {
        await newProcess(page);
        const content = fs.readFileSync(path.join(MODELS, 'mortgage.xml'), 'utf8');
        // a file dragged from the desktop: the drop event with the file on the canvas
        await page.locator('nc-builder-edit-mode .outer').evaluate((zone, xml) => {
            const transfer = new DataTransfer();
            transfer.items.add(new File([xml], 'mortgage.xml', {type: 'text/xml'}));
            zone.dispatchEvent(new DragEvent('dragover', {dataTransfer: transfer, bubbles: true, cancelable: true}));
            zone.dispatchEvent(new DragEvent('drop', {dataTransfer: transfer, bubbles: true, cancelable: true}));
        }, content);
        await expect(page.getByRole('tab', {name: /Mortgage/})).toBeVisible();
        expect(petriflowContent(await exportModel(page))).toEqual(petriflowContent(content));
    });

    test.describe(() => {
        // the arc weights of the model are drawn with NaN coordinates (petriflow.svg), the model itself is imported well
        test.use({knownConsoleErrors: [/<text> attribute [xy]: Expected length, "NaN"/]});

        test('Import_export the import result lists the warnings of the model', async ({page}) => {
            await newProcess(page);
            await builderButton(page, 'tool_import').click();
            await page.locator('input[type=file]').setInputFiles(path.join(MODELS, 'petriflow_test.xml'));
            const result = page.getByRole('dialog', {name: 'Import result'});
            await expect(result.getByRole('heading', {name: 'Warnings:'})).toBeVisible();
            await expect(result.getByRole('heading', {name: 'Errors:'})).toBeHidden();
            await expect(result).toContainText('Data type "filter" is deprecated');
            await result.getByRole('button', {name: 'Close'}).click();
            await expect(result).toBeHidden();
        });

        test('TC-01 Petriflow test model (import result with warnings) exported with the same content', async ({page}) => {
            await newProcess(page);
            await importModel(page, 'petriflow_test.xml');
            const exported = await exportModel(page);
            expect(petriflowContent(exported)).toEqual(petriflowContent(fs.readFileSync(path.join(MODELS, 'petriflow_test.xml'), 'utf8')));
        });
    });
});

test.describe('Builder editor (NAB)', () => {

    test.beforeEach(async ({page}) => newProcess(page));

    test('Place_transition_edit a drawn transition, place and arc are in the exported model', async ({page}) => {
        await draw(page, 'tool_CreateTransitionTool', 700, 500);
        await expect(canvasElement(page, 'transition_t1')).toBeVisible();
        await draw(page, 'tool_CreatePlaceTool', 900, 500);
        await expect(canvasElement(page, 'place_p1')).toBeVisible();
        await drawArc(page, 'tool_CreateRegularArcTool', 'transition_t1', 'place_p1');
        await expect(canvasElement(page, 'arc_a1')).toBeAttached();

        const content = petriflowContent(await exportModel(page));
        expect(content.transition).toEqual(['t1']);
        expect(content.place).toEqual(['p1']);
        expect(content.arc).toEqual(['a1']);
    });

    test('History_undo_step undo and redo of the drawing', async ({page}) => {
        await draw(page, 'tool_CreateTransitionTool', 700, 500);
        await draw(page, 'tool_CreatePlaceTool', 900, 500);
        await expect(canvasElement(page, 'place_p1')).toBeVisible();

        await builderButton(page, 'tool_undo').click();
        await expect(canvasElement(page, 'place_p1')).toHaveCount(0);
        await expect(canvasElement(page, 'transition_t1')).toBeVisible();
        await builderButton(page, 'tool_undo').click();
        await expect(canvasElement(page, 'transition_t1')).toHaveCount(0);

        await builderButton(page, 'tool_redo').click();
        await expect(canvasElement(page, 'transition_t1')).toBeVisible();
        await expect(canvasElement(page, 'place_p1')).toHaveCount(0);
    });

    test('Import_export clearing the model asks first, then deletes everything', async ({page}) => {
        await draw(page, 'tool_CreateTransitionTool', 700, 500);
        await expect(canvasElement(page, 'transition_t1')).toBeVisible();

        await builderButton(page, 'tool_ClearModelTool').click();
        const confirm = page.getByRole('dialog', {name: 'Delete the model?'});
        await confirm.getByRole('button', {name: 'Cancel'}).click();
        await expect(canvasElement(page, 'transition_t1')).toBeVisible();

        await builderButton(page, 'tool_ClearModelTool').click();
        await confirm.getByRole('button', {name: 'Delete'}).click();
        await expect(confirm).toBeHidden();
        await expect(canvasElement(page, 'transition_t1')).toHaveCount(0);
    });

    /** opens the edit dialog of a canvas element from its context menu */
    async function editElement(page: Page, id: string, dialog: string) {
        await builderButton(page, 'tool_SelectTool').click();
        await canvasElement(page, id).click({force: true, button: 'right'});
        await page.getByRole('menuitem', {name: /Edit/}).click();
        return openedDialog(page, dialog);
    }

    test('Editor the multiplicity and the reference of an arc, the label and the tokens of a place', async ({page}) => {
        await draw(page, 'tool_CreatePlaceTool', 550, 500);
        await draw(page, 'tool_CreateTransitionTool', 800, 500);
        await drawArc(page, 'tool_CreateRegularArcTool', 'place_p1', 'transition_t1');
        await draw(page, 'tool_CreatePlaceTool', 550, 600);
        await draw(page, 'tool_CreateTransitionTool', 800, 600);
        await drawArc(page, 'tool_CreateRegularArcTool', 'place_p2', 'transition_t2');

        let dialog = await editElement(page, 'arc_a1', 'Edit arc');
        await dialog.getByRole('spinbutton', {name: 'Multiplicity'}).fill('3');
        await dialog.getByRole('button', {name: 'Save'}).click();
        await expect(dialog).toBeHidden();

        // the second arc takes its weight from the tokens of the place p1
        dialog = await editElement(page, 'arc_a2', 'Edit arc');
        await dialog.getByRole('combobox', {name: 'Reference'}).click();
        await page.getByRole('option', {name: /p1/}).click();
        await dialog.getByRole('button', {name: 'Save'}).click();
        await expect(dialog).toBeHidden();

        dialog = await editElement(page, 'place_p1', 'Edit place');
        await dialog.getByRole('textbox', {name: 'Label'}).fill('Start');
        await dialog.getByRole('spinbutton', {name: 'Tokens'}).fill('2');
        await dialog.getByRole('button', {name: 'Save'}).click();
        await expect(dialog).toBeHidden();

        const xml = await exportModel(page);
        expect(petriflowText(petriflowElement(xml, 'arc', 'a1'), 'multiplicity')).toBe('3');
        expect(petriflowText(petriflowElement(xml, 'arc', 'a2'), 'reference')).toBe('p1');
        const place = petriflowElement(xml, 'place', 'p1');
        expect(petriflowText(place, 'label')).toBe('Start');
        expect(petriflowText(place, 'tokens')).toBe('2');
    });

    test('Editor a place deleted from the context menu is deleted with its arc', async ({page}) => {
        await draw(page, 'tool_CreatePlaceTool', 550, 500);
        await draw(page, 'tool_CreateTransitionTool', 800, 500);
        await drawArc(page, 'tool_CreateRegularArcTool', 'place_p1', 'transition_t1');
        await builderButton(page, 'tool_SelectTool').click();
        await canvasElement(page, 'place_p1').click({force: true, button: 'right'});
        await page.getByRole('menuitem', {name: /Delete/}).click();
        await expect(canvasElement(page, 'place_p1')).toHaveCount(0);
        await expect(canvasElement(page, 'arc_a1')).toHaveCount(0);

        const content = petriflowContent(await exportModel(page));
        expect(content.place).toEqual([]);
        expect(content.arc).toEqual([]);
        expect(content.transition).toEqual(['t1']);
    });

    /** selects the elements in the rectangle with the select tool (a drag on the empty canvas) */
    async function selectArea(page: Page, from: {x: number, y: number}, to: {x: number, y: number}) {
        await builderButton(page, 'tool_SelectTool').click();
        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        await page.mouse.move(to.x, to.y, {steps: 10});
        await page.mouse.up();
    }

    /** the position of a place or a transition in the exported model */
    function position(xml: string, tag: string, id: string): string {
        const element = petriflowElement(xml, tag, id);
        return `${petriflowText(element, 'x')},${petriflowText(element, 'y')}`;
    }

    test('Select_drag_subnet a selected part of the net is moved, copied and deleted together', async ({page}) => {
        await draw(page, 'tool_CreatePlaceTool', 550, 520);
        await draw(page, 'tool_CreateTransitionTool', 700, 520);
        await draw(page, 'tool_CreatePlaceTool', 1000, 520);
        await drawArc(page, 'tool_CreateRegularArcTool', 'place_p1', 'transition_t1');
        const before = await exportModel(page);

        // p1 and t1 in the rectangle, p2 outside of it
        await selectArea(page, {x: 500, y: 470}, {x: 760, y: 580});
        await expect(canvasElement(page, 'place_p1')).toHaveClass(/svg-active-stroke/);
        await expect(canvasElement(page, 'transition_t1')).toHaveClass(/svg-active-stroke/);
        await expect(canvasElement(page, 'place_p2')).not.toHaveClass(/svg-active-stroke/);

        const place = (await canvasElement(page, 'place_p1').boundingBox())!;
        await page.mouse.move(place.x + place.width / 2, place.y + place.height / 2);
        await page.mouse.down();
        await page.mouse.move(place.x + place.width / 2 + 40, place.y + place.height / 2 + 60, {steps: 10});
        await page.mouse.up();
        const moved = await exportModel(page);
        expect(position(moved, 'place', 'p1')).not.toBe(position(before, 'place', 'p1'));
        expect(position(moved, 'transition', 't1')).not.toBe(position(before, 'transition', 't1'));
        expect(position(moved, 'place', 'p2')).toBe(position(before, 'place', 'p2'));

        // copy and paste of the selection: a new place, transition and arc
        await page.keyboard.press('Control+c');
        await page.keyboard.press('Control+v');
        await expect(canvasElement(page, 'arc_a2')).toBeAttached();
        const copied = petriflowContent(await exportModel(page));
        expect(copied.place).toHaveLength(3);
        expect(copied.transition).toHaveLength(2);
        expect(copied.arc).toHaveLength(2);

        // everything except p2 is deleted by the Delete key
        // the selection right after the paste and the export is sometimes not taken (flaky), it is repeated until the
        // copied elements are selected
        await expect(async () => {
            await selectArea(page, {x: 450, y: 470}, {x: 850, y: 700});
            for (const id of ['place_p1', 'transition_t1', 'place_p3', 'transition_t2']) {
                await expect(canvasElement(page, id)).toHaveClass(/svg-active-stroke/, {timeout: 1000});
            }
        }).toPass({timeout: 15_000});
        await page.keyboard.press('Delete');
        const rest = petriflowContent(await exportModel(page));
        expect(rest.place).toEqual(['p2']);
        expect(rest.transition).toEqual([]);
        expect(rest.arc).toEqual([]);
    });

    test('TC-13 Place_Data_ref_change the weights of the arcs are a data variable and the tokens of a place', async ({page}) => {
        // p1 -> t1 -> p3 weighted by the data variable (3), p2 -> t2 -> p4 by the tokens of p5 (4), t3 -> p5 adds tokens
        for (const [tool, x, y] of [
            ['tool_CreatePlaceTool', 450, 480], ['tool_CreatePlaceTool', 450, 580], ['tool_CreatePlaceTool', 750, 480],
            ['tool_CreatePlaceTool', 750, 580], ['tool_CreatePlaceTool', 1050, 580],
            ['tool_CreateTransitionTool', 600, 480], ['tool_CreateTransitionTool', 600, 580], ['tool_CreateTransitionTool', 900, 580],
        ] as Array<[string, number, number]>) {
            await draw(page, tool, x, y);
        }
        await drawArc(page, 'tool_CreateRegularArcTool', 'place_p1', 'transition_t1');
        await drawArc(page, 'tool_CreateRegularArcTool', 'transition_t1', 'place_p3');
        await drawArc(page, 'tool_CreateRegularArcTool', 'place_p2', 'transition_t2');
        await drawArc(page, 'tool_CreateRegularArcTool', 'transition_t2', 'place_p4');
        await drawArc(page, 'tool_CreateRegularArcTool', 'transition_t3', 'place_p5');

        // the data variable "data_ref" with 3
        await builderButton(page, 'mode_data').click();
        await page.getByRole('button', {name: 'Add data variable'}).click();
        const variable = page.locator('nc-builder-data-mode');
        await variable.getByRole('textbox', {name: 'Title'}).fill('data_ref');
        await variable.getByRole('combobox', {name: 'Type'}).click();
        await page.getByRole('option', {name: 'Number', exact: true}).click();
        await variable.getByRole('spinbutton', {name: 'Initial value'}).fill('3');
        await variable.getByRole('spinbutton', {name: 'Initial value'}).blur();
        await builderButton(page, 'mode_modeler').click();

        // the place "place_ref" with 4 tokens
        let dialog = await editElement(page, 'place_p5', 'Edit place');
        await dialog.getByRole('textbox', {name: 'Label'}).fill('place_ref');
        await expect(dialog.getByRole('spinbutton', {name: 'Tokens'})).toHaveValue(/^\d+$/);
        await dialog.getByRole('spinbutton', {name: 'Tokens'}).fill('4');
        await dialog.getByRole('button', {name: 'Save'}).click();
        await expect(dialog).toBeHidden();
        for (const place of ['p1', 'p2']) {
            dialog = await editElement(page, `place_${place}`, 'Edit place');
            const tokens = dialog.getByRole('spinbutton', {name: 'Tokens'});
            // the dialog fills its values after it is opened, the new value is written after that
            await expect(tokens).toHaveValue(/^\d+$/);
            await tokens.fill('100');
            await expect(tokens).toHaveValue('100');
            await dialog.getByRole('button', {name: 'Save'}).click();
            await expect(dialog).toBeHidden();
            await expect(page.locator(`[id="svg_place_marking_number_${place}"]`)).toHaveText('100');
        }
        for (const [arc, reference] of [['arc_a1', /data_ref/], ['arc_a2', /data_ref/], ['arc_a3', /place_ref/], ['arc_a4', /place_ref/]] as const) {
            dialog = await editElement(page, arc, 'Edit arc');
            await dialog.getByRole('combobox', {name: 'Reference'}).click();
            await page.getByRole('option', {name: reference}).click();
            await dialog.getByRole('button', {name: 'Save'}).click();
            await expect(dialog).toBeHidden();
        }

        const marking = (place: string) => page.locator(`[id="svg_place_marking_number_${place}"]`);
        const fire = async (transition: string, times: number) => {
            for (let i = 0; i < times; i++) {
                await canvasElement(page, `transition_${transition}`).click({force: true});
            }
        };
        await builderButton(page, 'mode_simulation').click();
        await fire('t1', 2);
        await fire('t2', 2);
        await expect(marking('p1')).toHaveText('94');
        await expect(marking('p2')).toHaveText('92');
        // two more tokens in p5: the arcs of t2 move 6 tokens now
        await fire('t3', 2);
        await fire('t2', 2);
        await expect(marking('p2')).toHaveText('80');
        await expect(marking('p4')).toHaveText('20');

        const xml = await exportModel(page);
        expect(petriflowText(petriflowElement(xml, 'arc', 'a1'), 'reference')).toBe('data1');
        expect(petriflowText(petriflowElement(xml, 'arc', 'a3'), 'reference')).toBe('p5');
    });

    test('Scroll_test the arrows move the canvas, the reset tool and another mode return it', async ({page}) => {
        await draw(page, 'tool_CreateTransitionTool', 700, 500);
        await builderButton(page, 'tool_SelectTool').click();
        const transition = canvasElement(page, 'transition_t1');
        const top = async () => (await transition.boundingBox())!.y;
        const start = await top();

        await test.step('the arrows move the canvas', async () => {
            for (let i = 0; i < 4; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await expect.poll(top).toBeLessThan(start - 20);
        });

        await test.step('the reset tool returns it', async () => {
            await builderButton(page, 'tool_ResetPositionAndZoomTool').click();
            await expect.poll(top).toBeCloseTo(start, 0);
        });

        await test.step('another mode and back returns it too', async () => {
            for (let i = 0; i < 4; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await expect.poll(top).toBeLessThan(start - 20);
            await builderButton(page, 'mode_roles').click();
            await builderButton(page, 'mode_modeler').click();
            await expect.poll(top).toBeCloseTo(start, 0);
        });
    });
});

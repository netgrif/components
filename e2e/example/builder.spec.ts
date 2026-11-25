import * as fs from 'fs';
import * as path from 'path';
import {expect, test} from '../fixtures/playground';
import {petriflowContent} from '../fixtures/petriflow';
import {canvasElement, draw, drawArc, exportModel, importModel, MODELS, newProcess} from '../fixtures/builder';

/**
 * A basic check of the builder in the playground (a local run after a change of the libraries). The NAB tests run on
 * netgrif-frontend (frontend/builder*.spec.ts).
 */
test.describe('Builder (basic)', () => {

    test.beforeEach(async ({page}) => newProcess(page));

    test('NC-E2E-003 an imported model is exported with the same content', async ({page}) => {
        await importModel(page, 'mortgage.xml');
        await expect(page.getByRole('tab', {name: /Mortgage/})).toBeVisible();
        const exported = await exportModel(page);
        expect(petriflowContent(exported)).toEqual(petriflowContent(fs.readFileSync(path.join(MODELS, 'mortgage.xml'), 'utf8')));
    });

    test('NC-E2E-004 a drawn transition, place and arc are in the exported model', async ({page}) => {
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
});

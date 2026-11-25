import {expect, test} from '../fixtures/playground';
import {deployProcess, processRow, runVersion} from '../fixtures/engine';

test.describe('Processes (NAE)', () => {

    test('NAE Load process a model imported in the builder is deployed', async ({page}) => {
        const version = runVersion();
        await deployProcess(page, 'all_data.xml', version);

        await expect(processRow(page, new RegExp(`^All Data all_data ${version.replace(/\./g, '\\.')} Deployed$`)))
            .toBeVisible();
    });
});

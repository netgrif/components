import {expect, test} from '../fixtures/playground';
import {createCase, deployProcess, finishTask, openCase, openProcesses, processRow, taskHeader} from '../fixtures/engine';

const PROCESS = 'E2E versions';

/**
 * A new version of a process (e2e_versions_1.xml, e2e_versions_2.xml: the same identifier, other task): the new cases are
 * created from the newest version, a case of the older version keeps its tasks and is finished as before.
 */
test.describe('Process versions (NAE)', () => {

    test('NC-E2E-009 Versions a new version creates the new cases, the case of the older version keeps working', async ({page}) => {
        test.setTimeout(300_000);
        const run = Math.floor(Date.now() / 1000);
        const first = `1.${run}.0`;
        const second = `1.${run}.1`;
        const older = `Older${run}`;
        const newer = `Newer${run}`;

        await deployProcess(page, 'e2e_versions_1.xml', first);
        await createCase(page, PROCESS, older);
        await expect(taskHeader(page, older, 'First version task')).toBeVisible();

        await deployProcess(page, 'e2e_versions_2.xml', second);
        await openProcesses(page);
        for (const version of [first, second]) {
            await expect(processRow(page, new RegExp(`^${PROCESS} e2e_versions ${version.replace(/\./g, '\\.')} Deployed$`))).toBeVisible();
        }

        // the new case is created from the newest version
        await createCase(page, PROCESS, newer);
        await expect(taskHeader(page, newer, 'Second version task')).toBeVisible();
        await expect(taskHeader(page, newer, 'First version task')).toHaveCount(0);

        // the case of the older version has the task of its version and is finished
        await openCase(page, older);
        await expect(taskHeader(page, older, 'Second version task')).toHaveCount(0);
        await finishTask(page, older, 'First version task');
    });
});

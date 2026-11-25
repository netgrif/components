import {expect, snackBar, test} from '../fixtures/playground';
import {createCase, deployProcess, prepareDeploy, processRow} from '../fixtures/engine';

test.describe('Actions (NAE)', () => {

    test.describe(() => {
        // the engine refuses the process: the browser logs the error response, the application logs it too
        test.use({knownConsoleErrors: [/status of 4\d\d|HttpErrorResponse|Duplicate action id/]});

        test('NAE-TC-021 ActionID_duplicity a process with two actions of the same id is not deployed', async ({page}) => {
            test.setTimeout(120_000);
            const version = `1.${Math.floor(Date.now() / 1000)}.0`;
            const deploy = await prepareDeploy(page, 'actions_same_id.xml', version);
            await deploy.getByRole('button', {name: 'Deploy', exact: true}).click();
            // the old workflow view said "Process file could not be uploaded.", the engine names the action now
            await expect(snackBar(page).filter({hasText: 'Duplicate action id'})).toContainText(
                'Duplicate action id, action with id [1] already exists in petri net with identifier [Actions_sameID]');
            await page.getByRole('tab', {name: 'Processes'}).click();
            const draft = new RegExp(`^Actions_sameID Actions_sameID ${version.replace(/\./g, '\\.')} Draft$`);
            await expect(processRow(page, draft)).toBeVisible();
        });
    });

    test('NAE-TC-021 ActionID_duplicity a new case runs the action of the newest version of the process', async ({page}) => {
        test.setTimeout(240_000);
        // two versions of the process "Actions", the set action of the Base field adds 15 (actions1) or 60 (actions2)
        const minor = Math.floor(Date.now() / 1000);
        await deployProcess(page, 'actions1.xml', `1.${minor}.1`);
        await deployProcess(page, 'actions2.xml', `1.${minor}.2`);

        const title = `E2E_actions_${Date.now()}`;
        await createCase(page, 'Actions', title);
        // the task of the model has no title, it is the only task of the case; it is assigned automatically and the
        // frontend expands it, a click would collapse it
        const header = page.getByRole('button', {name: new RegExp(`^${title} `)}).first();
        const task = page.getByRole('region', {name: new RegExp(`^${title} `)});
        await expect(header).toBeVisible();
        if (await header.getAttribute('aria-expanded') !== 'true') {
            await header.click();
        }
        const base = task.getByRole('spinbutton', {name: 'Base'});
        await base.fill('10');
        await base.blur();
        await expect(task.getByRole('spinbutton', {name: 'Result'})).toHaveValue('70');
    });
});

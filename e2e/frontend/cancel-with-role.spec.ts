import {expect, test} from '../fixtures/playground';
import {JOHN, loginAsJohn} from '../fixtures/account';
import {createCase, deployForSpec, expandTask, openCase, setProcessRoles} from '../fixtures/engine';

const PROCESS = 'Prezentacia';

/**
 * The Cancel button of a task depends on the role (prezentacia.xml): the role Admin can cancel the tasks, the role
 * Tester can perform them but not cancel them. The administrator has the role Admin, John Doe the role Tester.
 */
test.describe('Cancel of a task with a role (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'prezentacia.xml'));

    test.afterEach(async ({page}) => {
        await setProcessRoles(page, PROCESS, ['Admin'], false);
        await setProcessRoles(page, PROCESS, ['Tester'], false, JOHN);
    });

    test('NAE-TC-008 Check_Cancel_task_btn_with_role only the role that may cancel the task has the Cancel button', async ({page, browser}) => {
        test.setTimeout(240_000);
        const john = await loginAsJohn(browser);
        await setProcessRoles(page, PROCESS, ['Admin'], true);
        await setProcessRoles(page, PROCESS, ['Tester'], true, JOHN);

        const title = `E2E_cancel_${Date.now()}`;
        await createCase(page, PROCESS, title);

        await test.step('the administrator (Admin) assigns Detail and can cancel it', async () => {
            const detail = await expandTask(page, title, 'Detail');
            await detail.getByRole('button', {name: 'Assign', exact: true}).click();
            for (const button of ['Delegate', 'Reassign', 'Cancel']) {
                await expect(detail.getByRole('button', {name: button, exact: true})).toBeVisible();
            }
        });

        await test.step('John Doe (Tester) sees the task of the administrator without Cancel', async () => {
            await expect(async () => {
                await openCase(john, title);
            }).toPass({timeout: 30_000});
            const detail = await expandTask(john, title, 'Detail');
            await expect(detail.getByRole('button', {name: 'Cancel', exact: true})).toHaveCount(0);
        });

        await test.step('John Doe performs the task 123 but can not cancel it', async () => {
            const task = await expandTask(john, title, '123');
            const assign = task.getByRole('button', {name: 'Assign', exact: true});
            if (await assign.isVisible()) {
                await assign.click();
            }
            await expect(task.getByRole('button', {name: 'Finish', exact: true})).toBeVisible();
            await expect(task.getByRole('button', {name: 'Cancel', exact: true})).toHaveCount(0);
        });

        await test.step('the administrator cancels his task Detail', async () => {
            await openCase(page, title);
            const detail = await expandTask(page, title, 'Detail');
            await detail.getByRole('button', {name: 'Cancel', exact: true}).click();
            await expect(detail.getByRole('button', {name: 'Assign', exact: true})).toBeVisible();
        });
        await john.context().close();
    });
});

/**
 * The delegation of a task to another user: the role Admin of prezentacia.xml may delegate the task Detail, the dialog
 * offers the users who may perform the task (John Doe gets the role Admin too).
 */
test.describe('Delegate of a task (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'prezentacia.xml'));

    test.afterEach(async ({page}) => {
        await setProcessRoles(page, PROCESS, ['Admin'], false);
        await setProcessRoles(page, PROCESS, ['Admin'], false, JOHN);
    });

    test('NAE-TC-013 Delegate the task is delegated to another user', async ({page}) => {
        test.setTimeout(180_000);
        test.skip(!process.env['E2E_USER2_USERNAME'], 'Set E2E_USER2_USERNAME (registered by frontend/register.setup.ts)');
        await setProcessRoles(page, PROCESS, ['Admin'], true);
        await setProcessRoles(page, PROCESS, ['Admin'], true, JOHN);
        const title = `E2E_delegate_${Date.now()}`;
        await createCase(page, PROCESS, title);

        const detail = await expandTask(page, title, 'Detail');
        await detail.getByRole('button', {name: 'Assign', exact: true}).click();
        await detail.getByRole('button', {name: 'Delegate', exact: true}).click();
        const dialog = page.getByRole('dialog', {name: 'Assign user'});
        await dialog.getByRole('textbox', {name: 'Choose user'}).fill('John');
        await dialog.getByRole('navigation').getByText('John Doe', {exact: true}).click();
        await dialog.getByRole('button', {name: 'Assign', exact: true}).click();
        await expect(dialog).toBeHidden();

        // the task is assigned to John Doe, the administrator can not finish it any more
        await expect(page.getByRole('button', {name: new RegExp(`^${title} Detail .*John Doe`)})).toBeVisible();
        await expect(detail.getByRole('button', {name: 'Finish', exact: true})).toHaveCount(0);
    });
});

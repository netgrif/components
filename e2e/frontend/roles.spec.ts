import {expect, test} from '../fixtures/playground';
import {deployForSpec} from '../fixtures/engine';
import {ADMIN, openRoleAssignment, processRoles} from '../fixtures/frontend';

const PROCESS = 'Set data test net';

test.describe('Roles (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'set_data_test.xml'));

    test('NAE-TC-010 Roles a role of a process is assigned to the user and stays assigned', async ({page}) => {
        test.setTimeout(120_000);
        await openRoleAssignment(page, ADMIN);
        let role = (await processRoles(page, PROCESS)).getByRole('checkbox', {name: 'Process role'}).first();
        const assigned = await role.isChecked();
        await role.click();
        await expect(role).toBeChecked({checked: !assigned});
        // the change is saved for the selected users at once
        await expect(page.getByText('Saving')).toBeHidden();

        try {
            await openRoleAssignment(page, ADMIN);
            role = (await processRoles(page, PROCESS)).getByRole('checkbox', {name: 'Process role'}).first();
            await expect(role).toBeChecked({checked: !assigned});
        } finally {
            // the roles of the administrator as before the test
            if (await role.isChecked() !== assigned) {
                await role.click();
                await expect(role).toBeChecked({checked: assigned});
                await expect(page.getByText('Saving')).toBeHidden();
            }
        }
    });
});

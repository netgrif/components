import {Locator, Page} from '@playwright/test';
import {expect, openDemo, snackBar, test} from '../fixtures/playground';

test.describe('Login form', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/account/login'));

    test('NAE Authentication a wrong password shows the error', async ({page}) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('jack');
        await page.getByRole('textbox', {name: 'Password'}).fill('wrong');
        await page.getByRole('button', {name: 'Log in'}).click();
        await expect(page.getByRole('alert')).toContainText('Wrong username or password');
    });

    test('NAE Authentication a correct password logs the user in', async ({page}) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('jack');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret');
        await page.getByRole('button', {name: 'Log in'}).click();
        // the outputs of the playground: the login event with the logged user
        await expect(page.getByText('login', {exact: true})).toBeVisible();
        await expect(page.getByText('"jane.doe@netgrif.com"')).toBeVisible();
        await expect(page.getByRole('alert')).toBeHidden();
    });
});

test.describe('User invite', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/admin/invite'));

    test('NAE User_invite the invitation needs the e-mail and an organization', async ({page}) => {
        const invite = page.getByRole('button', {name: 'Invite user'});
        await expect(invite).toBeDisabled();
        await page.getByRole('textbox', {name: 'E-mail'}).fill('jack.doe@netgrif.com');
        await expect(invite).toBeDisabled();
        await page.getByRole('option', {name: 'Human resources'}).click();
        await expect(invite).toBeEnabled();
        await page.getByRole('textbox', {name: 'E-mail'}).fill('not an e-mail');
        await expect(invite).toBeDisabled();
    });

    test('NAE User_invite an invitation with an organization and a role is sent', async ({page}) => {
        await page.getByRole('textbox', {name: 'E-mail'}).fill('jack.doe@netgrif.com');
        await page.getByRole('option', {name: 'Human resources'}).click();
        await expect(page.getByRole('row', {name: 'Human resources'})).toBeVisible();
        await page.getByRole('button', {name: /Leave request/}).click();
        await page.getByRole('checkbox', {name: 'Playground user'}).check();
        await expect(page.getByRole('row', {name: 'Playground user'})).toBeVisible();

        await page.getByRole('button', {name: 'Invite user'}).click();
        await expect(snackBar(page)).toContainText('Invite sent');
        // the form is empty for the next invitation
        await expect(page.getByRole('textbox', {name: 'E-mail'})).toHaveValue('');
        await expect(page.getByRole('row', {name: 'Human resources'})).toBeHidden();
    });
});

test.describe('Role assignment', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/admin/roles'));

    /**
     * Expands the roles of a process. The roles are loaded after the expand animation (afterExpand), and Material listens
     * to the end of the animation only 200 ms after the panel is rendered, so the panel is expanded after that.
     */
    async function processRoles(page: Page, process: string): Promise<Locator> {
        const panel = page.locator('mat-expansion-panel').filter({hasText: process});
        await expect(panel).toHaveClass(/mat-expansion-panel-animations-enabled/);
        await panel.getByRole('button', {name: new RegExp(process)}).click();
        const region = page.getByRole('region', {name: new RegExp(process)});
        await expect(region.getByRole('checkbox').first()).toBeVisible();
        return region;
    }

    test('NAE Roles the roles of a process are shown for the selected user', async ({page}) => {
        await expect(page.getByRole('status')).toContainText('No user selected');
        await page.getByRole('option', {name: /Eva Novak/}).click();
        await expect(page.getByText('1 selected')).toBeVisible();
        const roles = await processRoles(page, 'Insurance claim');
        await expect(roles.getByRole('checkbox', {name: 'Claims clerk'})).toBeVisible();
        await expect(roles.getByRole('checkbox', {name: 'Playground user'})).toBeVisible();
    });

    test('NAE Roles an assigned role stays assigned after another user is selected', async ({page}) => {
        const eva = page.getByRole('option', {name: /Eva Novak/});
        await eva.click();
        const roles = await processRoles(page, 'Insurance claim');
        const clerk = roles.getByRole('checkbox', {name: 'Claims clerk'});
        const assigned = await clerk.isChecked();
        await clerk.click();
        await expect(clerk).toBeChecked({checked: !assigned});

        // John Smith instead of Eva Novak, then Eva Novak again: the roles are loaded from the engine
        await eva.click();
        await page.getByRole('option', {name: /John Smith/}).click();
        await page.getByRole('option', {name: /John Smith/}).click();
        await eva.click();
        await expect(page.getByText('1 selected')).toBeVisible();
        // the roles are hidden without a selected user, so the panel is expanded again
        await expect((await processRoles(page, 'Insurance claim')).getByRole('checkbox', {name: 'Claims clerk'}))
            .toBeChecked({checked: !assigned});
    });
});

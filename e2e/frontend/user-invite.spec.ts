import {expect, snackBar, test} from '../fixtures/playground';
import {logIn, register, uniqueEmail} from '../fixtures/account';
import {deployForSpec} from '../fixtures/engine';
import {openRoleAssignment, processRoles, userRef} from '../fixtures/frontend';
import {clearMails, mailLinkPath, mailpitRunning, waitForMail} from '../fixtures/mail';

const PROCESS = 'Set data test net';

/**
 * The invitation of a new user by the administrator (Account menu → Invite user, UserInviteComponent): the e-mail, an
 * organization and a role of a process; the invited user registers through the link of the mail (Mailpit) and has the
 * role.
 */
test.describe('User invite', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'set_data_test.xml'));

    test.beforeEach(async ({request}) => {
        test.skip(!await mailpitRunning(request), 'Mailpit is not running (application-engine: docker compose --profile e2e up -d mailpit)');
    });

    test('NAE-TC-006 User_invite the invited user registers with the organization and the role', async ({page, browser, request}) => {
        test.setTimeout(120_000);
        const email = uniqueEmail('e2e.invite');
        await clearMails(request, email);

        await page.goto('/');
        await page.getByRole('button', {name: 'Account'}).click();
        await page.getByRole('menuitem', {name: 'Invite user'}).click();
        await expect(page.getByRole('heading', {name: 'New user'})).toBeVisible();
        const invite = page.getByRole('button', {name: 'Invite user', exact: true});
        await page.getByRole('textbox', {name: 'E-mail'}).fill(email);
        // an organization is mandatory
        await expect(invite).toBeDisabled();
        const organization = page.getByRole('listbox').getByRole('option').first();
        const organizationName = (await organization.innerText()).trim();
        await organization.click();
        await expect(page.locator('mat-chip-row').filter({hasText: organizationName})).toBeVisible();
        const role = (await processRoles(page, PROCESS)).getByRole('checkbox', {name: 'Process role'}).first();
        await role.check();
        await expect(page.locator('mat-chip-row').filter({hasText: 'Process role'})).toBeVisible();
        await invite.click();
        await expect(snackBar(page).filter({hasText: 'Invite sent'})).toBeVisible();
        // the form is cleared for the next invitation
        await expect(page.getByRole('textbox', {name: 'E-mail'})).toHaveValue('');

        // the invited user registers through the link of the mail (without the login of the administrator)
        const link = mailLinkPath(await waitForMail(request, email, 'Registration invite'), 'signup');
        const context = await browser.newContext({storageState: {cookies: [], origins: []}});
        try {
            const invited = await context.newPage();
            await register(invited, link, email, 'Invited', 'User', 'invited-password-1');
            await logIn(invited, email, 'invited-password-1');
        } finally {
            await context.close();
        }

        // the user has the role of the invitation
        await openRoleAssignment(page, userRef('Invited User', email));
        await expect((await processRoles(page, PROCESS)).getByRole('checkbox', {name: 'Process role'}).first()).toBeChecked();
    });
});

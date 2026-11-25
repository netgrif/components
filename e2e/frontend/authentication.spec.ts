import {expect, snackBar, test} from '../fixtures/playground';
import {logIn, register, requestMailLink, uniqueEmail} from '../fixtures/account';
import {mailpitRunning} from '../fixtures/mail';

test.describe('Authentication (NAE)', () => {

    test('NAE-TC-002 Authentication the logged user sees the application', async ({page}) => {
        await page.goto('/');
        await expect(page).not.toHaveURL(/\/login/);
        await expect(page.getByRole('navigation').first()).toBeVisible();
    });

    test.describe('without the saved login', () => {
        test.use({storageState: {cookies: [], origins: []}});

        test('NAE-TC-002 Authentication a page of the application redirects to the login', async ({page}) => {
            await page.goto('/cases');
            await expect(page).toHaveURL(/\/login/);
            await expect(page.getByRole('button', {name: 'Log in'})).toBeVisible();
        });

        test('NAE-TC-002 Authentication the user logs in and logs out', async ({page}) => {
            // an own session: the logout ends the session on the engine, the saved one of the other tests stays valid
            await page.goto('/login');
            await page.getByRole('textbox', {name: 'Username'}).fill(process.env['E2E_USERNAME']!);
            await page.getByRole('textbox', {name: 'Password'}).fill(process.env['E2E_PASSWORD']!);
            await page.getByRole('button', {name: 'Log in'}).click();
            await expect(page).not.toHaveURL(/\/login/);

            await page.getByRole('button', {name: 'Account', exact: true}).click();
            await page.getByRole('menuitem', {name: 'Logout', exact: true}).click();
            await expect(page).toHaveURL(/\/login/);
            await page.goto('/cases');
            await expect(page).toHaveURL(/\/login/);
        });

        test.describe(() => {
            // the rejected login: the browser logs the 401 response, the application logs the error response
            // one pattern: an array of two values would be read as [value, fixture options] by test.use
            test.use({knownConsoleErrors: [/status of 401|^HttpErrorResponse$/]});

            test('NAE-TC-002 Authentication a wrong password shows the error', async ({page}) => {
                await page.goto('/login');
                await page.getByRole('textbox', {name: 'Username'}).fill('e2e-unknown-user');
                await page.getByRole('textbox', {name: 'Password'}).fill('wrong-password');
                await page.getByRole('button', {name: 'Log in'}).click();
                // netgrif-frontend shows the error in a snack bar
                await expect(snackBar(page)).toContainText('Wrong username or password');
                await expect(page).toHaveURL(/\/login/);
            });
        });
    });

    /**
     * The account pages of the login (the mails through Mailpit, application-engine: docker compose --profile e2e up -d
     * mailpit). The registration of the second user is NAE-TC-001 (register.setup.ts); these tests register own users.
     */
    test.describe('account', () => {
        test.use({storageState: {cookies: [], origins: []}});

        test.beforeEach(async ({request}) => {
            test.skip(!await mailpitRunning(request), 'Mailpit is not running (application-engine: docker compose --profile e2e up -d mailpit)');
        });

        test.describe(() => {
            // the old password is rejected: the browser logs the 401 response, the application logs the error response
            test.use({knownConsoleErrors: [/status of 401|^HttpErrorResponse$/]});

            test('NC-E2E-005 Forgotten password the link of the mail sets a new password', async ({page, request}) => {
                const email = uniqueEmail('e2e.recovery');
                await register(page, await requestMailLink(page, request, email, 'sign-up'), email, 'Recovery', 'User', 'old-password-1');

                const link = await requestMailLink(page, request, email, 'forgotten-password');
                await page.goto(link);
                await expect(page.getByRole('heading', {level: 1})).toHaveText('New password');
                await page.getByRole('textbox', {name: 'New password', exact: true}).fill('new-password-1');
                await page.getByRole('textbox', {name: 'Confirm new password'}).fill('new-password-1');
                await page.getByRole('button', {name: 'Set password'}).click();
                await expect(page.getByText('The password has been set, you can log in')).toBeVisible();
                await expect(page).toHaveURL(/\/login$/);

                await page.getByRole('textbox', {name: 'Username'}).fill(email);
                await page.getByRole('textbox', {name: 'Password'}).fill('old-password-1');
                await page.getByRole('button', {name: 'Log in'}).click();
                // the snack bar of the set password may still be closing
                await expect(snackBar(page).filter({hasText: 'Wrong username or password'})).toBeVisible();
                await logIn(page, email, 'new-password-1');
            });
        });

        test.describe(() => {
            // the wrong token of the link: the application logs the error of the token verification
            test.use({knownConsoleErrors: [/Invalid token!/]});

            test('NAE-TC-001 Signup the registration form checks the passwords and the link', async ({page, request}) => {
                const email = uniqueEmail('e2e.validation');
                const link = await requestMailLink(page, request, email, 'sign-up');
                await page.goto(link);
                await page.getByRole('textbox', {name: 'Name', exact: true}).fill('Validation');
                await page.getByRole('textbox', {name: 'Surname'}).fill('User');
                await page.getByRole('textbox', {name: 'Password', exact: true}).fill('password-1');
                await page.getByRole('textbox', {name: 'Confirm password'}).fill('password-2');
                await page.getByRole('button', {name: 'Register'}).click();
                await expect(page.getByText('The passwords do not match')).toBeVisible();
                // the form stays (the router encodes the '=' of the token in the address)
                await expect(page.getByRole('heading', {level: 1})).toHaveText('Create account');

                // a link with a wrong token
                await page.goto('/signup/' + Buffer.from(`${email}:wrong-token`).toString('base64'));
                await expect(page.getByRole('alert')).toHaveText(/The link is invalid or has expired/);
                await expect(page.getByRole('button', {name: 'Register'})).toHaveCount(0);

                // the e-mail form goes back to the login
                await page.goto('/sign-up');
                await page.getByRole('button', {name: 'Back to login'}).click();
                await expect(page).toHaveURL(/\/login$/);
            });
        });
    });
});

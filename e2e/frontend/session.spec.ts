import {expect, test} from '../fixtures/playground';
import {logIn} from '../fixtures/account';

/**
 * The session of the user ends elsewhere: the logout in another tab or a token the engine does not know any more. The
 * application returns to the login at the next request of the user instead of showing errors.
 * An own login: the logout ends the session on the engine, the saved session of the other tests stays valid.
 */
test.describe('Session (NAE)', () => {
    test.use({storageState: {cookies: [], origins: []}});
    // the requests of the ended session: the browser logs the 401 responses, the application its error responses
    test.use({knownConsoleErrors: [/status of 401|HttpErrorResponse|Loading tasks has failed/]});

    test('NC-E2E-015 Session the logout in another tab returns the first tab to the login', async ({page, context}) => {
        await logIn(page, process.env['E2E_USERNAME']!, process.env['E2E_PASSWORD']!);
        await page.goto('/cases');
        await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeVisible({timeout: 30_000});

        const other = await context.newPage();
        await other.goto('/cases');
        await other.getByRole('button', {name: 'Account', exact: true}).click();
        await other.getByRole('menuitem', {name: 'Logout', exact: true}).click();
        await expect(other).toHaveURL(/\/login/);

        // the first tab still shows the cases, its next request is refused and it returns to the login
        await page.getByRole('navigation').getByRole('link', {name: 'Tasks'}).click();
        await expect(page).toHaveURL(/\/login/, {timeout: 15_000});
        await expect(page.getByRole('button', {name: 'Log in'})).toBeVisible();
    });

    test('NC-E2E-015 Session a token unknown to the engine returns to the login', async ({page}) => {
        await logIn(page, process.env['E2E_USERNAME']!, process.env['E2E_PASSWORD']!);
        // the stored session token of the frontend (local storage "naet": base64 of "naet:<token>") is replaced by one the
        // engine does not know (an expired session)
        const replaced = await page.evaluate(() => {
            const stored = localStorage.getItem('naet') !== null;
            localStorage.setItem('naet', btoa('naet:00000000-0000-0000-0000-000000000000'));
            return stored;
        });
        expect(replaced, 'the frontend keeps its session token in the local storage "naet"').toBe(true);
        await page.goto('/cases');
        await expect(page).toHaveURL(/\/login/, {timeout: 15_000});
        await expect(page.getByRole('button', {name: 'Log in'})).toBeVisible();
    });

    test('NC-E2E-015 Session a stored value that is not a session token is ignored', async ({page}) => {
        await page.goto('/login');
        await page.evaluate(() => localStorage.setItem('naet', 'not-a-base64-session-token'));
        await page.goto('/cases');
        await expect(page).toHaveURL(/\/login/, {timeout: 15_000});
        await expect(page.getByRole('button', {name: 'Log in'})).toBeVisible();
        expect(await page.evaluate(() => localStorage.getItem('naet'))).toBeNull();
    });
});

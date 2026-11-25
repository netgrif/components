import * as fs from 'fs';
import {expect, test as setup} from '@playwright/test';
import {FRONTEND_AUTH} from '../fixtures/frontend';

/**
 * Logs in to netgrif-frontend and saves the session (the token is in the local storage) for the frontend tests.
 * The login is never in the repository: set E2E_USERNAME and E2E_PASSWORD in your shell for the run. Without them
 * the session saved by an earlier run is used (e2e/.auth, gitignored) while the engine accepts it.
 */
setup('log in to netgrif-frontend', async ({page}) => {
    const username = process.env['E2E_USERNAME'];
    const password = process.env['E2E_PASSWORD'];
    if (!username || !password) {
        if (!fs.existsSync(FRONTEND_AUTH)) {
            throw new Error('Set E2E_USERNAME and E2E_PASSWORD (a user of the engine) to run the frontend tests');
        }
        // the saved session: the application has to stay out of the login page with it
        const saved = JSON.parse(fs.readFileSync(FRONTEND_AUTH, 'utf8'));
        await page.context().addCookies(saved.cookies ?? []);
        await page.goto('/login');
        await page.evaluate(origins => {
            const origin = origins.find((o: any) => o.origin === window.location.origin);
            (origin?.localStorage ?? []).forEach((item: any) => window.localStorage.setItem(item.name, item.value));
        }, saved.origins ?? []);
        await page.goto('/');
        await expect(page, 'the saved session expired, set E2E_USERNAME and E2E_PASSWORD again').not.toHaveURL(/\/login/);
        return;
    }
    await page.goto('/login');
    await page.getByRole('textbox', {name: 'Username'}).fill(username);
    await page.getByRole('textbox', {name: 'Password'}).fill(password);
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page).not.toHaveURL(/\/login/);
    await page.context().storageState({path: FRONTEND_AUTH});
});

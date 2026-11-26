import {expect, test as setup} from '@playwright/test';
import {logIn, register, requestMailLink} from '../fixtures/account';
import {ENGINE_API, mailpitRunning} from '../fixtures/mail';

/**
 * NAE-TC-001 Signup: registration of the second user of the frontend tests (E2E_USER2_USERNAME, E2E_USER2_PASSWORD, John Doe)
 * through the forms of netgrif-frontend: Sign up on the login page, the invitation mail (Mailpit), the registration
 * form of its link, the login. Runs in the setup project, so the user exists before the frontend tests (a clean engine
 * has only the admin); on an engine where the user is registered already it only checks the login.
 */
setup('NAE-TC-001 Signup registration of a new user through the sign up and the invitation mail', async ({page, request}) => {
    const email = process.env['E2E_USER2_USERNAME'] as string;
    const password = process.env['E2E_USER2_PASSWORD'] as string;
    setup.skip(!email || !password, 'Set E2E_USER2_USERNAME and E2E_USER2_PASSWORD (the user registered by the tests)');
    // the first loads of the pages of a fresh dev server take seconds
    setup.setTimeout(120_000);

    const basic = `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`;
    const registered = (await request.get(`${ENGINE_API}/auth/login`, {headers: {Authorization: basic}})).ok();
    if (!registered) {
        setup.skip(!await mailpitRunning(request),
            'Mailpit is not running (application-engine: docker compose --profile e2e up -d mailpit)');
        // the engine sends no mail to a registered user: the user exists with another password than E2E_USER2_PASSWORD
        const link = await requestMailLink(page, request, email, 'sign-up').catch(error => {
            throw new Error(`No invitation mail to ${email}: when the user is registered already, E2E_USER2_PASSWORD is not `
                + `its password (restart the engine with a clean database or fix the password)\n${error.message}`);
        });
        await register(page, link, email, 'John', 'Doe', password);

        // the link works only once
        await page.goto(link);
        await expect(page.getByRole('alert')).toHaveText(/The link is invalid or has expired/);
    }

    await logIn(page, email, password);
});

import {APIRequestContext, Browser, expect, Page, test} from '@playwright/test';
import {clearMails, mailLinkPath, waitForMail} from './mail';
import {userRef, UserRef} from './frontend';

/**
 * The account pages of netgrif-frontend (views/login): sign up, registration of the invitation link, forgotten
 * password and the new password of the recovery link. The mails go through Mailpit (fixtures/mail.ts).
 */

export async function logIn(page: Page, email: string, password: string) {
    await page.goto('/login');
    await page.getByRole('textbox', {name: 'Username'}).fill(email);
    await page.getByRole('textbox', {name: 'Password'}).fill(password);
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page).not.toHaveURL(/\/login/);
}

/**
 * Sends the e-mail form of the sign up or of the forgotten password (opened from the login page) and returns the path
 * of the link of the mail.
 */
export async function requestMailLink(page: Page, request: APIRequestContext, email: string,
                                      kind: 'sign-up' | 'forgotten-password'): Promise<string> {
    await clearMails(request, email);
    await page.goto('/login');
    await page.getByRole('button', {name: kind === 'sign-up' ? 'Sign up' : 'Forgot password?'}).click();
    await expect(page).toHaveURL(new RegExp(`/${kind}$`));
    await expect(page.getByRole('heading', {level: 1})).toHaveText(kind === 'sign-up' ? 'Sign up' : 'Forgotten password');
    await page.getByRole('textbox', {name: 'E-mail'}).fill(email);
    await page.getByRole('button', {name: 'Send link'}).click();
    await expect(page.getByRole('status').filter({hasText: 'we have sent a link'})).toBeVisible();

    const mail = await waitForMail(request, email, kind === 'sign-up' ? 'Registration invite' : 'Reset password');
    return mailLinkPath(mail, kind === 'sign-up' ? 'signup' : 'recover');
}

/** fills the registration form of the invitation link, the page returns to the login */
export async function register(page: Page, link: string, email: string, name: string, surname: string, password: string) {
    await page.goto(link);
    await expect(page.getByRole('heading', {level: 1})).toHaveText('Create account');
    await expect(page.getByRole('textbox', {name: 'E-mail'})).toHaveValue(email);
    await page.getByRole('textbox', {name: 'Name', exact: true}).fill(name);
    await page.getByRole('textbox', {name: 'Surname'}).fill(surname);
    await page.getByRole('textbox', {name: 'Password', exact: true}).fill(password);
    await page.getByRole('textbox', {name: 'Confirm password'}).fill(password);
    await page.getByRole('button', {name: 'Register'}).click();
    await expect(page.getByText('The registration is complete, you can log in')).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
}

/** a new address for every run: the engine sends at most 2 mails a day to one address (nae.security.limits) */
export function uniqueEmail(prefix: string): string {
    return `${prefix}.${Date.now()}@netgrif.test`;
}

/** the second user of the tests, John Doe (E2E_USER2_USERNAME, registered by frontend/register.setup.ts) */
export const JOHN: UserRef = userRef('John Doe', process.env['E2E_USER2_USERNAME'] ?? '');

/** a page of the second user (its own login, the saved session of the tests is the administrator) */
export async function loginAsJohn(browser: Browser): Promise<Page> {
    const username = process.env['E2E_USER2_USERNAME'];
    const password = process.env['E2E_USER2_PASSWORD'];
    test.skip(!username || !password, 'Set E2E_USER2_USERNAME and E2E_USER2_PASSWORD (registered by frontend/register.setup.ts)');
    const context = await browser.newContext({storageState: {cookies: [], origins: []}, baseURL: test.info().project.use.baseURL});
    const page = await context.newPage();
    await logIn(page, username as string, password as string);
    return page;
}

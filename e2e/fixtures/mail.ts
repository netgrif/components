import {APIRequestContext, expect} from '@playwright/test';

/**
 * Mailpit, the SMTP mock of the e2e tests: application-engine docker-compose `docker compose --profile e2e up -d mailpit`,
 * the engine sends the mails to it (dev profile, or MAIL_HOST/MAIL_PORT), the tests read them through its REST API.
 */
export const MAILPIT_URL = process.env['E2E_MAILPIT_URL'] ?? 'http://localhost:8025';

/** the REST API of the engine (the frontend calls it directly, see providers of netgrif-frontend nae.json) */
export const ENGINE_API = process.env['E2E_ENGINE_URL'] ?? 'http://localhost:8080/api';

export interface Mail {
    subject: string;
    text: string;
    html: string;
}

export async function mailpitRunning(request: APIRequestContext): Promise<boolean> {
    try {
        return (await request.get(`${MAILPIT_URL}/api/v1/info`, {timeout: 5000})).ok();
    } catch {
        return false;
    }
}

/** removes the mails of the address, so that the next {@link waitForMail} sees only the new one */
export async function clearMails(request: APIRequestContext, to: string) {
    const response = await request.delete(`${MAILPIT_URL}/api/v1/search`, {params: {query: `to:"${to}"`}});
    expect(response.ok()).toBe(true);
}

/** waits for a mail sent to the address (the engine sends it asynchronously to the request) */
export async function waitForMail(request: APIRequestContext, to: string, subject: string): Promise<Mail> {
    let id: string | undefined;
    await expect.poll(async () => {
        const response = await request.get(`${MAILPIT_URL}/api/v1/search`, {params: {query: `to:"${to}" subject:"${subject}"`}});
        id = (await response.json()).messages?.[0]?.ID;
        return id;
    }, {message: `the mail '${subject}' to ${to} in Mailpit`, timeout: 30_000}).toBeTruthy();
    const message = await (await request.get(`${MAILPIT_URL}/api/v1/message/${id}`)).json();
    return {subject: message.Subject, text: message.Text ?? '', html: message.HTML ?? ''};
}

/**
 * The path of the link of the mail (`<server>/signup/<token>`, `<server>/recover/<token>`): the server of the link is
 * the frontend address configured on the engine (nae.mail.redirect-to), the tests open the path on their own baseURL.
 */
export function mailLinkPath(mail: Mail, path: 'signup' | 'recover'): string {
    const link = new RegExp(`https?://[^\\s"'<>]*/${path}/[^\\s"'<>]+`).exec(mail.html || mail.text)?.[0];
    expect(link, `the /${path}/<token> link in the mail '${mail.subject}'`).toBeTruthy();
    return new URL(link as string).pathname;
}

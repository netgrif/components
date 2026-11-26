import {ConsoleMessage, expect, Page, test as base} from '@playwright/test';

/** messages of the browser console that are not errors of the application */
const IGNORED_CONSOLE = [/\[vite\]/, /Angular is running in development mode/];

/**
 * The text of a console message with the HTTP errors named `HttpErrorResponse`: the production build minifies the name
 * of the class (the console shows e.g. `ERROR El`), so an HTTP error is recognized by its shape.
 */
async function consoleText(message: ConsoleMessage): Promise<string> {
    const args = await Promise.all(message.args().map(arg => arg.evaluate(value =>
        !!value && typeof value === 'object' && 'status' in value && 'url' in value && 'headers' in value
            ? 'HttpErrorResponse' : null).catch(() => null)));
    if (args.every(arg => arg === null)) {
        return message.text();
    }
    const texts = await Promise.all(message.args().map((arg, i) => args[i] ?? arg.evaluate(value =>
        typeof value === 'string' ? value : value instanceof Error ? value.message : String(value)).catch(() => '')));
    return texts.join(' ');
}

/**
 * The playground page with the errors of the browser console collected: a test fails when the application logged
 * an error or threw an uncaught exception. A test can allow known errors with `test.use({knownConsoleErrors: [...]})`,
 * each of them with a comment why.
 */
export const test = base.extend<{knownConsoleErrors: Array<RegExp>, consoleErrors: Array<string>, closeOtherContexts: void}>({
    // the contexts a test opened itself (the login of the second user, an anonymous user) are closed after the test:
    // they would stay open in the shared browser of the worker for the rest of the run
    closeOtherContexts: [async ({browser, page}, use) => {
        await use();
        for (const context of browser.contexts()) {
            if (context !== page.context()) {
                await context.close();
            }
        }
    }, {auto: true}],
    knownConsoleErrors: [[], {option: true}],
    consoleErrors: [async ({page, knownConsoleErrors}, use) => {
        const errors: Array<string> = [];
        const ignored = (text: string) => [...IGNORED_CONSOLE, ...knownConsoleErrors].some(pattern => pattern.test(text));
        const pending: Array<Promise<void>> = [];
        page.on('console', message => {
            if (message.type() === 'error') {
                const path = new URL(page.url()).pathname;
                pending.push(consoleText(message).then(text => {
                    if (!ignored(text)) {
                        errors.push(`${path}: ${text.split('\n')[0]}`);
                    }
                }));
            }
        });
        page.on('pageerror', error => {
            if (!ignored(error.message)) {
                errors.push(`${new URL(page.url()).pathname}: ${error.message}`);
            }
        });
        await use(errors);
        await Promise.all(pending);
        expect(errors, 'errors in the browser console').toEqual([]);
    }, {auto: true}],
});

export {expect};

/** opens a page of the playground and waits until Angular renders it */
export async function openDemo(page: Page, path: string): Promise<void> {
    await page.goto(path);
    await expect(page.locator('ne-root')).toBeVisible();
    await page.waitForLoadState('networkidle');
}

/** the snack bar shown now (Material snack bar container) */
export function snackBar(page: Page) {
    return page.locator('mat-snack-bar-container');
}

import {expect, Page, test as base} from '@playwright/test';

/** messages of the browser console that are not errors of the application */
const IGNORED_CONSOLE = [/\[vite\]/, /Angular is running in development mode/];

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
        page.on('console', message => {
            if (message.type() === 'error' && !ignored(message.text())) {
                errors.push(`${new URL(page.url()).pathname}: ${message.text().split('\n')[0]}`);
            }
        });
        page.on('pageerror', error => {
            if (!ignored(error.message)) {
                errors.push(`${new URL(page.url()).pathname}: ${error.message}`);
            }
        });
        await use(errors);
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

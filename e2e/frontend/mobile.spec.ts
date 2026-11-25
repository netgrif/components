import {Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {createCase, deployForSpec} from '../fixtures/engine';

/** the page does not scroll horizontally (its content fits the width of the phone) */
async function expectNoHorizontalScroll(page: Page) {
    const overflow = await page.evaluate(() => {
        const root = document.scrollingElement as HTMLElement;
        const wider = Array.from(document.querySelectorAll<HTMLElement>('body *'))
            .filter(element => element.getBoundingClientRect().right > window.innerWidth + 1
                && getComputedStyle(element).position !== 'fixed' && element.offsetParent !== null)
            .slice(0, 5)
            .map(element => `${element.tagName.toLowerCase()}.${element.className}`.slice(0, 80));
        return {scroll: root.scrollWidth - root.clientWidth, wider};
    });
    expect(overflow.scroll, `the page scrolls horizontally, wider elements: ${overflow.wider.join(', ')}`).toBeLessThanOrEqual(0);
}

/**
 * netgrif-frontend on the width of a phone (390 x 844): the pages fit the width without a horizontal scroll and the
 * navigation of the rail is reachable.
 */
test.describe('Mobile width (NAE)', () => {
    test.use({viewport: {width: 390, height: 844}});

    test.describe('without the login', () => {
        test.use({storageState: {cookies: [], origins: []}});

        test('NC-E2E-013 Mobile the login page fits the phone', async ({page}) => {
            await page.goto('/login');
            await expect(page.getByRole('button', {name: 'Log in'})).toBeVisible();
            await expectNoHorizontalScroll(page);
        });
    });

    test('NC-E2E-013 Mobile the case view fits the phone and the navigation opens the tasks', async ({page}) => {
        await page.goto('/cases');
        await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeVisible({timeout: 30_000});
        await expectNoHorizontalScroll(page);

        // the navigation of the rail: the menu button opens the drawer with the items (the icon button has no accessible
        // name, open bug, it is found by its icon)
        const tasks = page.getByRole('navigation').getByRole('link', {name: 'Tasks'});
        if (!await tasks.isVisible()) {
            await page.getByRole('button').filter({has: page.locator('mat-icon', {hasText: /^menu$/})}).first().click();
        }
        await tasks.click();
        await expect(page).toHaveURL(/\/tasks/);
        await expectNoHorizontalScroll(page);
    });

    test.describe('with a process', () => {
        test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_validations.xml'));

        test('NC-E2E-013 Mobile the task of a case fits the phone', async ({page}) => {
            const title = `Mobile${Date.now()}`;
            await createCase(page, 'E2E validations', title);
            // the narrow header of the task shows only its first column (the case)
            const header = page.getByRole('button', {name: new RegExp(`^${title}`)}).first();
            if (await header.getAttribute('aria-expanded') !== 'true') {
                await header.click();
            }
            const task = page.getByRole('region', {name: new RegExp(`^${title}`)}).first();
            await expect(task.getByRole('textbox', {name: 'Name'})).toBeVisible();
            await expect(task.getByRole('button', {name: 'Assign', exact: true})
                .or(task.getByRole('button', {name: 'Finish', exact: true}))).toBeInViewport();
            await expectNoHorizontalScroll(page);
        });
    });
});

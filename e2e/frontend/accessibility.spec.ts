import AxeBuilder from '@axe-core/playwright';
import {Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {builderButton} from '../fixtures/builder';
import {createCase, deployForSpec, expandTask} from '../fixtures/engine';

/**
 * The accessibility of the main screens checked by axe-core (WCAG 2.1 A and AA rules): a serious or critical violation
 * fails the test unless it is a known one of the screen (open bugs, `known`), every violation is listed in the annotations
 * of the test (the HTML report). A fixed bug is removed from `known` of its screens.
 */
async function checkAccessibility(page: Page, known: Array<string> = []) {
    const results = await new AxeBuilder({page})
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    const violations = results.violations.map(violation =>
        `${violation.impact} ${violation.id} (${violation.nodes.length}): ${violation.help}\n    `
        + violation.nodes.slice(0, 3).map(node => node.target.join(' ')).join('\n    '));
    test.info().annotations.push({type: 'axe', description: violations.join('\n') || 'no violations'});
    const serious = results.violations
        .filter(violation => violation.impact === 'serious' || violation.impact === 'critical')
        .filter(violation => !known.includes(violation.id));
    expect(serious.map(violation => `${violation.id} (${violation.nodes.length})`), violations.join('\n')).toEqual([]);
}

/**
 * The known violations (open bugs): aria-sort on the sort headers of the lists (not a column header), buttons nested in
 * the expansion panel headers (the menu of a case or a task) and in the tabs.
 */
const KNOWN_LIST = ['aria-allowed-attr', 'nested-interactive'];

test.describe('Accessibility (NAE)', () => {

    test.describe('without the login', () => {
        test.use({storageState: {cookies: [], origins: []}});

        for (const path of ['/login', '/sign-up', '/forgotten-password']) {
            test(`NC-E2E-012 Accessibility ${path}`, async ({page}) => {
                await page.goto(path);
                await expect(page.getByRole('heading', {level: 1})).toBeVisible();
                await checkAccessibility(page);
            });
        }
    });

    test('NC-E2E-012 Accessibility the case view', async ({page}) => {
        await page.goto('/cases');
        await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeVisible({timeout: 30_000});
        await page.waitForLoadState('networkidle');
        await checkAccessibility(page, KNOWN_LIST);
    });

    test.describe('with a process', () => {
        test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_validations.xml'));

        test('NC-E2E-012 Accessibility the task of a case', async ({page}) => {
            const title = `Axe${Date.now()}`;
            await createCase(page, 'E2E validations', title);
            const task = await expandTask(page, title, 'Fill');
            await expect(task.getByRole('textbox', {name: 'Name'})).toBeVisible();
            await checkAccessibility(page, KNOWN_LIST);
        });
    });

    test('NC-E2E-012 Accessibility the role assignment', async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', {name: 'Account', exact: true}).click();
        await page.getByRole('menuitem', {name: 'Role assignment'}).click();
        await expect(page.getByRole('heading', {name: 'Users'})).toBeVisible();
        await page.waitForLoadState('networkidle');
        await checkAccessibility(page);
    });

    test('NC-E2E-012 Accessibility the user invite', async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', {name: 'Account', exact: true}).click();
        await page.getByRole('menuitem', {name: 'Invite user'}).click();
        await expect(page.getByRole('heading', {name: 'New user'})).toBeVisible();
        await page.waitForLoadState('networkidle');
        await checkAccessibility(page);
    });

    test('NC-E2E-012 Accessibility the builder', async ({page}) => {
        await page.goto('/processes');
        await page.getByRole('button', {name: 'New process', exact: true}).click();
        await expect(builderButton(page, 'tool_import')).toBeVisible();
        await checkAccessibility(page, ['nested-interactive']);
    });
});

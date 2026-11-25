import {Page} from '@playwright/test';
import {expect, openDemo, snackBar, test} from '../fixtures/playground';

/** the rows of the case list (the case panels) */
function caseRows(page: Page) {
    return page.locator('nc-case-panel');
}

/** titles of the shown cases (the second line of a row, after the process icon) */
async function caseTitles(page: Page): Promise<Array<string>> {
    return (await caseRows(page).allInnerTexts()).map(text => text.split('\n')[1]);
}

test.describe('Case view', () => {

    test.beforeEach(async ({page}) => openDemo(page, '/views/cases'));

    test('NAE Reset_case_creation the new case dialog asks for the process, then the title', async ({page}) => {
        await page.getByRole('button', {name: 'New case'}).click();
        const dialog = page.getByRole('dialog', {name: 'New case'});
        await dialog.getByRole('button', {name: /Leave request/}).click();
        await expect(dialog.getByText('Leave request · 1.0.0')).toBeVisible();
        await expect(dialog.getByRole('button', {name: 'Create'})).toBeDisabled();

        // back to the choice of the process, the title is empty again
        await dialog.getByRole('heading').getByRole('button').click();
        await expect(dialog.getByRole('button', {name: /Insurance claim/})).toBeVisible();
        await dialog.getByRole('button', {name: /Leave request/}).click();
        await expect(dialog.getByRole('textbox', {name: 'Fill out case title'})).toHaveValue('');

        await dialog.getByRole('button', {name: 'Cancel'}).click();
        await expect(dialog).toBeHidden();
    });

    test('NAE Case_view a created case is the first in the list', async ({page}) => {
        await page.getByRole('button', {name: 'New case'}).click();
        const dialog = page.getByRole('dialog', {name: 'New case'});
        await dialog.getByRole('button', {name: /Leave request/}).click();
        await dialog.getByRole('textbox', {name: 'Fill out case title'}).fill('Leave of Playwright');
        await dialog.getByRole('button', {name: 'Create'}).click();

        await expect(dialog).toBeHidden();
        await expect(snackBar(page)).toContainText('Case "Leave of Playwright" was created');
        await expect(caseRows(page).first()).toContainText('Leave of Playwright');
        await expect(caseRows(page).first()).toContainText('leave_request');
    });

    test('NAE Case_view_Filtering the fulltext search shows only the matching cases', async ({page}) => {
        const rowsBefore = await caseRows(page).count();
        await page.getByRole('textbox', {name: 'Search'}).fill('Leave');
        await expect(page.getByRole('status')).toHaveText('Page 1 of 1');
        await expect(caseRows(page)).not.toHaveCount(rowsBefore);
        for (const title of await caseTitles(page)) {
            expect(title).toContain('Leave');
        }
    });

    test('NAE Case_view sorting by the title switches ascending, descending and none', async ({page}) => {
        // the mock engine always returns the cases by the creation date, so only the state of the header is checked here,
        // the order of the cases needs the engine (netgrif-frontend)
        const title = page.getByRole('button', {name: 'Title', exact: true});
        const header = page.locator('[aria-sort]', {has: title});
        await expect(header).toHaveAttribute('aria-sort', 'none');
        for (const sort of ['ascending', 'descending', 'none']) {
            await title.click();
            await expect(header).toHaveAttribute('aria-sort', sort);
        }
    });
});

test.describe('Tabbed case & task view', () => {

    test('NAE-TC-016 TabView a click on a case opens its tasks in a new tab, back returns to the cases', async ({page}) => {
        await openDemo(page, '/views/tabbed');
        await page.getByRole('button', {name: /Leave of Jana Simko/}).first().click();

        const task = page.getByRole('region', {name: /Leave of Jana Simko/});
        await expect(task).toBeVisible();
        await expect(task.getByRole('textbox', {name: 'Employee'})).toHaveValue('Jana Simko');
        await expect(page.getByRole('button', {name: 'New case'})).toBeHidden();

        await page.getByRole('button', {name: 'Back to the cases'}).click();
        await expect(page.getByRole('button', {name: 'New case'})).toBeVisible();
        await expect(page.getByRole('button', {name: /Leave of Jana Simko/}).first()).toBeVisible();
    });

    test('NAE-TC-016 TabView with the tab header the case opens in a new tab that is selected and closed', async ({page}) => {
        await openDemo(page, '/views/tabbed');
        await page.getByRole('switch', {name: 'Hide tab header (netgrif-frontend)'}).click();
        const tabs = page.locator('nc-tab-view').getByRole('tab');
        await expect(tabs).toHaveCount(1);

        await page.getByRole('button', {name: /Leave of Jana Simko/}).first().click();
        await expect(tabs).toHaveCount(2);
        const caseTab = tabs.nth(1);
        await expect(caseTab).toContainText('Leave of Jana Simko');
        await expect(caseTab).toHaveAttribute('aria-selected', 'true');
        await expect(page.getByRole('region', {name: /Leave of Jana Simko/})).toBeVisible();

        // the first tab (the cases) is selected again, the tab of the case stays open
        await tabs.nth(0).click();
        await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
        await expect(page.getByRole('button', {name: 'New case'})).toBeVisible();
        await expect(tabs).toHaveCount(2);

        // the close button of the tab closes it, the cases stay
        await caseTab.getByRole('button', {name: 'Close', exact: true}).click();
        await expect(tabs).toHaveCount(1);
        await expect(page.getByRole('button', {name: 'New case'})).toBeVisible();
    });
});

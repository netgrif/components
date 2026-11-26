import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {createCase, deployForSpec} from '../fixtures/engine';

/** the process of the cases (it asks for the title of a new case) */
const PROCESS = 'Set data test net';

/** a title no other case of the engine has (the engine keeps the cases of the earlier runs) */
function uniqueTitle(name: string): string {
    return `E2E ${name} ${Date.now()}`;
}

function caseView(page: Page) {
    return page.locator('app-cases-view');
}

/** the rows of the case list with the title */
function caseRows(page: Page, title: string) {
    return caseView(page).getByRole('button', {name: new RegExp(`^${title} `)});
}

/** the menu of the header of the case list (Ordering / Search / Edit mode) */
function headerMenu(page: Page) {
    return caseView(page).getByRole('button', {name: 'More actions', exact: true}).first();
}

/**
 * Opens a select by the keyboard: the label of an empty outlined field lies over the select (Material lets the label
 * take the clicks), the keyboard opens it the same way as a click of the user.
 */
async function openSelect(select: Locator) {
    await select.focus();
    await select.press('Enter');
}

/** an option of an opened select / autocomplete panel */
function panelOption(page: Page, option: string) {
    return page.locator('mat-option').filter({hasText: new RegExp(`^\\s*${option}\\s*$`)});
}

async function openCases(page: Page) {
    await page.goto('/cases');
    // the button is shown when the allowed processes are loaded (slower with many processes on the engine)
    await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeVisible({timeout: 30_000});
}

/**
 * Sets the first column of the case list in the edit mode of the header. The columns are a preference of the user
 * saved on the engine, so a test changing them sets them back.
 */
async function setFirstColumn(page: Page, column: string) {
    await openCases(page);
    if (await caseView(page).getByRole('button', {name: column, exact: true}).isVisible()) {
        return;
    }
    await headerMenu(page).click();
    await page.getByRole('menuitem', {name: 'Enable edit mode'}).click();
    const firstColumn = caseView(page).getByRole('combobox', {name: 'Autocomplete'}).first();
    await firstColumn.fill(column);
    // the metadata of the case are offered first, a data field of a process can have the same title
    await panelOption(page, column).first().click();
    await headerMenu(page).click();
    await page.getByRole('menuitem', {name: 'Submit'}).click();
    await expect(caseView(page).getByRole('button', {name: column, exact: true})).toBeVisible();
}

/**
 * Searches the cases by the fulltext until the expected number of them is found: a case created right before is in
 * the search index of the engine (Elasticsearch) a moment later.
 */
async function searchCases(page: Page, text: string, count: number) {
    await expect(async () => {
        await openCases(page);
        await caseView(page).getByRole('textbox', {name: 'Search'}).fill(text);
        await expect(caseView(page).getByRole('button', {name: new RegExp(`^${text}[_ ]`)})).toHaveCount(count, {timeout: 3000});
    }).toPass({timeout: 30_000});
}

test.describe('Case view (NAE)', () => {

    // the search waits for the search index of the engine, the columns of the header are a preference of the user
    test.describe.configure({timeout: 120_000});

    test.beforeEach(async ({page}) => setFirstColumn(page, 'Title'));

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'set_data_test.xml'));

    test('NAE-TC-007 Reset_case_creation the new case dialog goes back to the choice of the process', async ({page}) => {
        await openCases(page);
        await page.getByRole('button', {name: 'New case', exact: true}).click();
        const dialog = page.getByRole('dialog', {name: 'New case'});
        const search = dialog.getByRole('textbox', {name: 'Search processes'});
        await search.fill(PROCESS);
        await dialog.getByRole('button', {name: new RegExp(`^${PROCESS} `)}).click();
        const title = dialog.getByRole('textbox', {name: 'Fill out case title'});
        await title.fill('A title that is not used');
        await expect(dialog.getByRole('button', {name: 'Create'})).toBeEnabled();

        // back to the choice of the process
        await dialog.getByRole('heading').getByRole('button').click();
        await expect(search).toBeVisible();
        await search.fill(PROCESS);
        await dialog.getByRole('button', {name: new RegExp(`^${PROCESS} `)}).click();
        // the title of the left process is cleared
        await expect(title).toHaveValue('');

        await dialog.getByRole('button', {name: 'Cancel'}).click();
        await expect(dialog).toBeHidden();
        await expect(caseRows(page, 'A title that is not used')).toHaveCount(0);
    });

    test('NAE-TC-005 Case_view a created case is found by the fulltext and by the search of the header', async ({page}) => {
        // one word: the search of the header with more words ("title contains 'a b'") returns every case (engine bug,
        // SearchUtils.doBuildElasticQuery builds `title:*"a b"*`)
        const title = `E2E_case_view_${Date.now()}`;
        await createCase(page, PROCESS, title);
        await openCases(page);

        await test.step('fulltext search', async () => {
            await searchCases(page, title, 1);
            await expect(caseRows(page, title)).toContainText('set_data_test');
            await expect(caseRows(page, title)).toContainText('Admin Netgrif');
        });

        await test.step('search mode of the header', async () => {
            await openCases(page);
            await headerMenu(page).click();
            await page.getByRole('menuitem', {name: 'Search mode'}).click();
            const titleSearch = caseView(page).getByRole('textbox', {name: 'Title', exact: true});
            await titleSearch.fill(title);
            await titleSearch.press('Enter');
            await expect(caseRows(page, title)).toHaveCount(1);
            // the other cases of the process are filtered out
            await expect(caseView(page).getByRole('button').filter({hasText: 'set_data_test'})).toHaveCount(1);
        });
    });

    test('NAE-TC-005 Case_view the edit mode of the header changes a column to a data field of the processes', async ({page}) => {
        await setFirstColumn(page, 'Title');
        try {
            await setFirstColumn(page, 'Case ID');
            await expect(caseView(page).getByRole('button', {name: 'Title', exact: true})).toHaveCount(0);
            // the columns are kept for the user (the case view opened again)
            await openCases(page);
            await expect(caseView(page).getByRole('button', {name: 'Case ID', exact: true})).toBeVisible();
        } finally {
            await setFirstColumn(page, 'Title');
        }
    });

    test('NAE-TC-009 Case_view_Filtering the advanced search finds the cases by the conditions', async ({page}) => {
        const prefix = uniqueTitle('Filter');
        await createCase(page, PROCESS, `${prefix} A`);
        await createCase(page, PROCESS, `${prefix} B`);
        await openCases(page);

        // the fulltext finds both cases
        await searchCases(page, prefix, 2);
        await openCases(page);

        // advanced search: case title is exactly the title of the first case
        await caseView(page).locator('button').filter({has: page.locator('mat-icon', {hasText: /^filter_list$/})}).first().click();
        await openSelect(page.getByRole('combobox', {name: 'Search category'}));
        await panelOption(page, 'Case title').click();
        await panelOption(page, 'is exactly').click();
        const value = caseView(page).getByRole('textbox').first();
        await value.fill(`${prefix} A`);
        await value.press('Enter');
        await expect(caseView(page).getByRole('button', {name: `${prefix} A`, exact: true})).toBeVisible();
        await expect(caseRows(page, `${prefix} A`)).toHaveCount(1);
        await expect(caseRows(page, `${prefix} B`)).toHaveCount(0);
    });

    test('NAE Case_view sorting by the title orders the cases ascending, descending and back by the creation', async ({page}) => {
        // one word: the fulltext of more words does not find the cases reliably
        const prefix = `E2E_sort_${Date.now()}`;
        // A is created first, so the default order (the newest first) is B, A
        await createCase(page, PROCESS, `${prefix}_A`);
        await createCase(page, PROCESS, `${prefix}_B`);
        await searchCases(page, prefix, 2);

        const rows = caseView(page).getByRole('button', {name: new RegExp(`^${prefix}_`)});
        const title = caseView(page).getByRole('button', {name: 'Title', exact: true});
        const header = caseView(page).locator('[aria-sort]', {has: page.getByRole('button', {name: 'Title', exact: true})});
        for (const [sort, request, first, second] of [['ascending', 'sort=title.keyword,asc', 'A', 'B'],
            ['descending', 'sort=title.keyword,desc', 'B', 'A'], ['none', 'sort=stringId,desc', 'B', 'A']]) {
            // the cases of the new order are loaded from the engine
            const loaded = page.waitForResponse(response => response.url().includes('/case/search') && response.url().includes(request));
            await title.click();
            await loaded;
            await expect(header).toHaveAttribute('aria-sort', sort);
            await expect(rows.nth(0)).toHaveAccessibleName(new RegExp(`^${prefix}_${first} `));
            await expect(rows.nth(1)).toHaveAccessibleName(new RegExp(`^${prefix}_${second} `));
        }
    });

    test('NAE-TC-016 TabView a click on a case opens its tasks in the case view, the breadcrumb returns to the cases', async ({page}) => {
        const title = uniqueTitle('Tab');
        await createCase(page, PROCESS, title);
        await searchCases(page, title, 1);
        await caseRows(page, title).click();

        await expect(page.getByRole('heading', {name: title, level: 1})).toBeVisible();
        await expect(page.getByRole('button', {name: `${title} Task - editable`})).toBeVisible();
        await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeHidden();

        await page.getByRole('button', {name: 'Cases', exact: true}).click();
        await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeVisible();
        await expect(page.getByRole('heading', {name: title, level: 1})).toBeHidden();
    });
});

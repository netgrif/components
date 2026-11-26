import {Page} from '@playwright/test';
import {expect, snackBar, test} from '../fixtures/playground';
import {JOHN, loginAsJohn} from '../fixtures/account';
import {createCase, deployForSpec, escapeRegExp, setProcessRoles} from '../fixtures/engine';

const PROCESS = 'E2E case permissions';

/** the row of the case in the case view (newest first) */
function caseRow(page: Page, title: string) {
    return page.getByRole('button', {name: new RegExp(`^${escapeRegExp(title)} `)});
}

/** the case view with its cases loaded from the engine */
async function openCases(page: Page) {
    const loaded = page.waitForResponse(response => response.url().includes('/case/search'));
    await page.goto('/cases');
    await loaded;
}

/** the case is in the case view of the user (a new case is found after it is indexed by Elasticsearch) */
async function expectCaseShown(page: Page, title: string) {
    await expect(async () => {
        await openCases(page);
        await expect(caseRow(page, title).first()).toBeVisible({timeout: 3000});
    }).toPass({timeout: 30_000});
}

/** the more button of the case row (the menu with Delete), shown only with the delete permission */
function caseMenu(page: Page, title: string) {
    return caseRow(page, title).first().getByRole('button', {name: 'More actions', exact: true});
}

/**
 * The case permissions of the process roles (e2e_case_permissions.xml): Creator creates and views the cases, Viewer
 * only views them, Manager views and deletes them, a user without a role of the process does not see its cases.
 * The administrator is the Creator, John Doe gets the roles one after the other.
 */
test.describe('Case permissions (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_case_permissions.xml'));

    test.afterEach(async ({page}) => {
        await setProcessRoles(page, PROCESS, ['Creator'], false);
        await setProcessRoles(page, PROCESS, ['Viewer', 'Manager'], false, JOHN);
    });

    test('NC-E2E-007 Case permissions the roles create, view and delete the cases of the process', async ({page, browser}) => {
        test.setTimeout(240_000);
        const john = await loginAsJohn(browser);
        await setProcessRoles(page, PROCESS, ['Creator'], true);
        const title = `Permissions${Date.now()}`;
        await createCase(page, PROCESS, title);

        await test.step('the creator sees the case without the delete menu', async () => {
            await expectCaseShown(page, title);
            await expect(caseMenu(page, title)).toHaveCount(0);
        });

        await test.step('a user without a role of the process does not see the case and can not create one', async () => {
            await openCases(john);
            await expect(caseRow(john, title)).toHaveCount(0);
            const newCase = john.getByRole('button', {name: 'New case', exact: true});
            if (await newCase.isVisible()) {
                await newCase.click();
                const dialog = john.getByRole('dialog', {name: 'New case'});
                await dialog.getByRole('textbox', {name: 'Search processes'}).fill(PROCESS);
                await expect(dialog.getByRole('button', {name: new RegExp(`^${PROCESS} `)})).toHaveCount(0);
                await john.keyboard.press('Escape');
            }
        });

        await test.step('the viewer sees the case without the delete menu', async () => {
            await setProcessRoles(page, PROCESS, ['Viewer'], true, JOHN);
            await expectCaseShown(john, title);
            await expect(caseMenu(john, title)).toHaveCount(0);
        });

        await test.step('the manager deletes the case, it is not shown to anybody then', async () => {
            await setProcessRoles(page, PROCESS, ['Manager'], true, JOHN);
            await expectCaseShown(john, title);
            await caseMenu(john, title).click();
            await john.getByRole('menuitem', {name: 'Delete'}).click();
            await expect(snackBar(john).filter({hasText: 'Case successfully deleted'})).toBeVisible();
            await expect(async () => {
                await openCases(page);
                await expect(caseRow(page, title)).toHaveCount(0, {timeout: 3000});
            }).toPass({timeout: 30_000});
        });
    });
});

import {Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';

/** the labels of the application in the languages of the Language menu (toolbar.menu.*, dynamicNavigation.*) */
const LABELS = {
    English: {names: {English: 'English', Slovak: 'Slovak', German: 'German'}, account: 'Account', profile: 'Profile', logout: 'Logout', language: 'Language',
        cases: 'Cases', tasks: 'Tasks', processes: 'Processes', headers: ['Case', 'Title', 'Priority', 'Assignee']},
    Slovak: {names: {English: 'Anglický', Slovak: 'Slovenský', German: 'Nemecký'}, account: 'Účet', profile: 'Profil', logout: 'Odhlásiť sa', language: 'Jazyk',
        cases: 'Prípady', tasks: 'Úlohy', processes: 'Procesy', headers: ['Prípad', 'Názov', 'Priorita', 'Riešiteľ']},
    German: {names: {English: 'English', Slovak: 'Slowakisch', German: 'Deutsch'}, account: 'Konto', profile: 'Benutzerprofil', logout: 'Abmelden', language: 'Sprache',
        cases: 'Fälle', tasks: 'Aufgaben', processes: 'Prozesse', headers: []},
};
type Language = keyof typeof LABELS;

/** chooses the language in the Account menu of the rail, the menu is labeled in the current language */
async function chooseLanguage(page: Page, current: Language, language: Language) {
    await page.getByRole('button', {name: LABELS[current].account, exact: true}).click();
    await page.getByRole('menuitem', {name: LABELS[current].language, exact: true}).click();
    // the names of the languages are in the current language too (toolbar.menu.en / sk / de)
    await page.getByRole('menu').last().getByRole('menuitem', {name: LABELS[current].names[language], exact: true}).click();
    await expect(page.getByRole('link', {name: LABELS[language].tasks, exact: true})).toBeVisible();
}

/** the language of the application is a preference of the user (saved on the engine), the tests start in English */
async function ensureEnglish(page: Page) {
    await page.goto('/');
    const languages = Object.keys(LABELS) as Array<Language>;
    const accountButton = (language: Language) => page.getByRole('button', {name: LABELS[language].account, exact: true});
    await expect(accountButton('English').or(accountButton('Slovak')).or(accountButton('German'))).toBeVisible();
    for (const language of languages) {
        if (language !== 'English' && await accountButton(language).isVisible()) {
            await chooseLanguage(page, language, 'English');
        }
    }
}

test.describe('Navigation (NAE)', () => {

    test.beforeEach(async ({page}) => ensureEnglish(page));

    test('NAE-TC-012 Rail the links of the navigation open the views', async ({page}) => {
        await page.goto('/');
        const navigation = page.getByRole('navigation').first();
        for (const [link, path] of [['Cases', '/cases'], ['Tasks', '/tasks'], ['Processes', '/processes']]) {
            await navigation.getByRole('link', {name: link, exact: true}).click();
            await expect(page).toHaveURL(new RegExp(`${path}$`));
            // the breadcrumbs show the opened view
            await expect(page.getByText(link, {exact: true}).last()).toBeVisible();
        }
    });

    test('NAE-TC-012 Rail the Account menu shows the user and the views of the user', async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', {name: 'Account', exact: true}).click();
        const menu = page.getByRole('menu');
        await expect(menu).toContainText('Admin Netgrif');
        await expect(menu).toContainText('super@netgrif.com');
        for (const item of ['Profile', 'Impersonate', 'Role assignment', 'Appearance', 'Language', 'Logout']) {
            await expect(menu.getByRole('menuitem', {name: item, exact: true})).toBeVisible();
        }
        await menu.getByRole('menuitem', {name: 'Profile', exact: true}).click();
        await expect(page).toHaveURL(/\/profile$/);
        await expect(page.getByText('super@netgrif.com').first()).toBeVisible();
    });

    test('NAE-TC-011 Drawer the drawer of the navigation is closed and opened again', async ({page}) => {
        await page.goto('/cases');
        const navigation = page.getByRole('navigation').first();
        await expect(navigation).toBeVisible();
        // the menu button of the rail (the first button of the page, it has no accessible name)
        const menuButton = page.getByRole('button').first();
        await menuButton.click();
        await expect(navigation).toBeHidden();
        await menuButton.click();
        await expect(navigation).toBeVisible();
        await expect(navigation.getByRole('link', {name: 'Cases', exact: true})).toBeVisible();
    });

    test('NAE-TC-017 Toolbar the language changes the labels of the navigation, the menu and the task view', async ({page}) => {
        await page.goto('/tasks');
        await expect(page.getByRole('link', {name: 'Tasks', exact: true})).toBeVisible();
        let current: Language = 'English';
        try {
            for (const language of ['Slovak', 'German'] as Array<Language>) {
                await test.step(language, async () => {
                    await chooseLanguage(page, current, language);
                    current = language;
                    const labels = LABELS[language];
                    for (const link of [labels.cases, labels.tasks, labels.processes]) {
                        await expect(page.getByRole('link', {name: link, exact: true})).toBeVisible();
                    }
                    // the task view is reloaded in the new language (slower with many tasks on the engine)
                    for (const header of labels.headers) {
                        await expect(page.getByRole('button', {name: header, exact: true})).toBeVisible({timeout: 20_000});
                    }
                    await page.getByRole('button', {name: labels.account, exact: true}).click();
                    await expect(page.getByRole('menuitem', {name: labels.profile, exact: true})).toBeVisible();
                    await expect(page.getByRole('menuitem', {name: labels.logout, exact: true})).toBeVisible();
                    await page.keyboard.press('Escape');
                });
            }
        } finally {
            // the language is a preference of the user saved on the engine
            if (current !== 'English') {
                await chooseLanguage(page, current, 'English');
            }
        }
        await expect(page.getByRole('button', {name: 'Priority', exact: true})).toBeVisible();
    });
});

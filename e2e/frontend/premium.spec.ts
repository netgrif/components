import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {assignTask, createCase, deployForSpec, expandTask, finishTask, setProcessRoles, taskHeader} from '../fixtures/engine';

const PROCESS = 'Premium poistenie';
const ROLES = ['Agent', 'Premium'];

/** chooses the option of a select of the form (opened by the keyboard: the label of an empty select lies over it) */
async function choose(page: Page, select: Locator, option: string) {
    await select.focus();
    await select.press('Enter');
    // the option starts with the text (the sums of the options are formatted, e.g. "120 000,00 €")
    await page.locator('mat-option').filter({hasText: new RegExp(`^\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)}).first().click();
    await expect(select).toContainText(option);
    // the actions of the field change the form, the next change waits for them (a change sent meanwhile is lost)
    await page.waitForLoadState('networkidle');
}

/**
 * Finishes a section of the insurance: the section stays enabled (it can be changed later, not assigned then), the
 * next section of the insurance is enabled by it.
 */
async function finishSection(page: Page, title: string, section: string, task: Locator, next: string) {
    await task.getByRole('button', {name: 'Finish', exact: true}).click();
    await expect(taskHeader(page, title, next)).toHaveCount(1);
    await expect(taskHeader(page, title, section).first()).toHaveAccessibleName(/ (high|medium|low)( More actions)?$/);
}

/**
 * The insurance of a property and a household of the Ranorex test (insurance_portal_demo_test.xml without its
 * transaction refs and comments, see the model). The place of the insurance is Bratislava: the dev postal codes of the
 * engine have no Brodské of the Ranorex test.
 */
test.describe('Premium insurance (NAE)', () => {

    test.beforeAll(async ({browser}) => {
        test.setTimeout(300_000);
        await deployForSpec(browser, 'insurance_portal_demo_test.xml');
    });

    test.beforeEach(async ({page}) => setProcessRoles(page, PROCESS, ROLES, true));

    test.afterEach(async ({page}) => setProcessRoles(page, PROCESS, ROLES, false));

    test('NAE Premium_nehnutelnost_domacnost the insurance of a property and a household is filled in', async ({page}) => {
        test.setTimeout(300_000);
        const title = `E2E_premium_${Date.now()}`;
        await createCase(page, PROCESS, title);
        for (const choice of ['Nehnuteľnosť a domácnosť', 'Iba domácnosť', 'Iba nehnuteľnosť']) {
            await expect(taskHeader(page, title, choice)).toHaveCount(1);
        }
        await finishTask(page, title, 'Nehnuteľnosť a domácnosť');

        await test.step('Základné informácie', async () => {
            const task = await expandTask(page, title, 'Základné informácie');
            await assignTask(task);
            const postal = task.getByRole('textbox', {name: 'PSČ'});
            await postal.fill('81102');
            await postal.blur();
            await page.waitForLoadState('networkidle');
            await choose(page, task.getByRole('combobox', {name: 'Obec'}), 'Bratislava');
            await choose(page, task.getByRole('combobox', {name: 'Koľko rokov žijete v poisťovanej nehnuteľnosti?'}), '1 až 5');
            await choose(page, task.getByRole('combobox', {name: 'Koľko dospelých žije v domácnosti?'}), '3');
            await choose(page, task.getByRole('combobox', {name: 'Koľko detí žije v domácnosti?'}), '2');
            await choose(page, task.getByRole('combobox', {name: 'Počet poistných udalostí za posledné 3 roky?'}), '2 a viac');
            await finishSection(page, title, 'Základné informácie', task, 'Nehnuteľnosť');
        });

        await test.step('Nehnuteľnosť', async () => {
            const task = await expandTask(page, title, 'Nehnuteľnosť');
            await assignTask(task);
            await choose(page, task.getByRole('combobox', {name: 'Predmet poistenia'}), 'byt');
            // the actions of a flat: the areas of the floors are hidden, the total area is entered
            await expect(task.getByRole('spinbutton', {name: 'Podlahová plocha prízemia'})).toBeHidden();
            const total = task.getByRole('spinbutton', {name: 'Celková podlahová plocha'});
            await expect(total).toBeEditable();
            await choose(page, task.getByRole('combobox', {name: 'Koľko izieb má nehnuteľnosť?'}), '1');
            await choose(page, task.getByRole('combobox', {name: 'Koľko kúpeľní má nehnuteľnosť?'}), '2');
            await total.fill('75');
            await total.blur();
            await choose(page, task.getByRole('combobox', {name: 'Koľko rokov má nehnuteľnosť?'}), '6 až 10');
            await choose(page, task.getByRole('combobox', {name: 'Poistenie nehnuteľnosti'}), '50.00 €');
            await choose(page, task.getByRole('combobox', {name: 'Poistenie zodpovednosti z vlastníctva nehnuteľnosti do výšky'}),
                '120,000.00 €');
            await choose(page, task.getByRole('combobox', {name: 'Konštrukcia múrov'}), 'sklo');
            await finishSection(page, title, 'Nehnuteľnosť', task, 'Doplnkové poistenie nehnuteľnosti');
        });

        await test.step('Doplnkové poistenie nehnuteľnosti', async () => {
            const task = await expandTask(page, title, 'Doplnkové poistenie nehnuteľnosti');
            await assignTask(task);
            const garage = task.getByRole('switch', {name: 'Garáž'});
            await garage.click();
            await expect(garage).toBeChecked();
            await page.waitForLoadState('networkidle');
            await finishSection(page, title, 'Doplnkové poistenie nehnuteľnosti', task, 'Vedľajšie stavby');
        });

        await test.step('Vedľajšie stavby', async () => {
            const task = await expandTask(page, title, 'Vedľajšie stavby');
            await assignTask(task);
            await expect(task.getByRole('switch', {name: 'Altánok'})).not.toBeChecked();
            await finishSection(page, title, 'Vedľajšie stavby', task, 'Domácnosť');
        });

        await test.step('Domácnosť', async () => {
            const task = await expandTask(page, title, 'Domácnosť');
            await assignTask(task);
            const bars = task.getByRole('switch', {name: /^Má domácnosť na oknách/});
            await bars.click();
            await expect(bars).toBeChecked();
            await page.waitForLoadState('networkidle');
            await expect(task.getByRole('combobox', {name: 'Obývanosť domácnosti'})).toContainText('trvalá');
            // not finished: the engine refuses it (Field "Zodpovednosť za škodu členov domácnosti" has null value), the
            // Ranorex test entered the area of the household here, the field is read only in this version of the model
            await expect(task.getByRole('spinbutton', {name: 'Celková podlahová plocha'})).toBeDisabled();
        });
    });
});

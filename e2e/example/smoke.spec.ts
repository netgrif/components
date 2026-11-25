import {expect, openDemo, test} from '../fixtures/playground';

test.describe('Playground smoke', () => {

    // without the fix of NAE-2509-opravy: DoubleDrawerUtils.findTaskIdInCase reads the task of a menu item without its
    // data task (the account demos), remove the known error when the fix is merged
    test.use({knownConsoleErrors: [/TypeError: Cannot read properties of undefined \(reading 'task'\)/]});

    test('NC-E2E-001 overview lists the demos', async ({page}) => {
        await openDemo(page, '/');
        await expect(page.getByRole('heading', {name: 'Netgrif components playground'})).toBeVisible();
        await expect(page.locator('a.card')).not.toHaveCount(0);
    });

    test('NC-E2E-002 every demo page opens without errors', async ({page}) => {
        test.setTimeout(2 * 60_000);
        await openDemo(page, '/');
        const paths = await page.locator('a.card').evaluateAll(links => links.map(link => link.getAttribute('href')));
        expect(paths.length).toBeGreaterThan(20);
        for (const path of paths) {
            await test.step(path, async () => {
                // client side navigation (the router), a full reload of every page would take minutes
                await page.locator(`a.card[href="${path}"]`).click();
                await expect(page).toHaveURL(url => url.pathname.startsWith(path));
                await expect(page.locator('ne-root router-outlet + *').first()).toBeVisible();
                await page.locator('a.brand').click();
                await expect(page.getByRole('heading', {name: 'Netgrif components playground'})).toBeVisible();
            });
        }
    });
});

import {Page, Request} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {prepareDeploy, runVersion} from '../fixtures/engine';

/** collects the requests of the page to the engine that match, until `stop` is called */
function recordRequests(page: Page, matches: (request: Request) => boolean) {
    const requests: Array<string> = [];
    const listener = (request: Request) => {
        if (matches(request)) {
            requests.push(`${request.method()} ${request.url().replace(/[0-9a-f]{24}/g, '<id>')}`);
        }
    };
    page.on('request', listener);
    return {
        requests,
        stop: () => {
            page.off('request', listener);
            test.info().annotations.push({type: 'requests', description: requests.join('\n')});
        }
    };
}

/** the data of a task with the field (the body of the set data request is {taskId: {fieldId: ...}}) */
function setsField(request: Request, field: string): boolean {
    if (request.method() !== 'POST' || !/\/api\/task\/[^/]+\/data$/.test(request.url())) {
        return false;
    }
    return Object.values(request.postDataJSON() ?? {}).some(fields => !!fields && field in (fields as object));
}

/**
 * Guards of the number of the requests to the engine: a view that loads or saves its data more times than needed is
 * slower for every user and loads the engine. The numbers are the expected ones, the known bugs are marked by test.fail.
 */
test.describe('Requests to the engine (NAE)', () => {

    test('NC-E2E-011 Requests the case view loads the page of its cases once', async ({page}) => {
        // fails: the case view of netgrif-frontend loads the first page of the cases twice when it is opened
        test.fail();
        const list = recordRequests(page, request => request.url().includes('/case/search') && request.url().includes('size=20'));
        await page.goto('/cases');
        await expect(page.getByRole('button', {name: 'New case', exact: true})).toBeVisible({timeout: 30_000});
        await page.waitForLoadState('networkidle');
        list.stop();
        expect(list.requests).toHaveLength(1);
    });

    test('NC-E2E-011 Requests the builder saves the imported model once and once more for the changed version', async ({page}) => {
        // fails: the builder sends the whole XML of the model (xml_text of the process case) five times for the import and
        // the change of the version, a big model is sent as many times
        test.fail();
        test.setTimeout(180_000);
        const saves = recordRequests(page, request => setsField(request, 'xml_text'));
        await prepareDeploy(page, 'all_data.xml', runVersion());
        await page.waitForLoadState('networkidle');
        saves.stop();
        expect(saves.requests.length).toBeLessThanOrEqual(2);
    });
});

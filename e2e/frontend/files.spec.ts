import * as fs from 'fs';
import {Locator, Page} from '@playwright/test';
import {expect, test} from '../fixtures/playground';
import {assignTask, createCase, deployForSpec, expandTask, finishTask} from '../fixtures/engine';

const PROCESS = 'E2E files';

/** writes a text file of the test (test-results) and returns its path */
function textFile(name: string, content: string): string {
    const file = test.info().outputPath(name);
    fs.writeFileSync(file, content);
    return file;
}

/** uploads the files through the file chooser of the field ("choose a file" / "choose files") */
async function upload(page: Page, field: Locator, files: Array<string>) {
    const chooser = page.waitForEvent('filechooser');
    await field.getByRole('button', {name: /^choose (a file|files)$/}).click();
    await (await chooser).setFiles(files);
}

/**
 * The icon button of the file (download, delete): the buttons have no accessible name, only a tooltip (open bug), they
 * are found by their icon.
 */
function fileButton(field: Locator, name: string, icon: 'download' | 'delete'): Locator {
    return field.locator('.file-line').filter({hasText: name}).getByRole('button')
        .filter({has: field.page().locator('mat-icon', {hasText: icon})});
}

/** downloads the file of the field by its name and returns the content */
async function download(page: Page, field: Locator, name: string): Promise<string> {
    const downloaded = page.waitForEvent('download');
    await field.getByRole('button', {name, exact: true}).click();
    const file = await (await downloaded).path();
    return fs.readFileSync(file, 'utf8');
}

/**
 * The file fields with the storage of the engine (MinIO): a file and a file list are uploaded, a file of the list is
 * deleted, the files stay with the case and are downloaded with their content in the next task (visible fields).
 */
test.describe('Files (NAE)', () => {

    test.beforeAll(async ({browser}) => deployForSpec(browser, 'e2e_files.xml'));

    test('NC-E2E-006 Files the file and the file list are uploaded, deleted and downloaded with their content', async ({page}) => {
        test.setTimeout(120_000);
        const title = `Files${Date.now()}`;
        const content = `document of ${title}`;
        await createCase(page, PROCESS, title);

        const task = await expandTask(page, title, 'Upload');
        await assignTask(task);
        const document = task.getByRole('group', {name: 'Document', exact: true});
        await upload(page, document, [textFile('document.txt', content)]);
        await expect(document.getByRole('button', {name: 'document.txt', exact: true})).toBeVisible();

        const attachments = task.getByRole('group', {name: 'Attachments', exact: true});
        await upload(page, attachments, [textFile('first.txt', 'first'), textFile('second.txt', 'second')]);
        await expect(attachments.getByRole('button', {name: 'first.txt', exact: true})).toBeVisible();
        await expect(attachments.getByRole('button', {name: 'second.txt', exact: true})).toBeVisible();

        // the delete button of the file in the list (the icon button next to its name)
        await fileButton(attachments, 'first.txt', 'delete').click();
        await expect(attachments.getByRole('button', {name: 'first.txt', exact: true})).toHaveCount(0);
        await expect(attachments.getByRole('button', {name: 'second.txt', exact: true})).toBeVisible();
        await finishTask(page, title, 'Upload', task);

        // the next task shows the stored files (visible: no upload, no delete) and they are downloaded from the engine
        const check = await expandTask(page, title, 'Check');
        const shown = check.getByRole('group', {name: 'Document', exact: true});
        await expect(shown.getByRole('button', {name: 'document.txt', exact: true})).toBeVisible();
        await expect(fileButton(shown, 'document.txt', 'delete')).toHaveCount(0);
        expect(await download(page, shown, 'document.txt')).toBe(content);

        const list = check.getByRole('group', {name: 'Attachments', exact: true});
        await expect(list.getByRole('button', {name: 'first.txt', exact: true})).toHaveCount(0);
        expect(await download(page, list, 'second.txt')).toBe('second');
        await expect(list.getByRole('button', {name: /^choose/})).toHaveCount(0);
    });
});

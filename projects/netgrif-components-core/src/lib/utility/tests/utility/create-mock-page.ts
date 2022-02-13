import {Page} from '../../../resources/interface/page';

/**
 * @param content the contents of the page
 * @returns a mock Page object with the size equivalent to the number of elements provided in the attribute.
 * If the content is empty the `content` attribute of the returned object is set to an empty object to mimic backend behavior.
 */
export function createMockPage<T>(content: Array<T> = []): Page<T> {
    const page: Page<T> = {
        content: {} as any,
        pagination: {
            size: 1,
            totalElements: 0,
            totalPages: 1,
            number: 0
        }
    };
    if (content.length > 0) {
        page.content = content;
        page.pagination.size = content.length;
        page.pagination.totalElements = content.length;
    }
    return page;
}

import {Page} from '../../resources/interface/page';

/**
 * @param page a {@link Page} of objects returned by backend
 * @returns returns `true` if the page is defined and has content with non-zero length. Returns `false` otherwise.
 */
export function hasContent(page: Page<unknown> | undefined): boolean {
    return !!page && !!page.content && Array.isArray(page.content) && page.content.length > 0;
}

import {TranslateService} from '@ngx-translate/core';
import {HeaderColumn, HeaderColumnType} from '@netgrif/components-core';
import {createSortLabel} from './sort-label';

describe('createSortAriaLabel', () => {
    const translations = {
        'header.title': 'Title',
        'headers.sortDirections.none': 'Not sorted',
        'headers.sortDirections.ascending': 'Ascending',
        'headers.sortDirections.descending': 'Descending',
    };
    const translate = {
        instant: (key: string, params?: Record<string, string>) => key === 'headers.sortControl'
            ? `Sort ${params.title}. Current: ${params.current}. Next: ${params.next}.`
            : translations[key] ?? key,
    } as TranslateService;

    it('announces the current direction and the next action', () => {
        const header = new HeaderColumn(HeaderColumnType.META, 'title', 'header.title', 'text');

        expect(createSortLabel(header, translate)).toContain('Current: Not sorted. Next: Ascending.');
        header.sortDirection = 'asc';
        expect(createSortLabel(header, translate)).toContain('Current: Ascending. Next: Descending.');
        header.sortDirection = 'desc';
        expect(createSortLabel(header, translate)).toContain('Current: Descending. Next: Not sorted.');
    });
});

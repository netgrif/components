import {TranslateService} from '@ngx-translate/core';
import {HeaderColumn} from '@netgrif/components-core';

export function createSortLabel(header: HeaderColumn, translate: TranslateService): string {
    const currentDirection = directionKey(header.sortDirection);
    const nextDirection = header.sortDirection === 'asc'
        ? 'descending'
        : header.sortDirection === 'desc' ? 'none' : 'ascending';

    return translate.instant('headers.sortControl', {
        title: translate.instant(header.title),
        current: translate.instant(`headers.sortDirections.${currentDirection}`),
        next: translate.instant(`headers.sortDirections.${nextDirection}`),
    });
}

function directionKey(direction: HeaderColumn['sortDirection']): 'none' | 'ascending' | 'descending' {
    if (direction === 'asc') {
        return 'ascending';
    }
    if (direction === 'desc') {
        return 'descending';
    }
    return 'none';
}

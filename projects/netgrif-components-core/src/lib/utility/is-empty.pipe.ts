import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'isEmpty',
})
export class IsEmptyPipe implements PipeTransform {

    /**
     * Check if is value is empty.
     * @param value
     * @returns True for:
     *  - null
     *  - undefined
     *  - Array if Array.length === 0
     *  - String if string.length === 0
     *  - Object with no keys
     *  - (Set | Map).size === 0
     *  otherwise false.
     */
    transform(value: Array<unknown> | Object | string | Set<unknown> | Map<unknown, unknown>): boolean {
        if (value === null || value === undefined) return true;
        if (Array.isArray(value)) return (value as Array<unknown>).length === 0;
        if (value instanceof Set) return value.size === 0;
        if (value instanceof Map) return value.size === 0;
        if ((typeof value) === 'string') return (value as string).length === 0;
        if ((typeof value) === 'object') return Object.keys(value).length === 0;
        return false;
    }

}

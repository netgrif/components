import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'isEmpty',
})
export class IsEmptyPipe implements PipeTransform {

    /**
     * Check if is value is empty.
     * @param value
     * @returns True for, Array if Array.length === 0 or String if String.length === 0 or Object has no keys, otherwise false.
     */
    transform(value: Array<unknown> | Object | string): boolean {
        if (value === null || value === undefined) return false;
        if (Array.isArray(value)) return (value as Array<unknown>).length === 0;
        if ((typeof value) === 'string') return (value as string).length === 0;
        if ((typeof value) === 'object') return Object.keys(value).length === 0;
        return false;
    }

}

import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'contains',
    standalone: false
})
export class ContainsPipe implements PipeTransform {

    transform(value: Array<unknown> | Set<unknown> | Map<unknown, unknown>, toCheck: unknown): boolean {
        if (value === null || value === undefined) return false;
        if (Array.isArray(value)) return value.includes(toCheck);
        if (value instanceof Set || value instanceof Map) return value.has(toCheck);
        return false;
    }
}

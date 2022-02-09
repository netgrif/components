/**
 * Simple class that generalizes filtering of array of elements.
 * Filtered Results are contained in a separate array and can be bound to HTML.
 * @typeparam T type of elements contained in the arrays.
 */
export class FilteredArray<T> {

    /**
     * Contains all the elements from the provided array, that match the provided predicate.
     */
    public filtered: Array<T>;

    /**
     * @param _unfiltered elements that can be filtered
     * @param _filterPredicate predicate that is used to filter elements of the provided array. It should return `true` if `item` with
     * the given `data` should appear in the filtered array.
     */
    constructor(private _unfiltered: Array<T>, private _filterPredicate: (item: T, data: any) => boolean) {
        this.filtered = [];
        this.filtered.push(...this._unfiltered);
    }

    /**
     * Applies the filter predicate on all items of the unfiltered array.
     * Each item that returns `true` will be included in the filtered array.
     * @param data data that is sent to the {@link FilteredArray#_filterPredicate} for evaluation
     */
    public filter(data: any): void {
        this.filtered.splice(0, this.filtered.length);
        this._unfiltered.forEach(item => {
            if (this._filterPredicate(item, data)) {
                this.filtered.push(item);
            }
        });
    }
}

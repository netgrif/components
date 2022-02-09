/**
 * A utility class that carries an operation result of any type
 * along with executable after actions that should be performed at a later time.
 */
export class ResultWithAfterActions<T> {

    /**
     * @param _result the result of an operation
     * @param _afterActions the lambdas that should be executed at some later time. Defaults to an empty array.
     */
    constructor(protected _result: T, protected _afterActions: Array<() => void> = []) {
    }

    /**
     * The result of an operations.
     */
    public get result(): T {
        return this._result;
    }

    /**
     * Executes all the after action lambdas.
     */
    public executeAfterActions(): void {
        this._afterActions.forEach(action => action());
    }
}

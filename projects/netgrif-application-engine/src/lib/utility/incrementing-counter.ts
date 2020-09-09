/**
 * A counter that returns an incremented value, whenever it is called
 */
export class IncrementingCounter {
    private i = 0;

    /**
     * @returns a number one greater than the previous number. The first call to this method returns `0`.
     */
    public next(): number {
        return this.i++;
    }

    /**
     * @returns the last returned number. If no call to [next()]{@link IncrementingCounter#next} has been made, returns `-1`.
     */
    public lastUsed(): number {
        return this.i - 1;
    }
}

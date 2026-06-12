import {History} from './history';

describe('History', () => {
    let history: History<string>;

    beforeEach(() => {
        history = new History<string>();
    });

    it('should start empty', () => {
        expect(history.size).toBe(0);
        expect(history.record).toBeUndefined();
    });

    it('should push a record and expose it', () => {
        history.push('state-1', 'first change');
        expect(history.size).toBe(1);
        expect(history.record).toBe('state-1');
    });

    it('should push multiple records in order', () => {
        history.push('state-1', 'a');
        history.push('state-2', 'b');
        history.push('state-3', 'c');
        expect(history.size).toBe(3);
        expect(history.record).toBe('state-3');
    });

    it('undo should move head back one step', () => {
        history.push('state-1', 'a');
        history.push('state-2', 'b');
        const result = history.undo();
        expect(result).toBe('state-1');
        expect(history.record).toBe('state-1');
    });

    it('undo at the beginning should return undefined', () => {
        history.push('state-1', 'a');
        history.undo();
        const result = history.undo();
        expect(result).toBeUndefined();
    });

    it('redo should move head forward one step', () => {
        history.push('state-1', 'a');
        history.push('state-2', 'b');
        history.undo();
        const result = history.redo();
        expect(result).toBe('state-2');
        expect(history.record).toBe('state-2');
    });

    it('redo at the end should return undefined', () => {
        history.push('state-1', 'a');
        const result = history.redo();
        expect(result).toBeUndefined();
    });

    it('push after undo should truncate future', () => {
        history.push('state-1', 'a');
        history.push('state-2', 'b');
        history.push('state-3', 'c');
        history.undo();
        history.undo();
        history.push('state-x', 'branch');
        expect(history.size).toBe(2);
        expect(history.record).toBe('state-x');
        expect(history.redo()).toBeUndefined();
    });

    it('isUpToDate should be true when at latest record', () => {
        history.push('state-1', 'a');
        history.push('state-2', 'b');
        expect(history.isUpToDate()).toBeTrue();
        history.undo();
        expect(history.isUpToDate()).toBeFalse();
    });

    it('isFull should be true when limit is reached', () => {
        const limited = new History<string>(3);
        limited.push('a', ''); limited.push('b', ''); limited.push('c', '');
        expect(limited.isFull()).toBeTrue();
    });

    it('should evict oldest record when full', () => {
        const limited = new History<string>(3);
        limited.push('a', ''); limited.push('b', ''); limited.push('c', '');
        limited.push('d', '');
        expect(limited.size).toBe(3);
        expect(limited.memory[0].record).toBe('b');
        expect(limited.record).toBe('d');
    });
});

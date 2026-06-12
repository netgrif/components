import {MenuItem} from './menu-item';

describe('MenuItem', () => {
    it('should create an instance', () => {
        expect(new MenuItem('test-id', 'Test Title')).toBeTruthy();
    });

    it('should store id and title', () => {
        const item = new MenuItem('my-id', 'My Title');
        expect(item.id).toBe('my-id');
        expect(item.title).toBe('My Title');
    });
});

import {DatafieldMapKey} from './datafield-map-key';
import {TestBed} from '@angular/core/testing';

describe('DatafieldMapKey', () => {
    it('should create an instance', () => {
        expect(new DatafieldMapKey('', '')).toBeTruthy();
    });

    it('should serialize', () => {
        const key = new DatafieldMapKey('type', 'title');
        expect(key.toSerializedForm()).toBeTruthy();
        expect(key.toSerializedForm()).toBe('type#title');
    });

    it('should deserialize', () => {
        const key = DatafieldMapKey.parse('type#title');
        expect(key).toBeTruthy();
        expect(key.type).toBe('type');
        expect(key.title).toBe('title');
    });

    it('should deserialize title with #', () => {
        const key = DatafieldMapKey.parse('type#title#hash');
        expect(key).toBeTruthy();
        expect(key.type).toBe('type');
        expect(key.title).toBe('title#hash');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

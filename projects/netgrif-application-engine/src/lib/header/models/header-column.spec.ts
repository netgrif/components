import {HeaderColumn, HeaderColumnType} from './header-column';

describe('HeaderColumn', () => {
    it('should create an instance', () => {
        expect(new HeaderColumn(HeaderColumnType.META, '', '', '')).toBeTruthy();
    });
});

import {SideMenuControl} from './side-menu-control';
import {of} from 'rxjs';

describe('SideMenuControl', () => {
    it('should create an instance', () => {
        expect(new SideMenuControl(() => console.log(), of(true), undefined)).toBeTruthy();
    });
});

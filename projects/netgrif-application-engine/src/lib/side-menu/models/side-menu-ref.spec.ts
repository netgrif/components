import {Subject} from 'rxjs';
import {SideMenuRef} from './side-menu-ref';
import {SideMenuEvent} from './side-menu-event';

describe('SideMenuRef', () => {
    it('should create an instance', () => {
        expect(new SideMenuRef(new Subject<SideMenuEvent>())).toBeTruthy();
    });
});

import {SideMenuControl} from './side-menu-control';
import {of} from 'rxjs';
import {TestBed} from '@angular/core/testing';

describe('SideMenuControl', () => {
    it('should create an instance', () => {
        expect(new SideMenuControl(() => console.log(), of(true), undefined)).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

import {OpenedTab} from './opened-tab';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

describe('OpenedTab', () => {
    it('should create an instance', () => {
        expect(new OpenedTab({
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: false,
            tabContentComponent: TabTestComponent
        }, 'id')).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-tab-test-component',
    template: '<div></div>'
})
export class TabTestComponent {
}


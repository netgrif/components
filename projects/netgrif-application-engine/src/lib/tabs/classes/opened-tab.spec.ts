import { OpenedTab } from './opened-tab';
import {Component} from '@angular/core';

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
});

@Component({
    selector: 'nae-tab-test-component',
    template: '<div></div>'
})
export class TabTestComponent {}


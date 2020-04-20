import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuickPanelComponent} from './quick-panel.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {InternalLinkComponent} from './internal-link/internal-link.component';
import {LogoutShortcutComponent} from './logout-shortcut/logout-shortcut.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';

describe('QuickPanelComponent', () => {
    let component: QuickPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                QuickPanelComponent,
                LanguageSelectorComponent,
                InternalLinkComponent,
                LogoutShortcutComponent,
                TestWrapperComponent
            ],
            imports: [
                CommonModule,
                RouterTestingModule,
                MaterialModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-quick-panel [items]="items"></nae-quick-panel>'
})
class TestWrapperComponent {
    items = [];
}



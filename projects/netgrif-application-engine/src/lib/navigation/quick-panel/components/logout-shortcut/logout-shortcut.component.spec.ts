import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutShortcutComponent} from './logout-shortcut.component';
import {MaterialModule} from '../../../../material/material.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../../quick-panel.module';
import {UserModule} from '../../../../user/user.module';

describe('LogoutShortcutComponent', () => {
    let component: LogoutShortcutComponent;
    let fixture: ComponentFixture<LogoutShortcutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LogoutShortcutComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutShortcutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

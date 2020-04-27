import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuickPanelComponent} from './quick-panel.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../quick-panel.module';
import {UserModule} from '../../../user/user.module';

describe('QuickPanelComponent', () => {
    let component: QuickPanelComponent;
    let fixture: ComponentFixture<QuickPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickPanelComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

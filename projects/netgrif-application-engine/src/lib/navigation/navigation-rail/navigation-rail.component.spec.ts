import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationRailComponent} from './navigation-rail.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../quick-panel/quick-panel.module';
import {UserModule} from '../../user/user.module';

describe('NavigationRailComponent', () => {
    let component: NavigationRailComponent;
    let fixture: ComponentFixture<NavigationRailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationRailComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelModule,
                UserModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationRailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

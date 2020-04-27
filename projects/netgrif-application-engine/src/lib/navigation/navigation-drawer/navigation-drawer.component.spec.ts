import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationDrawerComponent} from './navigation-drawer.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../quick-panel/quick-panel.module';
import {UserModule} from '../../user/user.module';

describe('NavigationDrawerComponent', () => {
    let component: NavigationDrawerComponent;
    let fixture: ComponentFixture<NavigationDrawerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationDrawerComponent],
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
        fixture = TestBed.createComponent(NavigationDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

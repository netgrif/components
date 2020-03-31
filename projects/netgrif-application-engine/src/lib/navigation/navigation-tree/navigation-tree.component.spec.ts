import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationTreeComponent} from './navigation-tree.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../quick-panel/quick-panel.module';
import {UserModule} from '../../user/user.module';

describe('NavigationTreeComponent', () => {
    let component: NavigationTreeComponent;
    let fixture: ComponentFixture<NavigationTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationTreeComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelModule,
                UserModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

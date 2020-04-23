import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationRailComponent} from './navigation-rail.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../quick-panel/quick-panel.module';
import {UserModule} from '../../user/user.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
                UserModule,
                BrowserAnimationsModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationRailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open, close and toggle', () => {
        let count = 0;
        component.expandChange.subscribe(res  => {
            if (count % 2 === 0) {
                expect(res).toEqual(true);
            } else {
                expect(res).toEqual(false);
            }
            count++;
        });

        component.open();
        component.close();
        component.toggle();
    });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationDrawerComponent} from './navigation-drawer.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../quick-panel/quick-panel.module';
import {UserModule} from '../../user/user.module';
import {NavigationTreeComponent} from '../navigation-tree/navigation-tree.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('NavigationDrawerComponent', () => {
    let component: NavigationDrawerComponent;
    let fixture: ComponentFixture<NavigationDrawerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationDrawerComponent, NavigationTreeComponent],
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
        fixture = TestBed.createComponent(NavigationDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open, close and toggle', async () => {
        await component.open().then(res  => {
            expect(res).toEqual('open');
        });

        await component.close().then(res  => {
            expect(res).toEqual('open');
        });

        await component.toggle().then(res  => {
            expect(res).toEqual('open');
        });
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

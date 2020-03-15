import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SideMenuContainerComponent} from './side-menu-container.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SideMenuContainerComponent', () => {
    let component: SideMenuContainerComponent;
    let fixture: ComponentFixture<SideMenuContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MaterialModule,
                BrowserAnimationsModule
            ],
            declarations: [SideMenuContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

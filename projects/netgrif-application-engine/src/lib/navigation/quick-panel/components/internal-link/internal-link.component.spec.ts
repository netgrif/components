import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InternalLinkComponent} from './internal-link.component';
import {MaterialModule} from '../../../../material/material.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../../quick-panel.module';
import {UserModule} from '../../../../user/user.module';

describe('InternalLinkComponent', () => {
    let component: InternalLinkComponent;
    let fixture: ComponentFixture<InternalLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InternalLinkComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InternalLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

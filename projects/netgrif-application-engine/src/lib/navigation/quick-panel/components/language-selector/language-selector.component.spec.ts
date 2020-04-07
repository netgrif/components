import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectorComponent} from './language-selector.component';
import {MaterialModule} from '../../../../material/material.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../../quick-panel.module';
import {UserModule} from '../../../../user/user.module';

describe('LanguageSelectorComponent', () => {
    let component: LanguageSelectorComponent;
    let fixture: ComponentFixture<LanguageSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LanguageSelectorComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LanguageSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

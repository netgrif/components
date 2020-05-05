import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CasePanelComponent} from './case-panel.component';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsModule} from '../../data-fields/data-fields.module';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {PanelComponent} from '../panel.component';
import {of} from 'rxjs';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {CaseMetaField} from '../../header/case-header/case-header.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CasePanelComponent', () => {
    let component: CasePanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                DataFieldsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            declarations: [CasePanelComponent, PanelComponent, TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('show', () => {
        expect(component.show(new MouseEvent('type'))).toEqual(false);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-case-panel [selectedHeaders$]="selectedHeaders" [case_]="case_"> </nae-case-panel>'
})
class TestWrapperComponent {
    selectedHeaders =  of([
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.VISUAL_ID, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'date', 'string', 'string', 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'string', 'string', 'string', 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'dateTime', 'string', 'string', 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'enum', 'string', 'string', 'netid'),
    ]);
    case_ = {
        stringId: 'string',
        title: 'string',
        identifier: 'string',
        version: 'string',
        initials: 'string',
        defaultCaseName: 'string',
        createdDate: [2020, 1, 1, 10, 10],
        author: {email: 'email', fullName: 'fullName'},
        immediateData: [
            {stringId: 'date', title: 'string', type: 'date', value: [2020, 1, 1, 10, 10]},
            {stringId: 'string', title: 'string', type: 'string', value: 'dasdsadsad'},
            {stringId: 'dateTime', title: 'string', type: 'dateTime', value: [2020, 1, 1, 10, 10]},
            {stringId: 'enum', title: 'string', type: 'enumeration', value: { defaultValue: 'dasd'}},
        ]
    };
}

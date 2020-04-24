import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditModeComponent} from './edit-mode.component';
import {MatSelectModule, MatSortModule} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseHeaderService, CaseMetaField} from '../../case-header/case-header.service';
import {Component} from '@angular/core';
import {HeaderColumn, HeaderColumnType} from '../../models/header-column';

describe('EditModeComponent', () => {
    let component: EditModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditModeComponent, TestWrapperComponent],
            imports: [FlexModule, FlexLayoutModule, MatSortModule, NoopAnimationsModule, MatSelectModule],
            providers: [CaseHeaderService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'headerColumnSelected');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call headerColumnSelected', () => {
        component.headerColumnSelected(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));
        expect(headerSpy).toHaveBeenCalledWith(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-edit-mode [headerService]="service"></nae-edit-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}

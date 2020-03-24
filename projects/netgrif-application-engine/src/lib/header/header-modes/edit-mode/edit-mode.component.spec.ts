import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditModeComponent} from './edit-mode.component';
import {MatFormFieldModule, MatSelectModule, MatSortModule} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SortModeComponent} from '../sort-mode/sort-mode.component';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {Component} from '@angular/core';

describe('EditModeComponent', () => {
    let component: EditModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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

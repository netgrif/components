import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SortModeComponent} from './sort-mode.component';
import {FlexModule} from '@angular/flex-layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSortModule} from '@angular/material';
import {Component} from '@angular/core';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SortModeComponent', () => {
    let component: SortModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SortModeComponent, TestWrapperComponent],
            imports: [FlexModule, FlexLayoutModule, MatSortModule, NoopAnimationsModule],
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
    template: '<nae-sort-mode [headerService]="service"></nae-sort-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}

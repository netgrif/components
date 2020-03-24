import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchModeComponent} from './search-mode.component';
import {MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {CaseHeaderService} from '../../case-header/case-header.service';

describe('SearchModeComponent', () => {
    let component: SearchModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchModeComponent, TestWrapperComponent],
            imports: [
                MatInputModule,
                FlexModule,
                FlexLayoutModule,
                MatSortModule,
                NoopAnimationsModule,
                MatSelectModule,
                MatFormFieldModule
            ],
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
    template: '<nae-search-mode [headerService]="service"></nae-search-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}

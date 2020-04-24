import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchModeComponent} from './search-mode.component';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSortModule
} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {CaseHeaderService} from '../../case-header/case-header.service';

describe('SearchModeComponent', () => {
    let component: SearchModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

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
                MatFormFieldModule,
                MatDatepickerModule,
                MatNativeDateModule
            ],
            providers: [CaseHeaderService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'headerSearchInputChanged');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call search header', () => {
        component.headerSearchInputChanged(0, 'hladaj');
        expect(headerSpy).toHaveBeenCalledWith(0, 'hladaj');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
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

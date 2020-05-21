import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SortModeComponent} from './sort-mode.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatSortModule} from '@angular/material';
import {Component} from '@angular/core';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {of} from 'rxjs';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SortModeComponent', () => {
    let component: SortModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SortModeComponent, TestWrapperComponent],
            imports: [FlexModule, FlexLayoutModule, MatSortModule, NoopAnimationsModule,
                TranslateLibModule, HttpClientTestingModule],
            providers: [
                CaseHeaderService,
                {provide: CaseViewService, useValue: {allowedNets$: of([])}}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'sortHeaderChanged');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call sort header changed', () => {
        component.sortHeaderChanged({active: '', direction: 'asc'});
        expect(headerSpy).toHaveBeenCalledWith('', 'asc');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
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


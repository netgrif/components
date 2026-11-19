import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@ngbracket/ngx-layout';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, NO_ERRORS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {MaterialModule} from '../material/material.module';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {AbstractPanelComponent} from './abstract-panel.component';
import {CaseListFontColorService} from '../utility/service/case-list-font-color.service';
import { RouterTestingModule } from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractPanelComponent', () => {
    let component: TestPanelComponent;
    let fixture: ComponentFixture<TestPanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestPanelComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-panel',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestPanelComponent extends AbstractPanelComponent {
    constructor(protected _caseListFontColorService: CaseListFontColorService) {
        super(_caseListFontColorService);
    }
}

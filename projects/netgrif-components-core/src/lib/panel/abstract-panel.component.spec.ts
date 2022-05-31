import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../material/material.module';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {AbstractPanelComponent} from './abstract-panel.component';
import {CaseListFontColorService} from '../utility/service/case-list-font-color.service';

describe('AbstractPanelComponent', () => {
    let component: TestPanelComponent;
    let fixture: ComponentFixture<TestPanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            declarations: [TestPanelComponent],
            schemas: [NO_ERRORS_SCHEMA]
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
    template: ''
})
class TestPanelComponent extends AbstractPanelComponent {
    constructor(protected _caseListFontColorService: CaseListFontColorService) {
        super(_caseListFontColorService);
    }
}

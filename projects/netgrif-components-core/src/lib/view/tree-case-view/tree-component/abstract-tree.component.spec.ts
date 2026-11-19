import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractTreeComponent} from './abstract-tree.component';
import {CaseTreeService} from './case-tree.service';
import {MaterialModule} from '../../../material/material.module';
import {TreeCaseViewService} from '../tree-case-view.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TreeComponent', () => {
    let component: TestTreeComponent;
    let fixture: ComponentFixture<TestTreeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestTreeComponent],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                TreeCaseViewService,
                CaseTreeService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTreeComponent);
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
    selector: 'ncc-test-tree',
    template: '',
    providers: [CaseTreeService],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestTreeComponent extends AbstractTreeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}

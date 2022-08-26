import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractTreeComponent} from './abstract-tree.component';
import {CaseTreeService} from './case-tree.service';
import {MaterialModule} from '../../../material/material.module';
import {TreeCaseViewService} from '../tree-case-view.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../../translate/translate-lib.module';

describe('TreeComponent', () => {
    let component: TestTreeComponent;
    let fixture: ComponentFixture<TestTreeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            providers: [
                TreeCaseViewService,
                CaseTreeService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestTreeComponent]
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
    providers: [CaseTreeService]
})
class TestTreeComponent extends AbstractTreeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}

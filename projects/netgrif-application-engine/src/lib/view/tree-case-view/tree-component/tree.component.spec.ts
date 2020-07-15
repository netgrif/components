import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TreeComponent} from './tree.component';
import {MaterialModule} from '../../../material/material.module';
import {TreeCaseViewModule} from '../tree-case-view.module';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TreeCaseViewService} from '../tree-case-view.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TreeComponent', () => {
    let component: TreeComponent;
    let fixture: ComponentFixture<TreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, TreeCaseViewModule, NoopAnimationsModule],
            providers: [
                TreeCaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
                ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

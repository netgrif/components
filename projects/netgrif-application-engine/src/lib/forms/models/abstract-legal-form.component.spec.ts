import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {AbstractLegalFormComponent} from './abstract-legal-form.component';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('AbstractLegalFormComponent ', () => {
    let component: TestLegalFormComponent;
    let fixture: ComponentFixture<TestLegalFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [TestLegalFormComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestLegalFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-legal',
    template: ''
})
class TestLegalFormComponent extends AbstractLegalFormComponent {
    constructor(config: ConfigurationService) {
        super(config);
    }
}

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextComponent} from './immediate-filter-text.component';
import {
    MaterialModule,
    ConfigurationService,
    TestConfigurationService, AllowedNetsService, TestNoAllowedNetsFactory, AllowedNetsServiceFactory,
} from '@netgrif/components-core';
import {PanelComponentModule} from '../../panel.module';
import {Component} from '@angular/core';

describe('ImmediateFilterTextComponent', () => {
    let component: ImmediateFilterTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [
                MaterialModule,
                PanelComponentModule
            ], providers: [
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-immediate-filter-text [ellipsis]="true" [query]="\'cases: creationDate eq 2026-08-31\'" [type]="\'case\'" ></nc-immediate-filter-text>'
})
class TestWrapperComponent {

    constructor() {
    }
}

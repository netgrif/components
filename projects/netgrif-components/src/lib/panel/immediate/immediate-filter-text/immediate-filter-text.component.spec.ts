import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextComponent} from './immediate-filter-text.component';
import {
    MaterialModule,
    ConfigurationService,
    TestConfigurationService,
    FilterMetadataAllowedNets,
    FilterType
} from '@netgrif/application-engine';
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-immediate-filter-text [ellipsis]="true" [filterMetadata]="filterMetadata"></nc-immediate-filter-text>'
})
class TestWrapperComponent {

    public filterMetadata: FilterMetadataAllowedNets = {
        allowedNets: [],
        filterMetadata: {
            predicateMetadata: [],
            filterType: FilterType.CASE,
            searchCategories: []
        }
    };

    constructor() {
    }
}

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextComponent} from './immediate-filter-text.component';
import {
    MaterialModule,
    ConfigurationService,
    TestConfigurationService,
} from '@netgrif/application-engine';
import {PanelComponentModule} from '../../panel.module';

describe('ImmediateFilterTextComponent', () => {
    let component: ImmediateFilterTextComponent;
    let fixture: ComponentFixture<ImmediateFilterTextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
        fixture = TestBed.createComponent(ImmediateFilterTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

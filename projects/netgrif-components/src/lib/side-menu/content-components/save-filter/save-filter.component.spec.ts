import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SaveFilterComponent} from './save-filter.component';
import {
    ConfigurationService,
    MaterialModule,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    TestConfigurationService
} from '@netgrif/application-engine';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SaveFilterComponent', () => {
    let component: SaveFilterComponent;
    let fixture: ComponentFixture<SaveFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [SaveFilterComponent],
            providers: [
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(undefined, undefined, () => of('close'), {allowedNets$: of([])})
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SaveFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

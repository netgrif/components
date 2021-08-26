import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RedirectComponent} from './redirect.component';
import {RouterTestingModule} from '@angular/router/testing';
import {
    ConfigurationService,
    TestConfigurationService,
    TranslateLibModule,
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RedirectComponent', () => {
    let component: RedirectComponent;
    let fixture: ComponentFixture<RedirectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                TranslateLibModule,
                HttpClientTestingModule,
            ],
            declarations: [RedirectComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RedirectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

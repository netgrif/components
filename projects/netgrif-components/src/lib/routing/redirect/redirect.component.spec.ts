import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RedirectComponent} from './redirect.component';
import {RouterTestingModule} from '@angular/router/testing';
import {
    ConfigurationService,
    TestConfigurationService,
    TranslateLibModule,
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('RedirectComponent', () => {
    let component: RedirectComponent;
    let fixture: ComponentFixture<RedirectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RedirectComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                TranslateLibModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RedirectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

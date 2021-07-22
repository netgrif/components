import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RedirectComponent} from './redirect.component';
import {RouterTestingModule} from '@angular/router/testing';
import {
    ConfigurationService,
    TestConfigurationService
} from '@netgrif/application-engine';

describe('RedirectComponent', () => {
    let component: RedirectComponent;
    let fixture: ComponentFixture<RedirectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
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

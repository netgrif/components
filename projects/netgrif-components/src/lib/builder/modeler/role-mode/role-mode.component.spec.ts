import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RoleMasterDetailService} from './role-master-detail.service';
import {RoleModeComponent} from './role-mode.component';
import {TranslateService} from "@ngx-translate/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";
import {BuilderModeService} from "../../services/builder-mode.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('RoleModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoleModeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [TranslateLibModule],
            providers: [
                {provide: RoleMasterDetailService, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                BuilderModeService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(RoleModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

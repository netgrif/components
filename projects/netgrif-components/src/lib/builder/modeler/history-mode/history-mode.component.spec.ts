import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HistoryMasterDetailService} from './history-master-detail.service';
import {HistoryModeComponent} from './history-mode.component';
import {TranslateService} from "@ngx-translate/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('HistoryModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HistoryModeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [TranslateLibModule],
            providers: [{provide: HistoryMasterDetailService, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(HistoryModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

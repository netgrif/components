import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HistoryMasterDetailService} from './history-master-detail.service';
import {HistoryModeComponent} from './history-mode.component';
import {TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";

describe('HistoryModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
            ],
            declarations: [HistoryModeComponent],
            providers: [{provide: HistoryMasterDetailService, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(HistoryModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

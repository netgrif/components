import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ActionsMasterDetailService} from './actions-master-detail.service';
import {ActionsModeComponent} from './actions-mode.component';
import {TranslateService} from "@ngx-translate/core";

describe('ActionsModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActionsModeComponent],
            providers: [{provide: ActionsMasterDetailService, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ActionsModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

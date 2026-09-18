import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RoleMasterDetailService} from './role-master-detail.service';
import {RoleModeComponent} from './role-mode.component';
import {TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";

describe('RoleModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
            ],
            declarations: [RoleModeComponent],
            providers: [{provide: RoleMasterDetailService, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(RoleModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

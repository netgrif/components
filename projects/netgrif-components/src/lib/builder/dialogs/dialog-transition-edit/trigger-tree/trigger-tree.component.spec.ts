import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {TriggerTreeComponent} from './trigger-tree.component';
import {TranslateService} from "@ngx-translate/core";

describe('TriggerTreeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            declarations: [TriggerTreeComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(TriggerTreeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

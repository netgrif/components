import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {EditModeService} from '../edit-mode.service';
import {ContextMenuComponent} from './context-menu.component';
import {TranslateService} from "@ngx-translate/core";

describe('ContextMenuComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ContextMenuComponent],
            providers: [{provide: EditModeService, useValue: {contextMenuItems: {subscribe: () => {}}}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ContextMenuComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

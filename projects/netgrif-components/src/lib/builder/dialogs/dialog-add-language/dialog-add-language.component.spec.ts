import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {I18nControlService} from '../../modeler/i18n-mode/i18n-control.service';
import {DialogAddLanguageComponent} from './dialog-add-language.component';

describe('DialogAddLanguageComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogAddLanguageComponent],
            providers: [{provide: I18nControlService, useValue: {}}],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(DialogAddLanguageComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

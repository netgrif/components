import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatMenuModule} from '@angular/material/menu';
import {ActionItemProviderService} from '../../action-item-provider.service';
import {ActionEditorMenuItemComponent} from './action-editor-menu-item.component';

describe('ActionEditorMenuItemComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActionEditorMenuItemComponent],
            imports: [MatMenuModule],
            providers: [{provide: ActionItemProviderService, useValue: {actionsKeywordsListen: () => {}}}],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ActionEditorMenuItemComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

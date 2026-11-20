import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BuilderModeService} from '../../services/builder-mode.service';
import {ArcFactory} from '../../modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {InfoLabelComponent} from './info-label.component';
import {TranslateService} from "@ngx-translate/core";

describe('InfoLabelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InfoLabelComponent],
            providers: [ModelService, ArcFactory, BuilderModeService, SelectedTransitionService,
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(InfoLabelComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

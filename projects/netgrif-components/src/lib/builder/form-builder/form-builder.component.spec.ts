import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {PetriNet} from '@netgrif/petriflow';
import {BuilderModeService} from '../builder-mode.service';
import {ModelService} from '../modeler/services/model/model.service';
import {SelectedTransitionService} from '../modeler/selected-transition.service';
import {FormBuilderComponent} from './form-builder.component';

describe('FormBuilderComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormBuilderComponent],
            providers: [
                BuilderModeService,
                SelectedTransitionService,
                {provide: ModelService, useValue: {model: new PetriNet()}},
                {provide: Router, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(FormBuilderComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

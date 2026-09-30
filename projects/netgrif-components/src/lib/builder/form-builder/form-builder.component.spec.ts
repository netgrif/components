import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PetriNet} from '@netgrif/petriflow';
import {BuilderModeService} from '../services/builder-mode.service';
import {ModelService} from '../modeler/services/model/model.service';
import {SelectedTransitionService} from '../modeler/selected-transition.service';
import {FormBuilderComponent} from './form-builder.component';
import {BuilderIntegrationService} from "../services/builder-integration.service";
import {HistoryService} from "../modeler/services/history/history.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateService} from "@ngx-translate/core";

xdescribe('FormBuilderComponent', () => {
    let component: FormBuilderComponent;
    let fixture: ComponentFixture<FormBuilderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormBuilderComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                BuilderModeService,
                SelectedTransitionService,
                {provide: ModelService, useValue: {model: new PetriNet()}},
                BuilderIntegrationService,
                HistoryService,
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
        fixture = TestBed.createComponent(FormBuilderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

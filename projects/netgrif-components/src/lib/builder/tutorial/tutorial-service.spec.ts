import {TutorialService} from './tutorial-service';
import {TestBed} from "@angular/core/testing";
import {TranslateService} from "@ngx-translate/core";
import {MortgageService} from "../modeler/mortgage.service";
import {ModelService} from "../modeler/services/model/model.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ModelImportService} from "../modeler/model-import-service";
import {ArcFactory} from "../modeler/edit-mode/domain/arc-builders/arc-factory.service";

describe('Tutorial', () => {
    let service: TutorialService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                TutorialService,
                MortgageService,
                ModelService,
                ArcFactory,
                {provide: ModelImportService, useValue: { importFromXml: (key: string): void => {} }},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ]
        });
        service = TestBed.inject(TutorialService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create an instance', () => {
        expect(service).toBeTruthy();
    });
});

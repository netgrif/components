import {TestBed} from '@angular/core/testing';
import {TutorialService} from '../../tutorial/tutorial-service';
import {DataActionsTool} from './tools/data-actions-tool';
import {FunctionsTool} from './tools/functions-tool';
import {ProcessActionsTool} from './tools/process-actions-tool';
import {RoleActionsTool} from './tools/role-actions-tool';
import {TransitionActionsTool} from './tools/transition-actions-tool';
import {ActionsModeService} from './actions-mode.service';
import {TranslateService} from "@ngx-translate/core";

describe('ActionsModeService', () => {
    let service: ActionsModeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ActionsModeService,
                {provide: TutorialService, useValue: {}},
                {provide: DataActionsTool, useValue: {}},
                {provide: TransitionActionsTool, useValue: {}},
                {provide: RoleActionsTool, useValue: {}},
                {provide: ProcessActionsTool, useValue: {}},
                {provide: FunctionsTool, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
        });
        service = TestBed.inject(ActionsModeService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

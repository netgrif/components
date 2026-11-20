import {TestBed} from '@angular/core/testing';
import {TutorialService} from '../../tutorial/tutorial-service';
import {RoleModeService} from './role-mode.service';
import {TranslateService} from "@ngx-translate/core";

describe('RoleModeService', () => {
    let service: RoleModeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RoleModeService,
                {provide: TutorialService, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
        });
        service = TestBed.inject(RoleModeService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

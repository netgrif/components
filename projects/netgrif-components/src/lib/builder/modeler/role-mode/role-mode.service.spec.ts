import {TestBed} from '@angular/core/testing';
import {TutorialService} from '../../tutorial/tutorial-service';
import {RoleModeService} from './role-mode.service';

describe('RoleModeService', () => {
    let service: RoleModeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RoleModeService,
                {provide: TutorialService, useValue: {}},
            ],
        });
        service = TestBed.inject(RoleModeService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

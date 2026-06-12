import {TestBed} from '@angular/core/testing';
import {TutorialService} from '../../tutorial/tutorial-service';
import {HistoryModeService} from './history-mode.service';

describe('HistoryModeService', () => {
    let service: HistoryModeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HistoryModeService,
                {provide: TutorialService, useValue: {}},
            ],
        });
        service = TestBed.inject(HistoryModeService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

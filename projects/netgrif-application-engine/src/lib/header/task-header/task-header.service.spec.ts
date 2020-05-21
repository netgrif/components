import {TestBed} from '@angular/core/testing';

import {TaskHeaderService} from './task-header.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TaskHeaderService', () => {
    let service: TaskHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [ TranslateLibModule, HttpClientTestingModule], providers: [TaskHeaderService]});
        service = TestBed.inject(TaskHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

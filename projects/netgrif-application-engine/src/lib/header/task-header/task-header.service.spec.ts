import {TestBed} from '@angular/core/testing';

import {TaskHeaderService} from './task-header.service';

describe('TaskHeaderService', () => {
    let service: TaskHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [TaskHeaderService]});
        service = TestBed.inject(TaskHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

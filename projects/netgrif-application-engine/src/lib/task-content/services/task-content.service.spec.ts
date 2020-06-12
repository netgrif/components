import {TestBed} from '@angular/core/testing';

import {TaskContentService} from './task-content.service';

describe('TaskPanelContentService', () => {
    let service: TaskContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskContentService]
        });
        service = TestBed.inject(TaskContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

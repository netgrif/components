import {TestBed} from '@angular/core/testing';

import {TaskPanelContentService} from './task-panel-content.service';

describe('TaskPanelContentService', () => {
    let service: TaskPanelContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskPanelContentService]
        });
        service = TestBed.inject(TaskPanelContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

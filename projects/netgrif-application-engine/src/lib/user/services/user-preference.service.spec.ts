import {TestBed} from '@angular/core/testing';

import {UserPreferenceService} from './user-preference.service';
import {User} from '../models/user';

describe('UserPreferenceService', () => {
    let service: UserPreferenceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserPreferenceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test user preferencies', () => {
        service.user = new User('id', 'mail',  'name', 'surname',
            ['ADMIN'], [], [], {
                caseFilters: {},
                caseHeaders: {},
                taskFilters: {},
                taskHeaders: {},
                workflowFilters: {},
                workflowHeaders: {}
            });
        service.saveTaskFilters('viewId', {filter: ''});
        service.getTaskFilters('viewId').subscribe(res => {
            expect(res).toEqual({filter: ''});
        });

        service.saveCaseFilters('viewCaseId', {filter: ''});
        service.getCaseFilters('viewCaseId').subscribe(res => {
            expect(res).toEqual({filter: ''});
        });

        service.saveWorkflowFilters('viewWorkId', {filter: ''});
        service.getWorkflowFilters('viewWorkId').subscribe(res => {
            expect(res).toEqual({filter: ''});
        });

        const header = {
            column0: undefined,
            column1: undefined,
            column2: undefined,
            column3: undefined,
            column4: undefined,
        };

        service.saveTaskHeaders('viewId', header);
        service.getTaskHeaders('viewId').subscribe( res => {
            expect(res).toEqual(header);
        });

        service.saveCaseHeaders('viewCaseId', header);
        service.getCaseHeaders('viewCaseId').subscribe( res => {
            expect(res).toEqual(header);
        });

        service.saveWorkflowHeaders('viewWorkId', header);
        service.getWorkflowHeaders('viewWorkId').subscribe( res => {
            expect(res).toEqual(header);
        });
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

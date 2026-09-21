import {HeaderState} from './header-state';
import {HeaderColumn, HeaderColumnType} from './models/header-column';
import {TaskMetaField} from './task-header/task-meta-enum';
import {TestBed} from '@angular/core/testing';

describe('HeaderState', () => {
    it('should create an instance', () => {
        expect(new HeaderState([])).toBeTruthy();
    });

    it('should test selected header getter', (done) => {
       const head = new HeaderState([
           new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'string', 'string')
       ]);

       head.selectedHeaders$.subscribe( res => {
           expect(res).toEqual(head.selectedHeaders);
           done();
       });
    });

    it('should test methods', () => {
        const head = new HeaderState([
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'string', 'string')
        ]);

        head.saveState();
        head.updateSelectedHeaders(
            [new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'STRING', 'STRING')]
        );
        expect(head.selectedHeaders).toEqual([new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'STRING', 'STRING')]);

        head.restoreLastMode();
        head.restoreLastState();
        expect(head.selectedHeaders).toEqual([new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'string', 'string')]);
    });

    it('should restore selected sorts and their directions', () => {
        const caseHeader = new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'Case', 'text');
        const titleHeader = new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'Title', 'text');
        const state = new HeaderState([caseHeader, titleHeader]);
        caseHeader.sortDirection = 'asc';
        state.updateSelectedSorts([caseHeader]);
        state.saveState();

        caseHeader.sortDirection = 'desc';
        titleHeader.sortDirection = 'asc';
        state.updateSelectedSorts([titleHeader, caseHeader]);
        state.restoreLastState();

        expect(state.selectedSorts).toEqual([caseHeader]);
        expect(caseHeader.sortDirection).toBe('asc');
        expect(titleHeader.sortDirection).toBe('');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

import {TestBed} from '@angular/core/testing';

import {CaseHeaderService, CaseMetaField} from './case-header.service';
import {HeaderType} from '../models/header-type';
import {HeaderMode} from '../models/header-mode';
import {SearchChangeDescription} from '../models/user-changes/search-change-description';
import {EditChangeDescription} from '../models/user-changes/edit-change-description';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';

describe('CaseHeaderService', () => {
    let service: CaseHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [CaseHeaderService]});
        service = TestBed.inject(CaseHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get header type = case', () => {
        expect(service.headerType).toEqual(HeaderType.CASE);
    });

    it('set allowed nets', () => {
        service.setAllowedNets([{
            stringId: 'string',
            title: 'string',
            identifier: 'string',
            version: 'string',
            initials: 'string',
            defaultCaseName: 'string',
            createdDate: [2020, 1, 1, 10, 0],
            author: {email: 'email', fullName: 'fullName'},
            immediateData: [{stringId: 'string', title: 'string', type: 'string'}]
        }]);
        expect(service.fieldsGroup.length).toEqual(2);
    });

    it('call sort header changed', () => {
        service.headerChange$.subscribe(res => {
            expect(res).toEqual({headerType: HeaderType.CASE, mode: HeaderMode.SORT, description: undefined});
        });
        service.sortHeaderChanged('', 'asc');
    });

    it('call search input changed', () => {
        service.headerChange$.subscribe(res => {
            expect(res).toEqual({
                headerType: HeaderType.CASE, mode: HeaderMode.SEARCH, description:
                    {
                        fieldIdentifier: 'visualId', searchInput: 'hladaj', type: 'meta',
                        petriNetIdentifier: undefined
                    } as SearchChangeDescription
            });
        });
        service.headerSearchInputChanged(0, 'hladaj');
    });

    it('call column selected', () => {
        service.headerChange$.subscribe(res => {
            expect(res.headerType).toEqual(HeaderType.CASE);
            expect(res.mode).toEqual(HeaderMode.EDIT);
            expect((res.description as EditChangeDescription).preferredHeaders.length).toEqual(5);
        });
        service.headerColumnSelected(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));

        service.headerChange$.subscribe(res => {
            expect(res.headerType).toEqual(HeaderType.CASE);
            expect(res.mode).toEqual(HeaderMode.EDIT);
            expect((res.description as EditChangeDescription).preferredHeaders.length).toEqual(0);
        });
        service.revertEditMode();
    });

    it('call search input changed', () => {
        service.headerChange$.subscribe(res => {
            expect(res).toEqual({
                headerType: HeaderType.CASE, mode: HeaderMode.SEARCH,
                description: {fieldIdentifier: 'visualId', searchInput: 'hladaj', type: 'meta',
                        petriNetIdentifier: undefined} as SearchChangeDescription
            });
        });
        service.headerSearchInputChanged(0, 'hladaj');
    });

    it('call change mode', () => {
        const headerState = service.headerState;

        service.changeMode(HeaderMode.EDIT, true);
        service.confirmEditMode();
        expect(service.headerState.mode).toEqual(headerState.mode);
    });
});

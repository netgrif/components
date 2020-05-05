import {TestBed} from '@angular/core/testing';

import {CaseHeaderService, CaseMetaField} from './case-header.service';
import {HeaderType} from '../models/header-type';
import {HeaderMode} from '../models/header-mode';
import {SearchChangeDescription} from '../models/user-changes/search-change-description';
import {EditChangeDescription} from '../models/user-changes/edit-change-description';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {CaseViewServiceFactory} from '../../view/case-view/case-view-service-factory';
import {SearchService} from '../../search/search-service/search.service';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../view/case-view/case-view-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MatSnackBarModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CaseHeaderService', () => {
    let service: CaseHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                NoopAnimationsModule,
            ],
            providers: [
                CaseHeaderService,
                CaseViewServiceFactory,
                {   provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory},
                {   provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [CaseViewServiceFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
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
        });
        service.headerColumnSelected(0, new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Title', 'text'));

        service.headerChange$.subscribe(res => {
            expect(res.headerType).toEqual(HeaderType.CASE);
            expect(res.mode).toEqual(HeaderMode.EDIT);
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

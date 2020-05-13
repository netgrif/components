import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CaseListComponent} from './case-list.component';
import {MaterialModule} from '../../../../material/material.module';
import {CaseViewService} from '../../service/case-view-service';
import {ConfigCaseViewServiceFactory} from '../../service/factory/case-view-service-factory';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {of} from 'rxjs';
import {PanelModule} from '../../../../panel/panel.module';
import {SearchService} from '../../../../search/search-service/search.service';
import {SimpleFilter} from '../../../../filter/models/simple-filter';
import {FilterType} from '../../../../filter/models/filter-type';

const localCaseViewServiceFactory = (factory: ConfigCaseViewServiceFactory) => {
    return factory.create('cases');
};

const searchServiceFactory = () => {
    return new SearchService(new SimpleFilter('', FilterType.CASE, {}));
};

describe('CaseListComponent', () => {
    let component: CaseListComponent;
    let fixture: ComponentFixture<CaseListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                PanelModule
            ],
            providers: [
                {provide: CaseResourceService, useClass: MyResources},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                ConfigCaseViewServiceFactory,
                {
                    provide: CaseViewService,
                    useFactory: localCaseViewServiceFactory,
                    deps: [ConfigCaseViewServiceFactory]
                },
                {
                    provide: SearchService,
                    useFactory: searchServiceFactory
                }
            ],
            declarations: [CaseListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class MyResources {
    searchCases(filter, params) {
        return of({
            content: [], pagination: {
                number: -1,
                size: 0,
                totalPages: 0,
                totalElements: 0
            }
        });
    }
}

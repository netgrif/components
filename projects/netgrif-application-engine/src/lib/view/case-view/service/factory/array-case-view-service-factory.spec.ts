import {TestBed} from '@angular/core/testing';
import {ArrayCaseViewServiceFactory} from './array-case-view-service-factory';
import {SideMenuService} from '../../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {ProcessService} from '../../../../process/process.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../../../../search/search-service/search.service';
import {TestCaseSearchServiceFactory} from '../../../../utility/tests/test-factory-methods';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ArrayCaseViewServiceFactory', () => {
    let service: ArrayCaseViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                ArrayCaseViewServiceFactory,
                SideMenuService,
                CaseResourceService,
                SnackBarService,
                ProcessService,
                LoggerService,
                TranslateService,
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {
                    provide: ConfigurationService,
                    useClass: TestConfigurationService
                }
            ]
        });
        service = TestBed.inject(ArrayCaseViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

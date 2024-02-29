import {TestBed} from '@angular/core/testing';
import {RoleAssignmentService} from './role-assignment.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {ErrorSnackBarComponent} from '../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TranslateService} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';

const serviceFactory = (userResources: UserResourceService, processResources: PetriNetResourceService,
                        snackbar: SnackBarService, log: LoggerService, translate: TranslateService) => {
    return new RoleAssignmentService(userResources, processResources, snackbar, log, translate);
};

describe('RoleAssignmentService', () => {
    let service: RoleAssignmentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule, NoopAnimationsModule, SnackBarModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                UserResourceService,
                PetriNetResourceService,
                SnackBarService,
                LoggerService,
                {
                    provide: RoleAssignmentService,
                    useFactory: serviceFactory,
                    deps: [UserResourceService, PetriNetResourceService, SnackBarService, LoggerService, TranslateService]
                }
            ]
        });
        service = TestBed.inject(RoleAssignmentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

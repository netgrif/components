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

const serviceFactory = (userResources: UserResourceService, processResources: PetriNetResourceService,
                        snackbar: SnackBarService, log: LoggerService) => {
    return new RoleAssignmentService(userResources, processResources, snackbar, log);
};

describe('RoleAssignmentService', () => {
    let service: RoleAssignmentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                UserResourceService,
                PetriNetResourceService,
                SnackBarService,
                LoggerService,
                {
                    provide: RoleAssignmentService,
                    useFactory: serviceFactory,
                    deps: [UserResourceService, PetriNetResourceService, SnackBarService, LoggerService]
                }
            ]
        });
        service = TestBed.inject(RoleAssignmentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

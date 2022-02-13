import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ViewService} from '../../routing/view-service/view.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {LoggerService} from '../../logger/services/logger.service';

@Injectable()
export class TestViewService extends ViewService {
    constructor(config: ConfigurationService, router: Router, logger: LoggerService) {
        super([], config, router, logger);
    }
}

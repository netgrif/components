import {TestConfigurationService} from './test-config';

export class TestLoggingConfigurationService extends TestConfigurationService {
    constructor() {
        super();
        if (this.configuration.services) {
            if (this.configuration.services.log) {
                this.configuration.services.log.level = 'ALL';
            } else {
                this.configuration.services.log = {
                    level: 'ALL'
                };
            }

        } else {
            this.configuration.services = {
                log: {
                    level: 'ALL'
                }
            } as any;
        }
    }
}

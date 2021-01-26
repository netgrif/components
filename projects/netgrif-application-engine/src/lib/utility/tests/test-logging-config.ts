import {TestConfigurationService} from './test-config';

export class TestLoggingConfigurationService extends TestConfigurationService {
    constructor() {
        super();
        Object.assign(this.configuration, {
            services: {
                log: {
                    level: 'ALL'
                }
            }
        });
    }
}

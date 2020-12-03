import {Input} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Services} from '../../configuration/interfaces/schema';

/**
 * Holds the logic for components that can display the legal notice.
 */
export abstract class AbstractLegalFormComponent {

    @Input() public displayLegalNotice = true;

    protected _legalConfig: Services['legal'];

    protected constructor(configService: ConfigurationService) {
        this._legalConfig = configService.getConfigurationSubtree(['services', 'legal']);
    }

    public get termsOfServiceLink(): string {
        return this._legalConfig.termsOfService;
    }

    public get privacyPolicyLink(): string {
        return this._legalConfig.privacyPolicy;
    }
}

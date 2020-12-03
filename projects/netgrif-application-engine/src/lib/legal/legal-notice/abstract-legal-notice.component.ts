import {Input} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Services} from '../../configuration/interfaces/schema';

export abstract class AbstractLegalNoticeComponent {

    @Input() buttonName: string;

    protected _legalConfig: Services['legal'];

    protected constructor(config: ConfigurationService) {
        this._legalConfig = config.getConfigurationSubtree(['services', 'legal']);
    }

    public get termsOfServiceLink(): string {
        return this._legalConfig.termsOfService;
    }

    public get privacyPolicyLink(): string {
        return this._legalConfig.privacyPolicy;
    }
}

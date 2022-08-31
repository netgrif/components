import {Component, Input} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Services} from '../../../commons/schema';

@Component({
    selector: 'ncc-abstract-legal-notice',
    template: ''
})
export abstract class AbstractLegalNoticeComponent {

    /**
     * The button text that should be displayed in the legal notice.
     * The text is passed trough the `translate` pipe before being displayed.
     */
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

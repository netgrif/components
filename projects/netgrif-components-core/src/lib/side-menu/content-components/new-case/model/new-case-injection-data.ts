import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {Observable} from 'rxjs';
import {PetriNetReference} from '../../../../resources/interface/petri-net-reference';
import {InjectionToken} from '@angular/core';

export interface NewCaseInjectionData extends SideMenuInjectionData {
    allowedNets$: Observable<Array<PetriNetReference>>;
}

export const NAE_NEW_CASE_CREATION_CONFIGURATION_DATA = new InjectionToken<NewCaseCreationConfigurationData>('NewCaseCreationConfigurationData');

/**
 * injection token used for new case configuration
 */
export interface NewCaseCreationConfigurationData {

    enableCaseTitle: boolean;

    isCaseTitleRequired: boolean;

    newCaseButtonConfig?: NewCaseButtonConfiguration;

    blockNets?: string[];

}

export interface NewCaseButtonConfiguration {

    createCaseButtonTitle?: string;

    createCaseButtonIcon?: string;

    showCreateCaseButton?: boolean;

}

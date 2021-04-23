import {InjectionToken} from '@angular/core';
import {NewCaseConfiguration} from './new-case-configuration';

/**
 * Can be used to provide case views with configuration of the {@link CaseViewService#createNewCase}[createNewCase()] method without
 * having to extend the service and override the method.
 */
export const NAE_NEW_CASE_CONFIGURATION = new InjectionToken<NewCaseConfiguration>('NaeNewCaseConfiguration');

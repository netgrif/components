import {InjectionToken} from '@angular/core';
import {PetriNetRequestBody} from '../../../resources/interface/petri-net-request-body';

/**
 * An InjectionToken that can be used to set the process filter in workflow view
 */
export const NAE_WORKFLOW_SERVICE_FILTER = new InjectionToken<PetriNetRequestBody>('NaeWorkflowServiceFilter');

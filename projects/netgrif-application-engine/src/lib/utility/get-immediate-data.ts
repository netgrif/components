import {Case} from '../resources/interface/case';
import {ImmediateData} from '../resources/interface/immediate-data';

/**
 * @param useCase the {@link Case} object who's immediate data we want to get
 * @param fieldId the identifier of the field we want to get
 * @returns the immediate data field if it exists on the case, `undefined` otherwise
 */
export function getImmediateData(useCase: Case, fieldId: string): ImmediateData | undefined {
    return useCase.immediateData.find(field => field.stringId === fieldId);
}

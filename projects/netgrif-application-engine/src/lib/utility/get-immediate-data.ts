import {Case} from '../resources/interface/case';
import {ImmediateData} from '../resources/interface/immediate-data';
import {Task} from '../resources/interface/task';

/**
 * @param holder the {@link Case} or {@link Task} object who's immediate data we want to get
 * @param fieldId the identifier of the field we want to get
 * @returns the immediate data field if it exists on the case, `undefined` otherwise
 */
export function getImmediateData(holder: Case | Task, fieldId: string): ImmediateData | undefined {
    return holder.immediateData?.find(field => field.stringId === fieldId);
}

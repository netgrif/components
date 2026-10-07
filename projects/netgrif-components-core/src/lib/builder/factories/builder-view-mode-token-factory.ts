import {DataFieldPortalData} from "../../data-fields/models/data-field-portal-data-injection-token";
import {ProcessRefField} from "../../data-fields/process-ref-field/model/process-ref-field";

/**
 * todo 2489
 */
export const builderViewModeTokenFactory = (dataFieldPortalData?: DataFieldPortalData<ProcessRefField>) => {
    const dataField: ProcessRefField = dataFieldPortalData?.dataField;
    return !!dataField && !!dataField.behavior?.visible;
}

import {Injectable} from "@angular/core";
import {AbstractResourceService} from "../abstract-endpoint/abstract-resource.service";
import {ResourceProvider} from "../resource-provider.service";
import {ConfigurationService} from "../../configuration/configuration.service";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {MenuItemData} from "../interface/menu-item-data";
import {DataGroup} from "../interface/data-groups";
import {FieldConverterService} from "../../task-content/services/field-converter.service";
import {handleDataGroups} from "./utils/resource-utils";


@Injectable({
    providedIn: 'root'
})
export class MenuResourceService extends AbstractResourceService {

    constructor(protected provider: ResourceProvider,
                protected configService: ConfigurationService,
                protected _fieldConverter: FieldConverterService) {
        super('menu', provider, configService);
    }


    /**
     * Retrieves menu item data for a specific case by its encoded ID.
     *
     * This method fetches the navigation menu item details associated with a given case.
     * The case ID must be provided in encoded format (typically Base64 encoded).
     *
     * @param encodedCaseId - The encoded identifier of the case for which to retrieve menu item data.
     *                        Must not be null or undefined.
     * @returns An Observable that emits an array of {@link DataGroup} objects containing the processed
     *          menu item data for the specified case.
     * @throws {Error} Throws an error if encodedCaseId is null or undefined.
     */
    public getItemData(encodedCaseId: string): Observable<Array<DataGroup>> {
        if (!encodedCaseId) {
            throw new Error('encodedCaseId cannot be null or undefined');
        }
        return this._resourceProvider.get$("menu/" + encodedCaseId, this.SERVER_URL)
            .pipe(
                map((response: MenuItemData) => {
                    const dataGroupsArray = this.changeType(response.data, undefined);
                    return handleDataGroups(dataGroupsArray, this._fieldConverter);
                })
            )
    }
}

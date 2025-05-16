import {Injectable} from '@angular/core';
import {AbstractResourceProvider} from '../../resources/resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Filter} from '../../filter/models/filter';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {MergedFilter} from '../../filter/models/merged-filter';
import {MergeOperator} from '../../filter/models/merge-operator';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    protected readonly SERVER_URL: string;

    constructor(protected _httpClient: HttpClient,
                protected _translate: TranslateService,
                protected _configService: ConfigurationService) {
        this.SERVER_URL = this.getResourceAddress('case', this._configService.get().providers.resources);
    }

    public downloadExcelFromCurrentSelection(activeFilter: Filter, currentHeaders: Array<HeaderColumn>): Observable<boolean> {
        const mergeOperation = activeFilter instanceof MergedFilter ? (activeFilter as any)._operator : MergeOperator.AND;

        return this._httpClient.post(AbstractResourceProvider.sanitizeUrl(`/export/filteredCases`, this.SERVER_URL), {
            query: activeFilter.getRequestBody(),
            selectedDataFieldNames: currentHeaders.filter(header => header).map(header =>
                header.type === HeaderColumnType.IMMEDIATE ? header.title : this._translate.instant(header.title)),
            selectedDataFieldIds: currentHeaders.filter(header => header).map(
                header => header.type === HeaderColumnType.IMMEDIATE ? header.fieldIdentifier : (header.fieldIdentifier === 'mongoId' ? `meta-stringId` : `meta-${header.fieldIdentifier}`)),
            isIntersection: mergeOperation === MergeOperator.AND
        }, {
            responseType: 'arraybuffer', observe: 'response'
        }).pipe(switchMap((response: any) => {
            if (response && response.body) {
                const contentType = response.headers.get('Content-Type');
                const linkElement = document.createElement('a');
                const blob = new Blob([response.body], {type: contentType});
                const urlBlob = window.URL.createObjectURL(blob);
                linkElement.setAttribute('href', urlBlob);
                linkElement.setAttribute('download', 'export.xlsx');
                document.body.appendChild(linkElement);
                linkElement.click();
                document.body.removeChild(linkElement);
                return of(true);
            } else {
                return of(false);
            }
        }));
    }

    public getResourceAddress(name: string, resourcesArray: any): string {
        let URL = '';
        if (resourcesArray instanceof Array) {
            resourcesArray.forEach(resource => {
                if (resource.name === name) {
                    URL = resource.address;
                }
            });
        } else {
            if (resourcesArray.name === name) {
                URL = resourcesArray.address;
            }
        }
        return URL;
    }
}

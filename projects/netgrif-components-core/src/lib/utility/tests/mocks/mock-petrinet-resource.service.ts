import { Injectable } from '@angular/core';
import { ProviderProgress, ResourceProvider } from '../../../resources/resource-provider.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

@Injectable()
export class MockPetrinetResourceService {

    public getNetFile(netId: string): Observable<ProviderProgress | Blob> {
        return of({} as Blob).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.DownloadProgress:
                        return ResourceProvider.getProgress(event);
                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return undefined;
                }
            }),
            filter(value => !!value)
        );
    }
}

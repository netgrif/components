import { Injectable } from '@angular/core';
import { ProviderProgress, ResourceProvider } from '../../../resources/resource-provider.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable()
export class MockPetrinetResourceService {

    public getNetFile(netId: string): Observable<ProviderProgress | Blob> {
        return of(new HttpResponse<Blob>()).pipe(
            map(event => { return event.body; }));
    }
}

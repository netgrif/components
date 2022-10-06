import { Injectable } from '@angular/core';
import { UriResourceService } from '../../../navigation/service/uri-resource.service';
import { ResourceProvider } from '../../../resources/resource-provider.service';
import { ConfigurationService } from '../../../configuration/configuration.service';
import { Observable, of } from 'rxjs';
import { UriNodeResource } from '../../../navigation/model/uri-resource';

@Injectable()
export class MockUriResourceService extends UriResourceService{

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super(provider, configService);
    }


    getRoot(): Observable<UriNodeResource> {
        return of({
            id: 'root',
            uriPath: 'root',
            name: 'root',
            parentId: null,
            parent: undefined,
            childrenId: undefined,
            children: undefined,
            level: 0,
            contentTypes: undefined
        });
    }

    getByLevel(level: number): Observable<Array<UriNodeResource>> {
        return of([{
            id: 'test1',
            uriPath: 'root/test1',
            name: 'test1',
            parentId: 'root',
            parent: undefined,
            childrenId: undefined,
            children: undefined,
            level: 0,
            contentTypes: undefined
        } as UriNodeResource, {
            id: 'test2',
            uriPath: 'root/test2',
            name: 'test2',
            parentId: 'root',
            parent: undefined,
            childrenId: undefined,
            children: undefined,
            level: 0,
            contentTypes: undefined
        } as UriNodeResource]);
    }

    getNodesByParent(parentId: string): Observable<Array<UriNodeResource>> {
        return of([{
            id: 'test1',
            uriPath: 'root/test1',
            name: 'test1',
            parentId: 'root',
            parent: undefined,
            childrenId: undefined,
            children: undefined,
            level: 0,
            contentTypes: undefined
        } as UriNodeResource, {
            id: 'test2',
            uriPath: 'root/test2',
            name: 'test2',
            parentId: 'root',
            parent: undefined,
            childrenId: undefined,
            children: undefined,
            level: 0,
            contentTypes: undefined
        } as UriNodeResource]);
    }

    getNodeByUri(uriPath: string): Observable<UriNodeResource> {
        return of<UriNodeResource>({
            id: 'test1',
            uriPath: 'root/test1',
            name: 'test1',
            parentId: 'root',
            parent: undefined,
            childrenId: undefined,
            children: undefined,
            level: 0,
            contentTypes: undefined
        } as UriNodeResource);
    }
}

import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {UriContentType, UriNodeResource} from '../../../navigation/model/uri-resource';
import {UriResourceService} from '../../../navigation/service/uri-resource.service';
import {ResourceProvider} from '../../../resources/resource-provider.service';

@Injectable()
export class MockUriResourceService extends UriResourceService {

    static TEST1_ID = 'test1';
    static TEST1_PATH = 'root/test1';
    static TEST2_ID = 'test2';
    static TEST2_PATH = 'root/test2';

    private _root: UriNodeResource = {
        id: 'root',
        uriPath: 'root',
        name: 'root',
        parentId: null,
        parent: undefined,
        childrenId: new Set<string>([MockUriResourceService.TEST1_ID, MockUriResourceService.TEST2_ID]),
        children: undefined,
        level: 0,
        contentTypes: undefined,
    } as UriNodeResource;
    private _test1Node: UriNodeResource = {
        id: MockUriResourceService.TEST1_ID,
        uriPath: MockUriResourceService.TEST1_PATH,
        name: MockUriResourceService.TEST1_ID,
        parentId: 'root',
        parent: this._root,
        childrenId: undefined,
        children: undefined,
        level: 1,
        contentTypes: new Set<UriContentType>([UriContentType.PROCESS]),
    } as UriNodeResource;
    private _test2Node: UriNodeResource = {
        id: MockUriResourceService.TEST2_ID,
        uriPath: MockUriResourceService.TEST2_PATH,
        name: MockUriResourceService.TEST2_ID,
        parentId: 'root',
        parent: this._root,
        childrenId: undefined,
        children: undefined,
        level: 1,
        contentTypes: new Set<UriContentType>([UriContentType.CASE]),
    } as UriNodeResource;

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super(provider, configService);
    }

    getRoot(): Observable<UriNodeResource> {
        return of(this._root);
    }

    getByLevel(level: number): Observable<Array<UriNodeResource>> {
        if (level === 1) return of([this._test1Node, this._test2Node]);
        return of([this._root]);
    }

    getNodesByParent(parentId: string): Observable<Array<UriNodeResource>> {
        if (parentId === 'root') return of([this._test1Node, this._test2Node]);
        return of([this._root]);
    }

    getNodeByUri(uriPath: string): Observable<UriNodeResource> {
        switch (uriPath) {
            case MockUriResourceService.TEST1_PATH:
                return of<UriNodeResource>(this._test1Node);
            case MockUriResourceService.TEST2_PATH:
                return of<UriNodeResource>(this._test2Node);
            default:
                return of(this._root);
        }
    }
}

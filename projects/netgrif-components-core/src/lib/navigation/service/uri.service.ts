import {HttpParams} from '@angular/common/http';
import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CaseSearchRequestBody, PetriNetSearchRequest} from '../../filter/models/case-search-request-body';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {ActiveGroupService} from '../../groups/services/active-group.service';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {Case} from '../../resources/interface/case';
import {Page} from '../../resources/interface/page';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {PaginationParams} from '../../utility/pagination/pagination-params';
import {NAE_URI_NODE_CASES_PAGE_SIZE} from '../model/size-menu-injection-token';
import {UriNodeResource} from '../model/uri-resource';
import {UriResourceService} from './uri-resource.service';
import {GroupNavigationConstants} from "../model/group-navigation-constants";

/**
 * Service for managing URIs
 * */
@Injectable({
    providedIn: 'root',
})
export class UriService implements OnDestroy {

    public static ROOT: string = 'root';
    private _rootNode: UriNodeResource;
    private readonly _rootLoading$: LoadingEmitter;
    private readonly _parentLoading$: LoadingEmitter;
    private readonly _activeNode$: BehaviorSubject<UriNodeResource>;

    constructor(protected _logger: LoggerService,
                protected _resourceService: UriResourceService,
                protected _caseResourceService: CaseResourceService,
                protected _activeGroupService: ActiveGroupService,
                @Optional() @Inject(NAE_URI_NODE_CASES_PAGE_SIZE) protected pageSize: string | number) {
        if (!pageSize) {
            this.pageSize = 20;
        }
        if (typeof this.pageSize === 'string') {
            this.pageSize = parseInt(this.pageSize);
        }
        this._rootLoading$ = new LoadingEmitter();
        this._parentLoading$ = new LoadingEmitter();
        this._activeNode$ = new BehaviorSubject<UriNodeResource>(undefined);
        this.loadRoot();
    }

    public ngOnDestroy() {
        this._rootLoading$.complete();
        this._parentLoading$.complete();
        this._activeNode$.complete();
    }

    public get root(): UriNodeResource {
        return this._rootNode;
    }

    public get rootLoaded$(): LoadingEmitter {
        return this._rootLoading$;
    }

    public isRoot(node: UriNodeResource): boolean {
        return node.id === this._rootNode.id && node.uriPath === this._rootNode.uriPath;
    }

    public get activeNode(): UriNodeResource {
        return this._activeNode$.getValue();
    }

    public set activeNode(node: UriNodeResource) {
        if (node.parentId && !node.parent) {
            if (node.parentId === this._rootNode.id) {
                node.parent = this._rootNode;
            } else {
                this._parentLoading$.on();
                this.getNodeByPath(this.resolveParentPath(node)).subscribe(n => {
                    node.parent = !n ? this._rootNode : n;
                    this._parentLoading$.off();
                }, error => {
                    this._logger.error(error);
                    this._parentLoading$.off();
                });
            }
        }
        this._activeNode$.next(node);
    }

    public get activeNode$(): Observable<UriNodeResource> {
        return this._activeNode$;
    }

    public get parentNodeLoading$(): Observable<boolean> {
        return this._parentLoading$;
    }


    /**
     * Loads root ID into variable.
     * When root node is loaded and active node is not set yet the root node is set as active node
     * */
    private loadRoot(): void {
        this._rootLoading$.on();
        this._resourceService.getRoot().subscribe(node => {
            if (!!node) {
                this._rootNode = node;
                if (!this.activeNode) {
                    this.activeNode = this._rootNode;
                }
            }
            this._rootLoading$.off();
        }, error => {
            this._logger.error(error);
            this._rootLoading$.off();
        });
    }

    public reset(): UriNodeResource {
        this.activeNode = this._rootNode;
        return this._rootNode;
    }

    /**
     * Get uri node by uri path.
     * @param path
     */
    public getNodeByPath(path: string): Observable<UriNodeResource> {
        return this._resourceService.getNodeByUri(path).pipe(
            map(n => this.capitalizeName(n)),
        );
    }

    /**
     * Get child nodes of provides node.
     * @param node parent node
     */
    public getChildNodes(node?: UriNodeResource): Observable<Array<UriNodeResource>> {
        if (!node) node = this.activeNode;
        return this._resourceService.getNodesByParent(node.id).pipe(
            map(nodes => {
                this.capitalizeNames(nodes);
                return nodes;
            }),
        );
    }

    /**
     * Get cases under uri node
     * @param node parent node of cases
     * @param processIdentifiers optional search filter for process identifier to get only cases from the process
     * @param pageNumber optional parameter for load page on the index. Default value is 0 (the first page).
     * @param pageSize optional parameter for loaded page size. Defaults to value of injection token URI_NODE_CASES_PAGE_SIZE or to value "20".
     */
    public getCasesOfNode(node?: UriNodeResource, processIdentifiers?: Array<string>, pageNumber: number = 0, pageSize: string | number = this.pageSize): Observable<Page<Case>> {
        if (!node) node = this.activeNode;
        const searchBody: CaseSearchRequestBody = {
            uriNodeId: node.id,
        };
        if (!!processIdentifiers) {
            searchBody.process = processIdentifiers.map(id => ({identifier: id} as PetriNetSearchRequest));
        }
        // TODO active group is broken a given the wrong id
        // if (!!this._activeGroupService.activeGroup) {
        //     searchBody.data = {};
        //     searchBody.data['parentId'] = this._activeGroupService.activeGroup.stringId;
        // }
        let httpParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, pageSize)
            .set(PaginationParams.PAGE_NUMBER, pageNumber);
        return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams);
    }

    /**
     * Get menu item case by nodePath field value
     * @param node a node, that is represented by the wanted case
     * @return page containing 1 case
     */
    public getItemCaseByNodePath(node?: UriNodeResource): Observable<Page<Case>> {
        if (!node) {
            node = this.activeNode;
        }
        const searchBody: CaseSearchRequestBody = {
            data: {
                [GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH] : node.uriPath
            },
            process: {identifier: "menu_item"}
        };

        let httpParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, 1)
            .set(PaginationParams.PAGE_NUMBER, 0);
        return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams);
    }

    /**
     * Get siblings node of the provided node
     * @param node siblings node
     */
    public getSiblingsOfNode(node?: UriNodeResource): Observable<Array<UriNodeResource>> {
        if (!node) node = this.activeNode;
        return this._resourceService.getNodesByParent(node.parentId).pipe(
            map(nodes => {
                this.capitalizeNames(nodes);
                return nodes;
            }),
        );
    }

    /**
     * Get nodes on the same uri level starting from 0. Root node is no 0 level.
     * @param level
     * @param parent optional parameter to filter nodes with common parent
     */
    public getNodesOnLevel(level: number, parent?: UriNodeResource): Observable<Array<UriNodeResource>> {
        if (level === 0) return of([this.root]);
        return this._resourceService.getByLevel(level).pipe(
            map(nodes => {
                const ns = !!parent?.id ? nodes.filter(n => n.parentId === parent.id) : nodes;
                this.capitalizeNames(ns);
                return ns;
            }),
        );
    }

    public resolveParentPath(node?: UriNodeResource): string {
        if (!node) node = this.activeNode;
        const lastDelimiter = node.uriPath.lastIndexOf('/');
        if (lastDelimiter === 0) return '/';
        return node.uriPath.substring(0, lastDelimiter);
    }

    public splitNodePath(node: UriNodeResource): Array<string> {
        return node?.uriPath.split('/').filter(s => s !== UriService.ROOT);
    }

    private capitalizeNames(nodes: Array<UriNodeResource>) {
        if (!(nodes instanceof Array)) return;
        nodes.forEach(n => this.capitalizeName(n));
    }

    /**
     *  /netgrif/nae_system/processes/... => Netgrif -> Nae Systems -> Processes
     * @param node
     * @private
     */
    private capitalizeName(node: UriNodeResource) {
        let parts = node.name.split('_');
        parts = parts.map(p => {
            if (p === undefined || p.length === 0) return;
            if (p.length === 1) return p.toUpperCase();
            return p.charAt(0).toUpperCase() + p.substring(1);
        });
        node.name = parts.join(' ');
        return node;
    }
}

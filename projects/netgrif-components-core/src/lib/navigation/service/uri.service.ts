import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CaseSearchRequestBody, PetriNetSearchRequest} from '../../filter/models/case-search-request-body';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {ActiveGroupService} from '../../groups/services/active-group.service';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {Case} from '../../resources/interface/case';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {UriNodeResource} from '../model/uri-resource';
import {UriResourceService} from './uri-resource.service';

/**
 * Service for managing URIs
 * */
@Injectable({
    providedIn: 'root',
})
export class UriService implements OnDestroy {

    private static ROOT: string = 'root';
    private _rootNode: UriNodeResource;
    private readonly _rootLoading$: LoadingEmitter;
    private readonly _parentLoading$: LoadingEmitter;
    private readonly _activeNode$: BehaviorSubject<UriNodeResource>;

    constructor(protected _logger: LoggerService,
                protected _resourceService: UriResourceService,
                protected _caseResourceService: CaseResourceService,
                protected _activeGroupService: ActiveGroupService) {
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
     */
    public getCasesOfNode(node?: UriNodeResource, processIdentifiers?: Array<string>): Observable<Array<Case>> {
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
        return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody)).pipe(
            map(page => page.content),
        );
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
        if (lastDelimiter === -1) return 'root';
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

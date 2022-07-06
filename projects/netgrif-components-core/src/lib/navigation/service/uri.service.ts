import { Injectable, OnDestroy } from '@angular/core';
import { LoggerService } from '../../logger/services/logger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UriResourceService } from './uri-resource.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UriNodeResource } from '../model/uri-resource';
import { hasContent } from '../../utility/pagination/page-has-content';
import { Case } from '../../resources/interface/case';
import { CaseResourceService } from '../../resources/engine-endpoint/case-resource.service';
import { SimpleFilter } from '../../filter/models/simple-filter';
import { CaseSearchRequestBody, PetriNetSearchRequest } from '../../filter/models/case-search-request-body';
import { ActiveGroupService } from '../../groups/services/active-group.service';
import { TaskResourceService } from '../../resources/engine-endpoint/task-resource.service';
import { strings } from '@angular-devkit/core';

export class UriConstants {
    public static FILTER_VIEW_TASK_TRANSITION_ID = 'view';
}

/**
 * Service for managing URIs
 * */
@Injectable({
    providedIn: 'root'
})
export class UriService implements OnDestroy {

    private _leftNodesSubscription: Subscription;
    private _rightNodesSubscription: Subscription;
    private _filtersSubscription: Subscription;

    private readonly _leftNodes: BehaviorSubject<Array<UriNodeResource>>;
    private readonly _rightNodes: BehaviorSubject<Array<UriNodeResource>>;
    private readonly _filters: BehaviorSubject<Array<Case>>
    private rootNode: UriNodeResource;

    private readonly FILTER_IDENTIFIERS = [
        "preference_filter_item"
    ];

    /**
     * Current level of nodes in _leftNodes
     * */
    private currentLevel: number;

    /**
     * Stack of parent nodes that will be loaded into leftNodes when backward navigation
     * is triggered.
     * On each right menu click the parent of left nodes will be saved to this, and
     * on each backward navigation the last element will be popped out and used
     * as parent ID for left side menu.
     * */
    private backStack: string[];

    /**
     * Parents of nodes in _leftNodes
     * */
    private readonly leftParent: BehaviorSubject<string>

    /**
     * Parents of nodes in _rightNodes
     * */
    private readonly rightParent: BehaviorSubject<string>

    constructor(protected _logger: LoggerService,
                protected _route: ActivatedRoute,
                protected _router: Router,
                protected _resourceService: UriResourceService,
                protected _caseResourceService: CaseResourceService,
                protected _activeGroupService: ActiveGroupService) {
        this.currentLevel = 0;
        this.backStack = [];
        this.leftParent = new BehaviorSubject<string>(undefined);
        this.rightParent = new BehaviorSubject<string>(undefined);
        this._leftNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this._rightNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this._filters = new BehaviorSubject<Array<Case>>([]);
        this.loadRoot();

        /**
         * Left parent is responsible for loading left nodes at init and backward
         * navigation
         * */
        this.leftParent.subscribe(value => {
            this.resolveLeftNodes(value);
        });

        /**
         * Right parent is responsible for loading right nodes at right node click
         * and backward navigation
         * */
        this.rightParent.subscribe(value => {
            if (!!value) {
                this.resolveRightNodes(value);
            }
        });
    }

    public ngOnDestroy() {
        this.leftParent.complete();
        this.rightParent.complete();
        this._rightNodes.complete();
        this._leftNodes.complete();
        this._filters.complete();
        this._leftNodesSubscription.unsubscribe();
        this._rightNodesSubscription.unsubscribe();
        this._filtersSubscription.unsubscribe();
    }

    public get $currentLevel(): number {
        return this.currentLevel;
    }

    public get $backStack(): string[] {
        return this.backStack;
    }

    public set $backStack(backStack: string[]) {
        this.backStack = backStack;
    }

    public get $leftParent(): BehaviorSubject<string> {
        return this.leftParent;
    }

    public get $rightParent(): BehaviorSubject<string> {
        return this.rightParent;
    }

    public get leftNodes(): BehaviorSubject<Array<UriNodeResource>> {
        return this._leftNodes;
    }

    public get rightNodes(): BehaviorSubject<Array<UriNodeResource>> {
        return this._rightNodes;
    }

    public get filters(): BehaviorSubject<Array<Case>> {
        return this._filters;
    }

    public incLevel(): void {
        this.currentLevel++;
    }

    public decLevel(): void {
        this.currentLevel--;
    }

    public zeroLevel(): void {
        this.currentLevel = 0;
    }

    /**
     * Child nodes (right panel) are loaded by parent ID
     * @param parentId the nodes are searched by
     * */
    public resolveRightNodes(parentId: string): void {
        this._rightNodesSubscription = this._resourceService.getNodesByParent(parentId).subscribe(nodes => {
            this.rightNodes.next(nodes);
        });

        const searchBody: CaseSearchRequestBody = {
            process: this.FILTER_IDENTIFIERS.map(id => ({identifier: id} as PetriNetSearchRequest)),
            uriNodeId: parentId
        };

        if (!!this._activeGroupService.activeGroup) {
            searchBody.data = {};
            searchBody.data['parentId'] = this._activeGroupService.activeGroup.stringId;
        }

        this._filtersSubscription = this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody))
            .subscribe(casesPage => {
                const array: Array<Case> = [];
                if (!!casesPage && hasContent(casesPage)) {
                    casesPage.content.forEach(c => {
                        array.push(c);
                    });
                    this.filters.next(array);
                } else {
                    this.filters.next([]);
                }
        });
    }

    /**
     * Parent nodes (left panel) are loaded by level number
     * @param parentId to be filtered by
     * */
    public resolveLeftNodes(parentId?: string): void {
        this._leftNodesSubscription = this._resourceService.getByLevel(this.currentLevel).subscribe(nodes => {
            if (!!parentId)
                this.leftNodes.next(nodes.filter(n => n.parentId === parentId));
            else
                this.leftNodes.next(nodes);
        });
    }

    /**
     * Resets parent ID when home button is clicked
     * */
    public resetToRoot(): void {
        this.zeroLevel();
        this.leftParent.next(undefined);
        this.rightParent.next(this.rootNode.id)
        this.$backStack = [];
    }

    /**
     * Loads root ID into variable
     * */
    private loadRoot(): void {
        this._resourceService.getRoot().subscribe(node => {
            if (!!node) {
                this.rootNode = node;
                this.leftParent.next(undefined);
                this.rightParent.next(node.id);
            }
        })
    }
}

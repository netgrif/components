import { Injectable, OnDestroy } from '@angular/core';
import { LoggerService } from '../../logger/services/logger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UriResourceService } from './uri-resource.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UriNodeResource } from '../model/uri-resource';

/**
 * Service for managing URIs
 * */
@Injectable({
    providedIn: 'root'
})
export class UriService implements OnDestroy {

    private leftNodesSubscription: Subscription;
    private rightNodesSubscription: Subscription;

    private readonly _leftNodes: BehaviorSubject<Array<UriNodeResource>>;
    private readonly _rightNodes: BehaviorSubject<Array<UriNodeResource>>;
    private rootNode: UriNodeResource;

    /**
     * Current level of nodes in _leftNodes
     * */
    private currentLevel: number;

    /**
     * Parents of nodes in _leftNodes
     * */
    private readonly leftParent: BehaviorSubject<string>

    /**
     * Parents of nodes in _rightNodes
     * */
    private readonly rightParent: BehaviorSubject<string>

    /**
     * Stack of parent nodes that will be loaded into leftNodes when backward navigation
     * is triggered.
     * On each right menu click the parent of left nodes will be saved to this, and
     * on each backward navigation the last element will be popped out and used
     * as parent ID for left side menu.
     * */
    private backStack: string[];

    constructor(protected _logger: LoggerService,
                protected _route: ActivatedRoute,
                protected _router: Router,
                protected _resourceService: UriResourceService) {
        this.currentLevel = 0;
        this.backStack = [];
        this.leftParent = new BehaviorSubject<string>(undefined);
        this.rightParent = new BehaviorSubject<string>(undefined);
        this._leftNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this._rightNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
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
        this.leftNodesSubscription.unsubscribe();
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
        this.rightNodesSubscription = this._resourceService.getNodesByParent(parentId).subscribe(nodes => {
            this.rightNodes.next(nodes);
        });
    }

    /**
     * Parent nodes (left panel) are loaded by level number
     * @param parentId to be filtered by
     * */
    public resolveLeftNodes(parentId?: string): void {
        this.leftNodesSubscription = this._resourceService.getByLevel(this.currentLevel).subscribe(nodes => {
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

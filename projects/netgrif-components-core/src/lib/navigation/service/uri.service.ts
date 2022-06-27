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
    private readonly currentLevel: BehaviorSubject<number>;

    /**
     * Parents of nodes in _leftNodes
     * */
    private readonly currentParent: BehaviorSubject<string>

    constructor(protected _logger: LoggerService,
                protected _route: ActivatedRoute,
                protected _router: Router,
                protected _resourceService: UriResourceService) {
        this.currentLevel = new BehaviorSubject<number>(undefined);
        this.currentParent = new BehaviorSubject<string>(undefined);
        this._leftNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this._rightNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this.loadRoot();

        /**
         * If current level is set by click to URI element on the right menu,
         * the new elements has to be loaded into left side.
         * */
        this.currentLevel.subscribe(value => {
            if (!!value)
                this.resolveLeftNodes(value);
        });

        /**
         * If the parent is set by click for backward navigation button on the left menu,
         * the new elements has to be loaded into right side.
         * */
        this.currentParent.subscribe(value => {
            if (!!value)
                this.resolveRightNodes(value);
        });
    }

    public ngOnDestroy() {
        this.currentLevel.complete();
        this.currentParent.complete();
        this._rightNodes.complete();
        this._leftNodes.complete();
        this.leftNodesSubscription.unsubscribe();
    }

    public get $currentLevel(): BehaviorSubject<number> {
        return this.currentLevel;
    }

    public get $currentParent(): BehaviorSubject<string> {
        return this.currentParent;
    }

    public get leftNodes(): BehaviorSubject<Array<UriNodeResource>> {
        return this._leftNodes;
    }

    public get rightNodes(): BehaviorSubject<Array<UriNodeResource>> {
        return this._rightNodes;
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
     * @param level the nodes are searched by
     * */
    public resolveLeftNodes(level: number): void {
        this.leftNodesSubscription = this._resourceService.getByLevel(level).subscribe(nodes => {
            this.leftNodes.next(nodes);
        });
    }

    /**
     * Resets parent ID when home button is clicked
     * */
    public resetToRoot(): void {
        this.currentParent.next(this.rootNode.id);

    }

    /**
     * Loads root ID into variable
     * */
    private loadRoot(): void {
        this._resourceService.getRoot().subscribe(node => {
            if (!!node) {
                this.rootNode = node;
                this.currentParent.next(node.parentId);
            }
        })
    }
}

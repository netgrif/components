import { Injectable, OnDestroy } from '@angular/core';
import { LoggerService } from '../../logger/services/logger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UriResourceService } from './uri-resource.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UriNodeResource } from '../model/uri-resource';


@Injectable({
    providedIn: 'root'
})
export class UriService implements OnDestroy {

    private leftNodesSubscription: Subscription;
    private rightNodesSubscription: Subscription;

    private readonly _leftNodes: BehaviorSubject<Array<UriNodeResource>>
    private readonly _rightNodes: BehaviorSubject<Array<UriNodeResource>>

    private readonly rootUri: string = 'root';

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
        this.currentLevel = new BehaviorSubject<number>(0);
        this.currentParent = new BehaviorSubject<string>(this.rootUri);
        this._leftNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this._rightNodes = new BehaviorSubject<Array<UriNodeResource>>([]);

        this.currentLevel.subscribe(value => {
            this.resolveLeftNodes(value);
        });

        this.currentParent.subscribe(value => {
            this.resolveRightNodes(value);
        });
    }

    public ngOnDestroy() {
        this.currentLevel.complete();
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

    public resolveRightNodes(parentId: string): void {
        this.rightNodesSubscription = this._resourceService.getNodesByParent(parentId).subscribe(nodes => {
            this._rightNodes.next(nodes);
        });
    }

    public resolveLeftNodes(level: number): void {
        this.leftNodesSubscription = this._resourceService.getByLevel(level).subscribe(nodes => {
            this.leftNodes.next(nodes);
        });
    }
}

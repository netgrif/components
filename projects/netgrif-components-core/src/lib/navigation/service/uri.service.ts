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

    private _leftNodes: BehaviorSubject<Array<UriNodeResource>>
    private _rightNodes: BehaviorSubject<Array<UriNodeResource>>

    private currentLevel: BehaviorSubject<number>;

    constructor(protected _logger: LoggerService,
                protected _route: ActivatedRoute,
                protected _router: Router,
                protected _resourceService: UriResourceService) {
        this.currentLevel = new BehaviorSubject<number>(0);
        this._leftNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this._rightNodes = new BehaviorSubject<Array<UriNodeResource>>([]);

        this.currentLevel.subscribe(value => {
            this.leftNodesSubscription = this._resourceService.getByLevel(value).subscribe(res => {
                this._leftNodes.next(res);
            });
        });
    }

    public ngOnDestroy() {
        this.currentLevel.complete();
        this.leftNodesSubscription.unsubscribe();
    }

    public get $currentLevel(): BehaviorSubject<number> {
        return this.currentLevel;
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
}

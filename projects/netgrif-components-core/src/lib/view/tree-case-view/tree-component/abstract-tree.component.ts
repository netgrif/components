import {EventEmitter, Input, Output} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Filter} from '../../../filter/models/filter';
import {CaseTreeService} from './case-tree.service';
import {CaseTreeNode} from './model/case-tree-node';
import {TreePetriflowIdentifiers} from '../model/tree-petriflow-identifiers';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {CaseTreePath} from './model/case-tree-path';

export abstract class AbstractTreeComponent {

    /**
     * `true` is emitted whenever the tree's root node is in it's loading state.
     *
     * `false` is emitted when the root node is no longer in the loading state.
     *
     * The first value emitted from this Output is `false`, when the tree finishes initializing.
     *
     * The root node enters it's loading state when it's children are being loaded.
     */
    @Output() treeRootLoading = new EventEmitter<boolean>();

    /**
     * `true` is emitted whenever the tree's root node is adding a new child node.
     *
     * `false` is emitted when the root node is no longer adding a new child node.
     *
     * The first value emitted from this Output is `false`, when the tree finishes initializing.
     *
     * No further calls to add a child node should be made, while a child is being added.
     */
    @Output() treeRootAddingChild = new EventEmitter<boolean>();

    protected constructor(protected _treeService: CaseTreeService) {
        this._treeService.treeRootLoaded$.subscribe(success => {
            if (success) {
                this._treeService.rootNodeLoading$.subscribe(loading => {
                    this.treeRootLoading.emit(loading);
                });
                this._treeService.rootNodeAddingChild$.subscribe(addingChild => {
                    this.treeRootAddingChild.emit(addingChild);
                });
            }
        });
    }

    /**
     * The {@link Filter} that determines the root node of the tree.
     *
     * The tree can only have one root. If more than one case is returned by the Filter.
     * The first result will be used as the tree root.
     *
     * If you want to have multiple nodes in the first level checkout the [showTreeRoot]{@link AbstractTreeComponent#showTreeRoot} property.
     * @param filter Case Filter that determines the tree root
     */
    @Input() set filter(filter: Filter) {
        this._treeService.rootFilter = filter;
    }

    /**
     * Whether the tree root should be displayed as a node or not.
     *
     * `true` displays the root as the only node in the first level.
     *
     * `false` displays the root's child nodes in the first level.
     *
     * If you want to add more children while the root is hidden use the [addRootChildNode]
     * {@link AbstractTreeComponent#addRootChildNode} method.
     * @param showTreeRoot whether the root node should be displayed in the tree or not
     */
    @Input() set showTreeRoot(showTreeRoot: boolean) {
        this._treeService.treeRootLoaded$.subscribe(success => {
            if (success) {
                this._treeService.initializeTree(showTreeRoot);
            }
        });
    }

    /**
     * Weather the tree is eager loaded or not.
     *
     * Defaults to `false`.
     *
     * It is not recommended to eager load large trees as each node sends a separate backend request to load its data.
     *
     * @param eager the new setting for eager loading
     */
    @Input() set eagerLoaded(eager: boolean) {
        this._treeService.isEagerLoaded = eager;
    }

    /**
     * @ignore
     */
    public get dataSource(): MatTreeNestedDataSource<CaseTreeNode> {
        return this._treeService.dataSource;
    }

    /**
     * @ignore
     */
    public get treeControl(): NestedTreeControl<CaseTreeNode> {
        return this._treeService.treeControl;
    }

    /**
     * @ignore
     */
    hasChild = (_: number, node: CaseTreeNode) => {
        const childrenCaseRef = node.case.immediateData.find(data => data.stringId === TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        return !!childrenCaseRef && !!childrenCaseRef.value && childrenCaseRef.value.length > 0;
    }

    /**
     * @ignore
     */
    caseNodeClicked(node: CaseTreeNode) {
        this._treeService.changeActiveNode(node);
    }

    /**
     * @ignore
     */
    toggleCaseNode(event: Event, node: CaseTreeNode) {
        event.stopPropagation();
        this._treeService.toggleNode(node);
    }

    /**
     * @ignore
     */
    selectedCaseNode(node: CaseTreeNode) {
        return node === this._treeService.currentNode;
    }

    /**
     * Adds a child to the root node.
     *
     * Useful if you set the [showTreeRoot]{@link AbstractTreeComponent#showTreeRoot} property to `false`.
     */
    public addRootChildNode(): void {
        this._treeService.addRootChildNode();
    }

    /**
     * Expands all nodes in the tree dictated by the argument.
     *
     * @param path nodes that should be expanded along with their path from the root node
     */
    public expandPath(path: CaseTreePath): void {
        this._treeService.expandPath(path);
    }
}

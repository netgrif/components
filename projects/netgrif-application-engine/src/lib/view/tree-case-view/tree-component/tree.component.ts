import {Component, Input} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {Filter} from '../../../filter/models/filter';
import {CaseTreeService} from './case-tree.service';
import {CaseTreeNode} from './model/CaseTreeNode';
import {TreePetriflowIdentifiers} from '../model/tree-petriflow-identifiers';

@Component({
    selector: 'nae-tree-component',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    providers: [CaseTreeService]
})
export class TreeComponent {

    constructor(private _treeService: CaseTreeService) {
    }

    /**
     * The {@link Filter} that determines the root node of the tree.
     *
     * The tree can only have one root. If more than one case is returned by the Filter.
     * The first result will be used as the tree root.
     *
     * If you want to have multiple nodes in the first level checkout the [showTreeRoot]{@link TreeComponent#showTreeRoot} property.
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
     * If you want to add more children while the root is hidden use the [addRootChildNode]{@link TreeComponent#addRootChildNode} method.
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
     * Useful if you set the [showTreeRoot]{@link TreeComponent#showTreeRoot} property to `false`.
     */
    public addRootChildNode(): void {
        this._treeService.addRootChildNode();
    }
}

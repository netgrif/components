import {MatTreeNestedDataSource} from '@angular/material/tree';

/**
 * Forces a re-render of the tree backed by the datasource
 */
export function refreshTree(tree: MatTreeNestedDataSource<any>) {
    const d = tree.data;
    tree.data = [];
    tree.data = d;
}

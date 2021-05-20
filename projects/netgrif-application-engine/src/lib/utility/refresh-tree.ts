import {MatTreeNestedDataSource} from '@angular/material/tree';

/**
 * Forces a re-render of the tree backed by the datasource
 */
export function refreshTree(tree: MatTreeNestedDataSource<unknown>) {
    const d = tree.data;
    tree.data = null;
    tree.data = d;
}

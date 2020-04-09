import {Rule, Tree} from '@angular-devkit/schematics';
import {SidenavPromptOptions} from './files/sidenav-toolbar-files/sidenav-prompt-options';
import {createSidenavOrToolbarView} from './create-sidenav-or-toolbar-view';

export function chooseSideNavType(options: SidenavPromptOptions): Rule {
    return (tree: Tree) => {
        return createSidenavOrToolbarView(tree, options);
    };
}

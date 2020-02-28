import {
    Rule,
    Tree
} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';

export function createViewPrompt(options: CreateViewArguments): Rule {
    return (tree: Tree) => {

        console.log(options);

        return tree;
    };
}

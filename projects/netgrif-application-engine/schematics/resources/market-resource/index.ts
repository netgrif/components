import {Rule, Tree} from '@angular-devkit/schematics';
import {createFilesFromTemplates, getProjectInfo} from '../../utilityFunctions';


export function initializeMarketResources(_options: any): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const {name} = _options;
        const {type} = _options;
        const {address} = _options;
        const sourcePath = './files/' + name + '/' + name + '-' + type;
        return createFilesFromTemplates(sourcePath, projectInfo.path as string, {
            url: address
        });
    };
}

import {strings} from '@angular-devkit/core';
import {ImportToAdd} from './import-to-add';

export class ViewClassInfo extends ImportToAdd {

    /**
     * for `caseView` located at route `cases/all/` this is equal to `cases-all`
     */
    public prefix: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `CasesAllCaseView`
     */
    public nameWithoutComponent: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `CasesAllCaseViewComponent`
     */
    public className: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `./views/cases/all/cases-all-case-view.component`
     */
    public fileImportPath: string;

    constructor(path: string, componentSuffix: string, customComponentName?: string) {
        super('', '');
        if (!customComponentName) {
            this.prefix = ViewClassInfo.convertPathToClassNamePrefix(path);
            this.nameWithoutComponent = `${strings.classify(this.prefix)}${componentSuffix}`;
            this.fileImportPath = `./views/${path}/${this.prefix}-${strings.dasherize(componentSuffix)}.component`;
        } else {
            this.prefix = '';
            this.nameWithoutComponent = strings.classify(customComponentName);
            this.fileImportPath = `./views/${path}/${strings.dasherize(customComponentName)}.component`;
        }
        this.className = `${this.nameWithoutComponent}Component`;
    }

    private static convertPathToClassNamePrefix(path: string): string {
        return path.replace(/-/g, '_').replace(/\//g, '-').toLocaleLowerCase();
    }
}

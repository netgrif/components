import { strings } from '@angular-devkit/core';

export class ViewClassInfo {

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
    public name: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `./views/cases/all/cases-all-case-view.component`
     */
    public fileImportPath: string;

    constructor(path: string, componentSuffix: string, customComponentName?: string) {
        if (!customComponentName) {
            this.prefix = ViewClassInfo.convertPathToClassNamePrefix(path);
            this.nameWithoutComponent = `${strings.classify(this.prefix)}${componentSuffix}`;
            this.fileImportPath = `./views/${path}/${this.prefix}-${strings.dasherize(componentSuffix)}.component`;
        } else {
            this.prefix = '';
            this.nameWithoutComponent = strings.classify(customComponentName);
            this.fileImportPath = `./views/${path}/${strings.dasherize(customComponentName)}.component`;
        }
        this.name = `${this.nameWithoutComponent}Component`;
    }

    private static convertPathToClassNamePrefix(path: string): string {
        return path.replace(/-/g, '_').replace(/\//g, '-').toLocaleLowerCase();
    }
}

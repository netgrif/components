import { strings } from '@angular-devkit/core';

export class ViewClassInfo {

    /**
     * for `caseView` located at route `cases/all/` this is equal to `cases-all`
     */
    public prefix: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `CasesAllCaseView`
     */
    public withoutComponent: string;
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
            this.withoutComponent = `${strings.classify(this.prefix)}${componentSuffix}`;
            this.fileImportPath = `./views/${path}/${this.prefix}-${strings.dasherize(componentSuffix)}.component`;
        } else {
            this.prefix = '';
            this.withoutComponent = strings.classify(customComponentName);
            this.fileImportPath = `./views/${path}/${strings.dasherize(customComponentName)}.component`;
        }
        this.name = `${this.withoutComponent}Component`;
    }

    private static convertPathToClassNamePrefix(path: string): string {
        return path.replace(/-/g, '_').replace(/\//g, '-').toLocaleLowerCase();
    }
}

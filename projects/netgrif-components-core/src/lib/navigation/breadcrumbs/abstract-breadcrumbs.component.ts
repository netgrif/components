import {Component, Input} from '@angular/core';
import {UriService} from '../service/uri.service';

@Component({
    selector: 'ncc-breadcrumbs-component',
    template: ''
})
export abstract class AbstractBreadcrumbsComponent {

    @Input() showHome: boolean = true;
    @Input() lengthOfPath: number = 30;
    @Input() partsAfterDots: number = 2;
    private static DOTS: string = '...';
    private static DELIMETER: string = '/';
    private _showPaths: boolean = false;

    constructor(protected _uriService: UriService) {
    }

    public getPath(): Array<string> {
        const tmp = this._uriService.getSplittedPath();
        if (tmp?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
            const newPath = [tmp[0], AbstractBreadcrumbsComponent.DOTS];
            for (let i = tmp.length - this.partsAfterDots; i < tmp.length; i++) {
                newPath.push(tmp[i]);
            }
            return newPath;
        }
        return tmp === undefined ? [] : tmp;
    }

    public reset(): void {
        this._uriService.reset();
    }

    public changePath(path: string, count: number) {
        if (path === AbstractBreadcrumbsComponent.DOTS && count === 1) {
            this._showPaths = true;
            return;
        }
        let fullPath: string = '';
        const tmp = this._uriService.getSplittedPath();
        if (tmp === undefined) return;
        const control = this.resultCounter(count, tmp);
        for (let i = 0; i <= control; i++) {
            fullPath += tmp[i];
            if (i !== control) fullPath += AbstractBreadcrumbsComponent.DELIMETER;
        }
        this._uriService.getNodeByPath(fullPath).subscribe(node => {
            this._uriService.activeNode = node;
        })
    }

    private resultCounter(count: number, tmp: string[]): number {
        if (tmp?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
            return tmp.length - this.partsAfterDots + (count - 2);
        }
        return count;
    }
}

import {Component} from '@angular/core';
import {UriService} from '../service/uri.service';

@Component({
    selector: 'ncc-breadcrumbs-component',
    template: ''
})
export abstract class AbstractBreadcrumbsComponent {

    private static ROOT: string = 'root';
    private _showPaths: boolean;

    constructor(protected _uriService: UriService) {
    }

    public getPath(): string[] {
        const tmp = this._uriService.activeNode?.uriPath.split('/').filter(s => s !== AbstractBreadcrumbsComponent.ROOT);
        if (tmp?.length > 3 && !this._showPaths) {
            return [tmp[0], '...' , tmp[tmp.length - 2], tmp[tmp.length - 1]]
        }
        return tmp === undefined ? [] : tmp;
    }

    public reset(): void {
        this._uriService.reset();
    }

    public changePath(path: string, count: number) {
        if (path === '...' && count === 1) {
            this._showPaths = true;
            return;
        }
        let fullPath: string = '';
        const tmp = this._uriService.activeNode?.uriPath.split('/').filter(s => s !== AbstractBreadcrumbsComponent.ROOT);
        if (tmp === undefined) return;
        const control = this._showPaths ? count : this.resultCounter(count, tmp);
        for (let i = 0; i <= control; i++) {
            fullPath += tmp[i];
            if (i !== count) fullPath += '/';
        }
        this._uriService.getNodeByPath(fullPath).subscribe(node => {
            this._uriService.activeNode = node;
        })
    }

    private resultCounter(count: number, tmp: string[]): number {
        if (count === 2) return tmp.length - 2;
        if (count === 3) return tmp.length - 1;
        return count;
    }
}

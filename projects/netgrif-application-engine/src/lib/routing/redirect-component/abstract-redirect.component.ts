import {NavigationStart, Router} from '@angular/router';

export abstract class AbstractRedirectComponent {

    constructor(protected router: Router) {
        this.router.navigate([this.parseRedirectPath(router.url)]);
    }

    public parseRedirectPath(url: string): string {
        let path: string;
        if (url.includes('?')) {
            path = url.slice(0, url.indexOf('?'));
        } else {
            path = url;
        }
        return path.replace('/redirect', '');
    }

    public parseRedirectParams(url: string): string {
        return url.slice(0, url.indexOf('?'));
    }
}

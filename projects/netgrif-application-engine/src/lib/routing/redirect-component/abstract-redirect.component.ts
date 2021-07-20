import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {LoggerService} from '../../logger/services/logger.service';

export abstract class AbstractRedirectComponent {

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected log: LoggerService) {
        this.router.navigate([this.parseRedirectPath(router.url)], {queryParams: this.route.snapshot.queryParams});
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
}

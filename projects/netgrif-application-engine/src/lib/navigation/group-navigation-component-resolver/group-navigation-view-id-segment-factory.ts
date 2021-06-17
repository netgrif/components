import {ActivatedRoute} from '@angular/router';
import {GroupNavigationConstants} from '../model/group-navigation-constants';

export function groupNavigationViewIdSegmentFactory(activatedRoute: ActivatedRoute): string {
    return activatedRoute.snapshot.paramMap.get(GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM);
}

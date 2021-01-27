import {ActivatedRoute, Router} from '@angular/router';
import {ProcessService} from '../../process/process.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {mergeMap} from 'rxjs/operators';

export const getNetAndCreateCase = (router: Router,
                                    route: ActivatedRoute,
                                    process: ProcessService,
                                    caseResourceService: CaseResourceService,
                                    snackBarService: SnackBarService) => {
    process.getNet(route.snapshot.paramMap.get('petriNetId')).pipe(mergeMap(net => {
        if (net) {
            const newCase = {
                title: 'Nový prípad',
                color: 'panel-primary-icon',
                netId: net.stringId
            };
            return caseResourceService.createCase(newCase);
        } else {
            snackBarService.openWarningSnackBar('Net doesn\'t exists');
        }
    })).subscribe(response => {
            router.navigate([route.snapshot.url.join('/') + '/' + response.stringId]);
        }, error => {
            snackBarService.openErrorSnackBar('Error while creating case ' + error);
        }
    );
};

import {Component, Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL, SideMenuControl, AbstractFilesUploadComponent} from '@netgrif/application-engine';
/**
 * Create and bind to [SideMenuContainerComponent]{@link SideMenuContainerComponent} via `Portal`
 * after click on file field in task panel.
 */
@Component({
    selector: 'nc-files-upload',
    templateUrl: './files-upload.component.html',
    styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent extends AbstractFilesUploadComponent {

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) injectedData: SideMenuControl) {
        super(injectedData);
    }
}

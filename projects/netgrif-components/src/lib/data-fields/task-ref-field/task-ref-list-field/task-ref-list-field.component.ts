import {Component, Inject, Injector,  Optional} from '@angular/core';
import {
    AbstractTaskRefListFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TaskRefField, ValidationRegistryService
} from "@netgrif/components-core";
import {
    DefaultTaskViewComponent
} from "../../../navigation/group-navigation-component-resolver/default-components/default-task-view/default-task-view.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-task-ref-list-field',
  templateUrl: './task-ref-list-field.component.html',
  styleUrls: ['./task-ref-list-field.component.scss']
})
export class TaskRefListFieldComponent extends AbstractTaskRefListFieldComponent {

  constructor(injector: Injector,
              translate: TranslateService,
              validationRegistry: ValidationRegistryService,
              @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
      super(injector, DefaultTaskViewComponent, translate, validationRegistry, dataFieldPortalData)
  }

}

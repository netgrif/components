import {Component, Inject, Injector,  Optional} from '@angular/core';
import {
    AbstractTaskRefListFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TaskRefField
} from "@netgrif/components-core";
import {
    DefaultTabbedTaskViewComponent
} from "../../../navigation/group-navigation-component-resolver/default-components/default-tabbed-task-view/default-tabbed-task-view.component";

@Component({
  selector: 'nc-task-ref-list-field',
  templateUrl: './task-ref-list-field.component.html',
  styleUrls: ['./task-ref-list-field.component.scss']
})
export class TaskRefListFieldComponent extends AbstractTaskRefListFieldComponent {

  constructor(injector: Injector,
              @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
      super(injector, DefaultTabbedTaskViewComponent, dataFieldPortalData)
  }

}

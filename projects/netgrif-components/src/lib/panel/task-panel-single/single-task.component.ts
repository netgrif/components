import { Component, Inject, Optional } from '@angular/core';
import {
    AbstractSingleTaskComponent,
    InjectedTabData,
    LoggerService,
    NAE_TAB_DATA
} from 'netgrif-components-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nc-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent extends AbstractSingleTaskComponent {

  constructor(protected _log: LoggerService,
              protected _route: ActivatedRoute,
              @Optional() @Inject(NAE_TAB_DATA) _injectedTabData: InjectedTabData) {
      super(_log, _route, _injectedTabData);
  }

}

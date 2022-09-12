import { Component, OnInit } from '@angular/core';
import {
    ImpersonationUserSelectService
} from '../../../../../netgrif-components-core/src/lib/impersonation/services/impersonation-user-select.service';

@Component({
  selector: 'nae-app-impersonation',
  templateUrl: './impersonation.component.html',
  styleUrls: ['./impersonation.component.scss']
})
export class ImpersonationComponent implements OnInit {

  constructor(
      private _impersonate: ImpersonationUserSelectService
  ) { }

  ngOnInit(): void {
  }

  public test(): void {
      this._impersonate.selectImpersonate();
  }

}

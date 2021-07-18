import { Component, OnInit } from '@angular/core';
import {AbstractRedirectComponent} from 'netgrif-application-engine';
import {Router} from '@angular/router';

@Component({
  selector: 'nae-app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent extends AbstractRedirectComponent implements OnInit {

  constructor(protected router: Router) {
      super(router);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {AbstractRedirectComponent, LoggerService} from '@netgrif/application-engine';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'nae-app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent extends AbstractRedirectComponent implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected log: LoggerService) {
      super(route, router, log);
  }

  ngOnInit(): void {
  }

}

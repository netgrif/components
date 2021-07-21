import { Component, OnInit } from '@angular/core';
import {RedirectService} from '@netgrif/application-engine';

@Component({
  selector: 'nc-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(protected redirectService: RedirectService) {
  }

  ngOnInit(): void {
      this.redirectService.redirectFromUrl();
  }

}

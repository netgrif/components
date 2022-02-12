import { Component, OnInit } from '@angular/core';
import {RedirectService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(protected redirectService: RedirectService,
              public translate: TranslateService) {
  }

  ngOnInit(): void {
      this.redirectService.redirectFromUrl();
  }

}

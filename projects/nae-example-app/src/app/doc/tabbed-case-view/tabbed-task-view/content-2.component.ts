import {Component, Inject, OnInit} from '@angular/core';
import {NAE_TAB_DATA} from '@netgrif/application-engine';

@Component({
  selector: 'nae-app-content',
  templateUrl: './content-2.component.html',
  styleUrls: ['./content-2.component.scss']
})
export class Content2Component implements OnInit {

  constructor(@Inject(NAE_TAB_DATA) public injected) { }

  ngOnInit(): void {
  }

}

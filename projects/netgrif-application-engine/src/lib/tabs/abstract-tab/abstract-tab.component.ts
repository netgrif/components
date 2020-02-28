import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CaseTabComponent} from "../case-tab/case-tab.component";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'nae-abstract-tab',
  templateUrl: './abstract-tab.component.html',
  styleUrls: ['./abstract-tab.component.scss']
})

export class AbstractTabComponent implements OnInit {

  constructor() { }

    @Input() taksTab: boolean;


  ngOnInit() {
  }

}

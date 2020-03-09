import { Component, OnInit } from '@angular/core';
import {Resources} from "./resources";

@Component({
  selector: 'nae-task-panel-content',
  templateUrl: './task-panel-content.component.html',
  styleUrls: ['./task-panel-content.component.scss']
})
export class TaskPanelContentComponent implements OnInit {
  resources: any;
  formCols: number;

  constructor() {
      this.resources = JSON.parse(Resources.json);
      this.formCols = this.resources._embedded.cols;
  }

  ngOnInit(): void {
  }

}

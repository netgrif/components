import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'nae-data-field-template',
  templateUrl: './data-field-template.component.html',
  styleUrls: ['./data-field-template.component.scss']
})
export class DataFieldTemplateComponent implements OnInit {

    @Input() public title: string;

    ngOnInit() {
    }
}

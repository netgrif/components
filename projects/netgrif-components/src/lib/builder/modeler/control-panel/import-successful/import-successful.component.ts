import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'nc-builder-import-successful',
  templateUrl: './import-successful.component.html',
  styleUrls: ['./import-successful.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class ImportSuccessfulComponent {
  constructor() {
  }
}

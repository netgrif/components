import {Component, Inject, OnInit} from '@angular/core';
import {NAE_TAB_DATA} from '@netgrif/application-engine';

@Component({
  selector: 'nae-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(@Inject(NAE_TAB_DATA) public injected) {}

  ngOnInit(): void {
  }

  currentIndex(): void {
      console.log(this.injected.tabViewRef.currentlySelectedTab());
  }

}

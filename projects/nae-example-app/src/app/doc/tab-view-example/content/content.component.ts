import {Component, Inject, OnInit} from '@angular/core';
import {InjectedTabData, NAE_TAB_DATA} from '@netgrif/application-engine';

@Component({
  selector: 'nae-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(@Inject(NAE_TAB_DATA) public injected: InjectedTabData & {text: string}) {
      injected.tabSelected$.subscribe(switchType => {
          if (switchType) {
              console.log(`Tab with id ${injected.tabUniqueId} selected`);
          } else {
              console.log(`Tab with id ${injected.tabUniqueId} deselected`);
          }
      });
      injected.tabClosed$.subscribe(() => {
          console.log(`Tab with id ${injected.tabUniqueId} closed`);
      });
  }

  ngOnInit(): void {
  }

  currentIndex(): void {
      console.log(this.injected.tabViewRef.currentlySelectedTab());
  }

  closeThisTab(): void {
      this.injected.tabViewRef.closeTabUniqueId(this.injected.tabUniqueId, true);
  }
}

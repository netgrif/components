import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent2 } from './content-component2.component';

describe('ContentComponent', () => {
  let component: ContentComponent2;
  let fixture: ComponentFixture<ContentComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

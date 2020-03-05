import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCreationDetectorComponent } from './tab-creation-detector.component';

describe('TabCreationDetectorComponent', () => {
  let component: TabCreationDetectorComponent;
  let fixture: ComponentFixture<TabCreationDetectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCreationDetectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCreationDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

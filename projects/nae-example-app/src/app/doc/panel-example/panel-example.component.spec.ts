import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExampleComponent } from './panel-example.component';

describe('PanelExampleComponent', () => {
  let component: PanelExampleComponent;
  let fixture: ComponentFixture<PanelExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasePanelExampleComponent } from './case-panel-example.component';

describe('CasePanelExampleComponent', () => {
  let component: CasePanelExampleComponent;
  let fixture: ComponentFixture<CasePanelExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasePanelExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePanelExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

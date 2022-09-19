import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpersonateQuickPanelComponent } from './impersonate-quick-panel.component';

describe('ImpersonateQuickPanelComponent', () => {
  let component: ImpersonateQuickPanelComponent;
  let fixture: ComponentFixture<ImpersonateQuickPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpersonateQuickPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpersonateQuickPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTabViewComponent } from './default-tab-view.component';

describe('DefaultTabViewComponent', () => {
  let component: DefaultTabViewComponent;
  let fixture: ComponentFixture<DefaultTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultTabViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

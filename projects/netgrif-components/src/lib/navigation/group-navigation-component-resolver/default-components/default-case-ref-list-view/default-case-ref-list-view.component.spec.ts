import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCaseRefListViewComponent } from './default-case-ref-list-view.component';

describe('DefaultCaseViewComponent', () => {
  let component: DefaultCaseRefListViewComponent;
  let fixture: ComponentFixture<DefaultCaseRefListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultCaseRefListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCaseRefListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseListPaginatorComponent } from './case-list-paginator.component';

describe('CaseListPaginatorComponent', () => {
  let component: CaseListPaginatorComponent;
  let fixture: ComponentFixture<CaseListPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseListPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

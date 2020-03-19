import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSidemenuExampleComponent } from './case-sidemenu-example.component';

describe('CaseSidemenuExampleComponent', () => {
  let component: CaseSidemenuExampleComponent;
  let fixture: ComponentFixture<CaseSidemenuExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseSidemenuExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSidemenuExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

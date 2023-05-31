import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNoFilterProvidedComponent } from './default-no-filter-provided.component';

describe('DefaultNoFilterProvidedComponent', () => {
  let component: DefaultNoFilterProvidedComponent;
  let fixture: ComponentFixture<DefaultNoFilterProvidedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultNoFilterProvidedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNoFilterProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

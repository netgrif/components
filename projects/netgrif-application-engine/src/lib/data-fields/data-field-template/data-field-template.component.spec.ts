import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFieldTemplateComponent } from './data-field-template.component';

describe('DataFieldTemplateComponent', () => {
  let component: DataFieldTemplateComponent;
  let fixture: ComponentFixture<DataFieldTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFieldTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFieldTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

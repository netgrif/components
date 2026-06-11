import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FunctionEditorComponent} from './function-editor.component';

describe('FunctionEditorComponent', () => {
  let component: FunctionEditorComponent;
  let fixture: ComponentFixture<FunctionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionEditorComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

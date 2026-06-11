import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionEditorMenuComponent} from './action-editor-menu.component';

describe('ActionEditorMenuComponent', () => {
  let component: ActionEditorMenuComponent;
  let fixture: ComponentFixture<ActionEditorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionEditorMenuComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEditorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

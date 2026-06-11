import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionEditorMenuDescriptionComponent} from './action-editor-menu-description.component';

describe('ActionEditorMenuDescriptionComponent', () => {
  let component: ActionEditorMenuDescriptionComponent;
  let fixture: ComponentFixture<ActionEditorMenuDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionEditorMenuDescriptionComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEditorMenuDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

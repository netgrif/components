import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionEditorMenuItemComponent} from './action-editor-menu-item.component';

describe('ActionEditorMenuItemComponent', () => {
  let component: ActionEditorMenuItemComponent;
  let fixture: ComponentFixture<ActionEditorMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionEditorMenuItemComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEditorMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

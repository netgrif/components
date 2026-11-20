import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionEditorMenuDescriptionComponent} from './action-editor-menu-description.component';
import {TranslateService} from "@ngx-translate/core";

describe('ActionEditorMenuDescriptionComponent', () => {
  let component: ActionEditorMenuDescriptionComponent;
  let fixture: ComponentFixture<ActionEditorMenuDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionEditorMenuDescriptionComponent],
        providers: [
            {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
        ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEditorMenuDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

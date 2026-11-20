import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogDeleteModelComponent} from './dialog-delete-model.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";

describe('DialogDeleteModelComponent', () => {
  let component: DialogDeleteModelComponent;
  let fixture: ComponentFixture<DialogDeleteModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            TranslateLibModule,
            HttpClientTestingModule,
        ],
      declarations: [ DialogDeleteModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteModelComponent);
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

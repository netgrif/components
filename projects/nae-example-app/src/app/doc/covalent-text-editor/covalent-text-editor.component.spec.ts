import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovalentTextEditorComponent } from './covalent-text-editor.component';

describe('CovalentTextEditorComponent', () => {
  let component: CovalentTextEditorComponent;
  let fixture: ComponentFixture<CovalentTextEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovalentTextEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovalentTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

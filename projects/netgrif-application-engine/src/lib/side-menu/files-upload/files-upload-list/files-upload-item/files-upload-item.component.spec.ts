import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadItemComponent } from './files-upload-item.component';

describe('FilesUploadItemComponent', () => {
  let component: FilesUploadItemComponent;
  let fixture: ComponentFixture<FilesUploadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesUploadItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

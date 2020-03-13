import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadListComponent } from './files-upload-list.component';

describe('FilesUploadListComponent', () => {
  let component: FilesUploadListComponent;
  let fixture: ComponentFixture<FilesUploadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesUploadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

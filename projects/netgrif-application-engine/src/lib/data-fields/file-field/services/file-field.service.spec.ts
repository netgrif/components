import { TestBed } from '@angular/core/testing';

import { FileFieldService } from './file-field.service';
import {FileDownloadService} from './download/file-download.service';
import {FileUploadService} from './upload/file-upload.service';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {SnackBarService} from '../../../snack-bar/snack-bar.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('FileFieldService', () => {
  let service: FileFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MaterialModule],
        providers: [
            FileDownloadService,
            FileUploadService,
            SideMenuService,
            SnackBarService,
            FileFieldService,
            {provide: ConfigurationService, useClass: TestConfigurationService}
        ]
    });
    service = TestBed.inject(FileFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


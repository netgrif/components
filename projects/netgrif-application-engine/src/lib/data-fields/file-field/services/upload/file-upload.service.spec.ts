import {TestBed} from '@angular/core/testing';
import {FileUploadService} from './file-upload.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../../material/material.module';

describe('FileUploadService', () => {
    let service: FileUploadService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule],
            providers: [
                FileUploadService
            ]});
        service = TestBed.inject(FileUploadService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

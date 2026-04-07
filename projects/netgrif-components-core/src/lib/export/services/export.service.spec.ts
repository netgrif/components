import { TestBed } from '@angular/core/testing';
import { ExportService } from './export.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigurationService } from '../../configuration/configuration.service';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from '../../filter/models/filter';
import { HeaderColumn, HeaderColumnType } from '../../header/models/header-column';

describe('ExportService', () => {
    let service: ExportService;
    let httpMock: HttpTestingController;

    const mockConfigService = {
        get: () => ({
            providers: {
                resources: [{ name: 'case', address: 'http://mock-api' }]
            }
        })
    };

    const mockTranslateService = {
        instant: (key: string) => `translated-${key}`
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ExportService,
                { provide: ConfigurationService, useValue: mockConfigService },
                { provide: TranslateService, useValue: mockTranslateService }
            ]
        });

        service = TestBed.inject(ExportService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getResourceAddress()', () => {
        it('should return the address from an array', () => {
            const result = service.getResourceAddress('case', [{ name: 'case', address: 'http://test' }]);
            expect(result).toBe('http://test');
        });

        it('should return the address from a single object', () => {
            const result = service.getResourceAddress('case', { name: 'case', address: 'http://test' });
            expect(result).toBe('http://test');
        });

        it('should return an empty string if not found', () => {
            const result = service.getResourceAddress('other', [{ name: 'case', address: 'http://test' }]);
            expect(result).toBe('');
        });
    });

    describe('downloadExcelFromCurrentSelection()', () => {
        it('should return true and trigger file download on valid response', (done) => {
            spyOn(document.body, 'appendChild');
            spyOn(document.body, 'removeChild');

            const mockFilter: Filter = {
                getRequestBody: () => ({ some: 'query' })
            } as any;

            const headers: HeaderColumn[] = [
                new HeaderColumn(HeaderColumnType.IMMEDIATE, 'name', 'Name', 'string', true, 'net-id'),
                new HeaderColumn(HeaderColumnType.META, 'date', 'Date', 'date')
            ];

            service.downloadExcelFromCurrentSelection(mockFilter, headers).subscribe((result) => {
                expect(result).toBeTrue();
                done();
            });

            const req = httpMock.expectOne('http://mock-api/export/filteredCases');
            expect(req.request.method).toBe('POST');
            req.flush(new ArrayBuffer(10), {
                headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
            });
        });

        it('should return false when response body is missing', (done) => {
            const mockFilter: Filter = {
                getRequestBody: () => ({ some: 'query' })
            } as any;

            service.downloadExcelFromCurrentSelection(mockFilter, []).subscribe((result) => {
                expect(result).toBeFalse();
                done();
            });

            const req = httpMock.expectOne('http://mock-api/export/filteredCases');
            req.flush(null, { headers: { 'Content-Type': 'application/octet-stream' } });
        });
    });
});

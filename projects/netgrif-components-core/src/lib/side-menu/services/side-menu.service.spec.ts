import {TestBed} from '@angular/core/testing';
import {SideMenuService} from './side-menu.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SideMenuService', () => {
    let service: SideMenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule]
        });
        service = TestBed.inject(SideMenuService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

import {TestBed} from '@angular/core/testing';
import {SideMenuService} from './side-menu.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SideMenuService', () => {
    let service: SideMenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule]
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

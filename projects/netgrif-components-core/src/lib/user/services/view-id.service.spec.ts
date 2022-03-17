import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewIdService} from './view-id.service';
import {Component, Injectable, Optional} from '@angular/core';
import {NAE_VIEW_ID_SEGMENT} from '../models/view-id-injection-tokens';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('ViewIdService', () => {
    let helperService: ViewIdServiceGetter;
    let fixture: ComponentFixture<TestRootComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            declarations: [
                TestRootComponent,
                TestDirectComponent,
                TestSkippedComponent,
                TestBottomComponent
            ],
            providers: [
                ViewIdServiceGetter
            ]
        }).compileComponents();
        helperService = TestBed.inject(ViewIdServiceGetter);
        fixture = TestBed.createComponent(TestRootComponent);
    });

    it('should be created in root', () => {
        expect(helperService).toBeTruthy();
        expect(helperService.rootService).toBeTruthy();
    });

    it('should be created in direct descendant', () => {
        expect(helperService).toBeTruthy();
        expect(helperService.directService).toBeTruthy();
    });

    it('should be created in indirect descendant', () => {
        expect(helperService).toBeTruthy();
        expect(helperService.bottomService).toBeTruthy();
    });

    it('should resolve correct view ids', () => {
        expect(helperService).toBeTruthy();
        expect(helperService.rootService.viewId).toEqual('root');
        expect(helperService.directService.viewId).toEqual('root' + ViewIdService.VIEW_ID_SEGMENT_SEPARATOR + 'direct');
        expect(helperService.skippedService.viewId).toEqual('root');
        expect(helperService.bottomService.viewId).toEqual('root' + ViewIdService.VIEW_ID_SEGMENT_SEPARATOR + 'bottom');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-root',
    template: '<nae-test-direct></nae-test-direct><nae-test-skipped></nae-test-skipped>',
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'root'},
        ViewIdService
    ]
})
class TestRootComponent {
    constructor(@Optional() id: ViewIdService, helper: ViewIdServiceGetter) {
        helper.rootService = id;
    }
}

@Component({
    selector: 'nae-test-direct',
    template: '',
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'direct'},
        ViewIdService
    ]
})
class TestDirectComponent {
    constructor(@Optional() id: ViewIdService, helper: ViewIdServiceGetter) {
        helper.directService = id;
    }
}

@Component({
    selector: 'nae-test-skipped',
    template: '<nae-test-bottom></nae-test-bottom>'
})
class TestSkippedComponent {
    constructor(@Optional() id: ViewIdService, helper: ViewIdServiceGetter) {
        helper.skippedService = id;
    }
}

@Component({
    selector: 'nae-test-bottom',
    template: '',
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'bottom'},
        ViewIdService
    ]
})
class TestBottomComponent {
    constructor(@Optional() id: ViewIdService, helper: ViewIdServiceGetter) {
        helper.bottomService = id;
    }
}

@Injectable()
class ViewIdServiceGetter {
    public rootService: ViewIdService;
    public directService: ViewIdService;
    public skippedService: ViewIdService;
    public bottomService: ViewIdService;
}

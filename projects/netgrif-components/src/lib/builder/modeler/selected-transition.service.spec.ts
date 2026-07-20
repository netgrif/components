import {TestBed} from '@angular/core/testing';
import {SelectedTransitionService} from './selected-transition.service';

describe('SelectedTransitionService', () => {
    let service: SelectedTransitionService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [SelectedTransitionService]});
        service = TestBed.inject(SelectedTransitionService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('id should be undefined initially', () => {
        expect(service.id).toBeUndefined();
    });

    it('should store and retrieve a transition id', () => {
        service.id = 't1';
        expect(service.id).toBe('t1');
    });

    it('should allow updating the id', () => {
        service.id = 't1';
        service.id = 't2';
        expect(service.id).toBe('t2');
    });

    it('should allow clearing the id', () => {
        service.id = 't1';
        service.id = undefined;
        expect(service.id).toBeUndefined();
    });
});

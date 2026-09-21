import {TestBed} from '@angular/core/testing';
import {BuilderMode, BuilderModeService} from './builder-mode.service';

describe('BuilderModeService', () => {
    let service: BuilderModeService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [BuilderModeService]});
        service = TestBed.inject(BuilderModeService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should default to MODELER mode', () => {
        expect(service.mode).toBe(BuilderMode.MODELER);
    });

    it('should switch mode via setter', () => {
        service.mode = BuilderMode.DATA_MODE;
        expect(service.mode).toBe(BuilderMode.DATA_MODE);
    });

    it('should emit new mode via mode$()', (done) => {
        const emitted: BuilderMode[] = [];
        service.mode$().subscribe(m => emitted.push(m));

        service.mode = BuilderMode.ROLE_MODE;
        service.mode = BuilderMode.ACTION_MODE;

        // BehaviorSubject replays current value on subscribe + 2 explicit sets
        expect(emitted).toEqual([BuilderMode.MODELER, BuilderMode.ROLE_MODE, BuilderMode.ACTION_MODE]);
        done();
    });

    it('mode$() should return Observable, not Subject (no .next method)', () => {
        const obs = service.mode$();
        expect((obs as any).next).toBeUndefined();
    });

    it('should switch through all defined modes', () => {
        const modes = Object.values(BuilderMode);
        modes.forEach(m => {
            service.mode = m;
            expect(service.mode).toBe(m);
        });
    });
});

import {TestBed} from '@angular/core/testing';
import {ArcType, PetriNet, Place, Transition} from '@netgrif/petriflow';
import {ArcFactory} from '../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from './model.service';

describe('ModelService', () => {
    let service: ModelService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [ModelService, ArcFactory]});
        service = TestBed.inject(ModelService);
        service.model = service.newModel();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('newModel() should return a valid PetriNet', () => {
        const net = service.newModel();
        expect(net).toBeInstanceOf(PetriNet);
        expect(net.id).toBeTruthy();
        expect(net.title).toBeTruthy();
    });

    it('setting model should update the current model', () => {
        const net = service.newModel();
        net.id = 'test-net';
        service.model = net;
        expect(service.model.id).toBe('test-net');
    });

    it('setting model should emit via model$()', () => {
        const emitted: PetriNet[] = [];
        service.model$().subscribe(m => emitted.push(m));
        const net = service.newModel();
        service.model = net;
        expect(emitted.length).toBeGreaterThanOrEqual(1);
    });

    // PLACE

    it('newPlace() should add a place to the model', () => {
        const before = service.model.getPlaces().length;
        service.newPlace(100, 100);
        expect(service.model.getPlaces().length).toBe(before + 1);
    });

    it('first place should have marking = 1', () => {
        const place = service.newPlace(100, 100);
        expect(place.marking).toBe(1);
    });

    it('second place should have marking = 0', () => {
        service.newPlace(100, 100);
        const second = service.newPlace(200, 200);
        expect(second.marking).toBe(0);
    });

    it('newPlace() should assign unique IDs', () => {
        const p1 = service.newPlace(100, 100);
        const p2 = service.newPlace(200, 200);
        expect(p1.id).not.toBe(p2.id);
    });

    it('copyPlace() should create an independent copy with new ID', () => {
        const original = service.newPlace(100, 100);
        original.marking = 5;
        const copy = service.copyPlace(original);
        expect(copy.id).not.toBe(original.id);
        expect(copy.marking).toBe(5);
        expect(service.model.getPlaces().length).toBe(2);
    });

    it('removePlace() should remove the place from the model', () => {
        const place = service.newPlace(100, 100);
        const id = place.id;
        service.removePlace(place);
        expect(service.model.getPlace(id)).toBeUndefined();
    });

    it('removePlace() should emit via placeChange', (done) => {
        const place = service.newPlace(100, 100);
        service.placeChange.subscribe(change => {
            expect(change).toBeTruthy();
            done();
        });
        service.removePlace(place);
    });

    it('removePlace() should remove connected arcs', () => {
        const place = service.newPlace(100, 100);
        const transition = service.newTransition(200, 200);
        service.newArc(place, transition, ArcType.REGULAR_PT);
        expect(service.model.getArcs().length).toBe(1);
        service.removePlace(place);
        expect(service.model.getArcs().length).toBe(0);
    });

    // TRANSITION

    it('newTransition() should add a transition to the model', () => {
        const before = service.model.getTransitions().length;
        service.newTransition(100, 100);
        expect(service.model.getTransitions().length).toBe(before + 1);
    });

    it('newTransition() should assign unique IDs', () => {
        const t1 = service.newTransition(100, 100);
        const t2 = service.newTransition(200, 200);
        expect(t1.id).not.toBe(t2.id);
    });

    it('copyTransition() should create independent copy with new ID', () => {
        const original = service.newTransition(100, 100);
        const copy = service.copyTransition(original);
        expect(copy.id).not.toBe(original.id);
        expect(service.model.getTransitions().length).toBe(2);
    });

    it('removeTransition() should remove the transition from the model', () => {
        const t = service.newTransition(100, 100);
        const id = t.id;
        service.removeTransition(t);
        expect(service.model.getTransition(id)).toBeUndefined();
    });

    it('removeTransition() should remove connected arcs', () => {
        const place = service.newPlace(100, 100);
        const transition = service.newTransition(200, 200);
        service.newArc(place, transition, ArcType.REGULAR_PT);
        service.removeTransition(transition);
        expect(service.model.getArcs().length).toBe(0);
    });

    // ARC

    it('newArc() should create PT arc between place and transition', () => {
        const place = service.newPlace(100, 100);
        const transition = service.newTransition(200, 200);
        const arc = service.newArc(place, transition, ArcType.REGULAR_PT);
        expect(arc).toBeTruthy();
        expect(arc.type).toBe(ArcType.REGULAR_PT);
        expect(service.model.getArcs().length).toBe(1);
    });

    it('newArc() should create TP arc between transition and place', () => {
        const place = service.newPlace(100, 100);
        const transition = service.newTransition(200, 200);
        const arc = service.newArc(transition, place, ArcType.REGULAR_TP);
        expect(arc.type).toBe(ArcType.REGULAR_TP);
    });

    it('removeArc() should remove arc from model', () => {
        const place = service.newPlace(100, 100);
        const transition = service.newTransition(200, 200);
        const arc = service.newArc(place, transition, ArcType.REGULAR_PT);
        service.removeArc(arc);
        expect(service.model.getArcs().length).toBe(0);
    });

    it('newArc() should emit via arcChange', (done) => {
        const place = service.newPlace(100, 100);
        const transition = service.newTransition(200, 200);
        service.arcChange.subscribe(change => {
            expect(change).toBeTruthy();
            done();
        });
        service.newArc(place, transition, ArcType.REGULAR_PT);
    });
});

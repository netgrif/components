import {Injectable} from '@angular/core';
import {CanvasConfiguration} from '@netgrif/petri.svg';
import {
  Action,
  Arc,
  ArcType,
  Breakpoint,
  DataType,
  DataVariable,
  I18nString,
  ImportUtils,
  NodeElement,
  PetriNet,
  Place,
  Role,
  Transition,
  XmlArcType,
} from '@netgrif/petriflow';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ChangedTransition} from '../../../dialogs/dialog-transition-edit/changed-transition';
import {ChangedArc} from '../../../dialogs/dialog-arc-edit/changed-arc';
import {ArcFactory} from '../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelChange} from '../../history-mode/model/model/model-change';
import {PlaceChange} from '../../history-mode/model/place/place-change';
import {PlaceDeleted} from '../../history-mode/model/place/place-deleted';
import {PlaceMoved} from '../../history-mode/model/place/place-moved';
import {ModelerConfig} from '../../modeler-config';
import {ModelerUtils} from '../../modeler-utils';
import {ChangedRole} from '../../role-mode/role-detail/changed-role';
import {ModelConfig} from './model-config';
import {SequenceGenerator} from './sequence-generator';

@Injectable()
export class ModelService {
    private readonly _model: BehaviorSubject<PetriNet>;
    private readonly _placeChange: Subject<PlaceChange>;
    private readonly _transitionChange: Subject<ChangedTransition>;
    private readonly _arcChange: Subject<ChangedArc>;

    private _placeIdSequence = new SequenceGenerator('p');
    private _transitionIdSequence = new SequenceGenerator('t');
    private _arcIdSequence = new SequenceGenerator('a');
    private _dataIdSequence = new SequenceGenerator('data');
    private _roleIdSequence = new SequenceGenerator('role');
    private _actionIdSequence = new SequenceGenerator('action');

    private xmlArcTypeMapping: Map<XmlArcType, ArcType> = new Map([
        [XmlArcType.REGULAR, ArcType.REGULAR_PT],
        [XmlArcType.READ, ArcType.READ],
        [XmlArcType.RESET, ArcType.RESET],
        [XmlArcType.INHIBITOR, ArcType.INHIBITOR],
    ]);
    private arcTypeMapping: Map<ArcType, XmlArcType> = new Map([
        [ArcType.REGULAR_PT, XmlArcType.REGULAR],
        [ArcType.REGULAR_TP, XmlArcType.REGULAR],
        [ArcType.READ, XmlArcType.READ],
        [ArcType.RESET, XmlArcType.RESET],
        [ArcType.INHIBITOR, XmlArcType.INHIBITOR],
    ]);

    constructor(
        private arcFactory: ArcFactory,
    ) {
        this._model = new BehaviorSubject<PetriNet>(undefined);
        this._placeChange = new Subject<PlaceChange>();
        this._transitionChange = new Subject<ChangedTransition>();
        this._arcChange = new Subject<ChangedArc>();
    }

    set model(newModel: PetriNet) {
        this.alignModel(newModel);
        this._model.next(newModel);
        this._placeIdSequence.reset(newModel.getPlaces());
        this._transitionIdSequence.reset(newModel.getTransitions());
        this._arcIdSequence.reset(newModel.getArcs());
        this._dataIdSequence.reset(newModel.getDataSet());
        this._roleIdSequence.reset(newModel.getRoles());
        this._actionIdSequence.reset(this.collectActions(newModel));
    }

    get model(): PetriNet {
        return this._model.value;
    }

    model$(): Observable<PetriNet> {
        return this._model.asObservable();
    }

    public newModel(): PetriNet {
        const model = new PetriNet();
        model.id = ModelConfig.IDENTIFIER;
        model.version = ModelConfig.VERSION;
        model.title = new I18nString(ModelConfig.TITLE);
        model.initials = ModelConfig.INITIALS;
        model.icon = ModelConfig.ICON;
        return model;
    }

    public updateModel(changedModel: ModelChange): void {
        this.model.id = changedModel.model.id;
        this.model.title = changedModel.model.title;
        this.model.initials = changedModel.model.initials;
        this.model.icon = changedModel.model.icon;
        this.model.defaultRole = changedModel.model.defaultRole;
        this.model.anonymousRole = changedModel.model.anonymousRole;
        this.model.caseName = changedModel.model.caseName;
        this.model.tags = changedModel.model.tags;
        this.model.version = changedModel.model.version;
    }

    // PLACE

    public newPlace(x: number, y: number): Place {
        const place = new Place(
            this.alignPositionCoordinate(x, CanvasConfiguration.WIDTH),
            this.alignPositionCoordinate(y, CanvasConfiguration.HEIGHT),
            false,
            this.nextPlaceId(),
        );
        if (this.model.getPlaces().length === 0) {
            place.marking = 1;
        }
        this.model.addPlace(place);
        return place;
    }

    public copyPlace(copy: Place): Place {
        const place = copy.clone();
        place.id = this.nextPlaceId();
        place.x += ModelerConfig.SIZE;
        place.y += ModelerConfig.SIZE;
        this.model.addPlace(place);
        return place;
    }

    public updatePlace(newPlace: PlaceChange): void {
        if (!newPlace) {
            return;
        }
        // TODO: NAB-326 validate unique id
        const place = this.model.getPlace(newPlace.originalPlace.id);
        place.id = newPlace.place.id;
        place.marking = newPlace.place.marking;
        place.label = newPlace.place.label;
        this.model.removePlace(newPlace.originalPlace.id);
        this.model.addPlace(place);
        this.model.getArcs()
            .filter(arc => arc.reference === newPlace.originalPlace.id)
            .forEach(arc => arc.reference = place.id);
        this.model.lastChanged = Date.now();
        this._placeChange.next(new PlaceChange(newPlace.originalPlace, place, this.model.clone()));
    }

    public movePlace(place: Place, position: DOMPoint): void {
        place.x = this.alignPositionX(position.x);
        place.y = this.alignPositionY(position.y);
        this.model.lastChanged = Date.now();
        this._placeChange.next(new PlaceMoved(place, this.model.clone()));
    }

    public removePlace(place: Place): void {
        this.model.getArcs()
            .filter(arc => arc.source === place || arc.destination === place)
            .forEach(arc => this.removeArc(arc));
        this.model.getArcs()
            .filter(arc => arc.reference === place.id)
            .forEach(arc => {
                arc.reference = undefined;
                arc.multiplicity = 1;
            });
        this.model.removePlace(place.id);
        this.model.lastChanged = Date.now();
        this._placeChange.next(new PlaceDeleted(place, this.model.clone()));
    }

    // TRANSITION

    public newTransition(x: number, y: number): Transition {
        const transition = new Transition(
            this.alignPositionCoordinate(x, CanvasConfiguration.WIDTH),
            this.alignPositionCoordinate(y, CanvasConfiguration.HEIGHT),
            this.nextTransitionId(),
        );
        this.addTransition(transition);
        return transition;
    }

    public copyTransition(copy: Transition): Transition {
        const transition = copy.clone();
        transition.id = this.nextTransitionId();
        transition.x += ModelerConfig.SIZE;
        transition.y += ModelerConfig.SIZE;
        this.addTransition(transition);
        return transition;
    }

    private addTransition(transition: Transition) {
        this.model.addTransition(transition);
        this.model.lastChanged = Date.now();
        this._transitionChange.next(new ChangedTransition(this.model.clone(), transition));
    }

    public updateTransition(newTransition: ChangedTransition): void {
        if (!newTransition) {
            return;
        }
        // TODO: NAB-326 validate unique id
        const transition = this.model.getTransition(newTransition.id);
        transition.id = newTransition.transition.id;
        transition.label = newTransition.transition.label;
        transition.icon = newTransition.transition.icon;
        transition.tags = newTransition.transition.tags;
        transition.assignPolicy = newTransition.transition.assignPolicy;
        transition.finishPolicy = newTransition.transition.finishPolicy;
        transition.triggers = newTransition.transition.triggers;
        this.model.removeTransition(newTransition.id);
        this.model.addTransition(transition);
        this.model.lastChanged = Date.now();
        this._transitionChange.next(new ChangedTransition(this.model.clone(), transition, newTransition.id));
    }

    public moveTransition(transition: Transition, position: DOMPoint): void {
        transition.x = this.alignPositionX(position.x);
        transition.y = this.alignPositionY(position.y);
        this.model.lastChanged = Date.now();
        this._transitionChange.next(new ChangedTransition(this.model.clone(), transition));
    }

    public removeTransition(transition: Transition): void {
        this.model.getArcs()
            .filter(arc => arc.source === transition || arc.destination === transition)
            .forEach(arc => this.removeArc(arc));
        this.model.removeTransition(transition.id);
        this.model.lastChanged = Date.now();
        this._transitionChange.next(new ChangedTransition(this.model.clone(), undefined, transition.id));
    }

    // ARC

    public newArc(source: NodeElement, destination: NodeElement, type: ArcType): Arc<NodeElement, NodeElement> {
        const arc = this.arcFactory.buildArc(type, this.nextArcId(), source, destination);
        this.addArc(arc);
        return arc;
    }

    public copyArc(copy: Arc<NodeElement, NodeElement>, sourceId: string, destinationId: string): Arc<NodeElement, NodeElement> {
        const arc = copy.clone();
        arc.id = this.nextArcId();
        arc.breakpoints.forEach(bp => {
            bp.x += ModelerConfig.SIZE;
            bp.y += ModelerConfig.SIZE;
        });
        arc.source = arc.type === ArcType.REGULAR_TP ? this.model.getTransition(sourceId) : this.model.getPlace(sourceId);
        arc.destination = arc.type === ArcType.REGULAR_TP ? this.model.getPlace(destinationId) : this.model.getTransition(destinationId);
        this.addArc(arc);
        return arc;
    }

    public updateArc(newArc: ChangedArc): Arc<NodeElement, NodeElement> {
        if (!newArc) {
            return;
        }
        let arc = this.model.getArc(newArc.id);
        if (newArc.arcType !== arc.type) {
            arc = this.arcFactory.buildArc(newArc.arcType, arc.id, arc.source, arc.destination);
            this.model.removeArc(arc.id);
            this.model.addArc(arc);
        }
        arc.multiplicity = newArc.arc.multiplicity;
        arc.reference = newArc.arc.reference;
        arc.breakpoints = newArc.arc.breakpoints;
        this.model.lastChanged = Date.now();
        this._arcChange.next(new ChangedArc(this.model.clone(), arc));
        return arc;
    }

    public newArcBreakpoint(arc: Arc<NodeElement, NodeElement>, position: DOMPoint, index: number): void {
        const breakPoint = new Breakpoint(
            this.alignPositionX(position.x),
            this.alignPositionY(position.y),
        );
        arc.breakpoints.splice(index, 0, breakPoint);
        this.model.lastChanged = Date.now();
        this._arcChange.next(new ChangedArc(this.model.clone(), arc));
    }

    public moveArcBreakpoint(arc: Arc<NodeElement, NodeElement>, index: number, position: DOMPoint): void {
        position = this.alignPosition(position);
        // TODO: NAB-327 breakpoint undefined?
        arc.breakpoints[index].x = position.x;
        arc.breakpoints[index].y = position.y;
        this.model.lastChanged = Date.now();
        this._arcChange.next(new ChangedArc(this.model.clone(), arc));
    }

    public removeArcBreakpoint(arc: Arc<NodeElement, NodeElement>, index: number): void {
        arc.breakpoints.splice(index, 1);
        this.model.lastChanged = Date.now();
        this._arcChange.next(new ChangedArc(this.model.clone(), arc));
    }

    private addArc(arc: Arc<NodeElement, NodeElement>) {
        this.model.addArc(arc);
        this.model.lastChanged = Date.now();
        this._arcChange.next(new ChangedArc(this.model.clone(), arc));
    }

    public removeArc(arc: Arc<NodeElement, NodeElement>): void {
        this.model.removeArc(arc.id);
        this.model.lastChanged = Date.now();
        this._arcChange.next(new ChangedArc(this.model.clone(), undefined, arc.id));
    }

    public toXmlArcType(arcType: ArcType): XmlArcType {
        return this.arcTypeMapping.get(arcType);
    }

    public toArcType(xmlArcType: XmlArcType): ArcType {
        return this.xmlArcTypeMapping.get(xmlArcType);
    }

    // DATA

    public removeDataVariable(data: DataVariable): void {
        if (data.type === DataType.USER_LIST && this.model.getUserRef(data.id)) {
            this.model.removeUserRef(data.id);
        }
        this.model.getTransitions().forEach(t => {
            t.dataGroups
                .filter(group => group.getDataRef(data.id))
                .forEach(group => group.removeDataRef(data.id));
            if (data.type === DataType.USER_LIST && t.userRefs) {
                t.userRefs = t.userRefs.filter(ref => ref.id !== data.id);
            }
        });
        this.model.getArcs()
            .filter(a => a.reference === data.id)
            .forEach(a => {
                a.reference = undefined;
                a.multiplicity = 1;
            });
        this.model.removeData(data.id);
    }

    // ROLE

    public newRole(): Role {
        const role = new Role(this.nextRoleId());
        this.model.addRole(role);
        this.model.lastChanged = Date.now();
        return role;
    }

    public copyRole(copy: Role): Role {
        // TODO: release/4.0.0 action ids after clone everywhere
        const role = copy.clone();
        role.id = this.nextRoleId();
        this.model.addRole(role);
        this.model.lastChanged = Date.now();
        return role;
    }

    public updateRole(newRole: ChangedRole): Role {
        if (!newRole) {
            return;
        }
        const role = this.model.getRole(newRole.id);
        role.id = newRole.role.id;
        role.title = newRole.role.title;
        role.global = newRole.role.global;
        this.model.removeRole(newRole.id);
        this.model.addRole(role);

        const processRoleRef = this.model.getRoleRef(newRole.id);
        if (processRoleRef) {
            this.model.removeRoleRef(newRole.id);
            processRoleRef.id = role.id;
            this.model.addRoleRef(processRoleRef);
        }
        this.model.getTransitions()
            .map(t => t.roleRefs.find(ref => ref.id === newRole.id))
            .filter(r => r !== undefined)
            .forEach(roleRef => {
                roleRef.id = role.id;
            });

        this.model.lastChanged = Date.now();
        return role;
    }

    public removeRole(role: Role): void {
        this.model.removeRole(role.id);
        this.model.removeRoleRef(role.id);
        this.model.getTransitions().forEach(trans => {
            const index = trans.roleRefs.findIndex(roleRef => roleRef.id === role.id);
            if (index !== -1) {
                trans.roleRefs.splice(index, 1);
            }
        });
        this.model.lastChanged = Date.now();
    }

    // utils

    public nextPlaceId(): string {
        const id = this._placeIdSequence.next();
        if (this.model.getPlace(id) !== undefined) {
            return this.nextPlaceId();
        }
        return id;
    }

    public nextTransitionId(): string {
        const id = this._transitionIdSequence.next();
        if (this.model.getTransition(id) !== undefined) {
            return this.nextTransitionId();
        }
        return id;
    }

    public nextArcId(): string {
        const id = this._arcIdSequence.next();
        if (this.model.getArc(id) !== undefined) {
            return this.nextArcId();
        }
        return id;
    }

    public nextDataId(): string {
        const id = this._dataIdSequence.next();
        if (this.model.getData(id) !== undefined) {
            return this.nextDataId();
        }
        return id;
    }

    public nextRoleId(): string {
        const id = this._roleIdSequence.next();
        if (this.model.getRole(id) !== undefined) {
            return this.nextRoleId();
        }
        return id;
    }

    public nextActionId(): string {
        return this._actionIdSequence.next();
    }

    private collectActions(newModel: PetriNet): Action[] {
        const actions = new Array<Action>();
        newModel.getCaseEvents().forEach(e => {
            actions.push(...e.preActions);
            actions.push(...e.postActions);
        });
        newModel.getProcessEvents().forEach(e => {
            actions.push(...e.preActions);
            actions.push(...e.postActions);
        });
        newModel.getRoles().forEach(r => {
            r.getEvents().forEach(e => {
                actions.push(...e.preActions);
                actions.push(...e.postActions);
            });
        });
        newModel.getTransitions().forEach(t => {
            t.eventSource.getEvents().forEach(e => {
                actions.push(...e.preActions);
                actions.push(...e.postActions);
            });
            t.dataGroups.forEach(g => g.getDataRefs().forEach(d => d.getEvents().forEach(e => {
                actions.push(...e.preActions);
                actions.push(...e.postActions);
            })));
        });
        newModel.getDataSet().forEach(d => {
            d.getEvents().forEach(e => {
                actions.push(...e.preActions);
                actions.push(...e.postActions);
            });
        });
        return actions;
    }

    public alignModel(model = this.model): void {
        [...model.getPlaces(), ...model.getTransitions()].forEach(node => {
            node.x = this.alignPositionX(node.x);
            node.y = this.alignPositionY(node.y);
        });
        model.getArcs().forEach(a => {
            a.breakpoints.forEach(bp => {
                bp.x = this.alignPositionX(bp.x);
                bp.y = this.alignPositionY(bp.y);
            });
        });
    }

    public alignPosition(position: DOMPoint): DOMPoint {
        return new DOMPoint(
            this.alignPositionX(position.x),
            this.alignPositionY(position.y),
        );
    }

    public alignPositionX(x: number): number {
        return this.alignPositionCoordinate(x, ModelerConfig.MAX_WIDTH);
    }

    public alignPositionY(y: number): number {
        return this.alignPositionCoordinate(y, ModelerConfig.MAX_HEIGHT);
    }

    public alignPositionCoordinate(originalPosition: number, maxCoordinate: number): number {
        let newPosition = Math.round(originalPosition / ModelerConfig.SIZE) * ModelerConfig.SIZE;
        newPosition = originalPosition < newPosition ? newPosition - ModelerConfig.SIZE / 2 : newPosition + ModelerConfig.SIZE / 2;
        if (newPosition < 0) {
            newPosition += ModelerConfig.SIZE;
        } else if (newPosition > maxCoordinate) {
            newPosition -= ModelerConfig.SIZE;
        }
        return newPosition;
    }

    public getReferenceValue(id: string, model: PetriNet = this.model): number {
        // TODO: NAB-326 probably move to petriflow.js
        const referencedData = model.getData(id);
        if (referencedData) {
            if (referencedData.init?.value) {
                if (ImportUtils.isInitValueNumber(referencedData.init)) {
                    return Number(referencedData.init.value);
                }
                return 0;
            }
            return 0;
        }
        const referencedPlace = model.getPlace(id);
        if (referencedPlace) {
            return referencedPlace.marking;
        }
        return 0;
    }

    get placeChange(): Subject<PlaceChange> {
        return this._placeChange;
    }

    get transitionChange(): Subject<ChangedTransition> {
        return this._transitionChange;
    }

    get arcChange(): Subject<ChangedArc> {
        return this._arcChange;
    }

    numberOfActions(): number {
        const caseEvents = ModelerUtils.numberOfEventActions(this.model.getCaseEvents());
        const processEvents = ModelerUtils.numberOfEventActions(this.model.getProcessEvents());
        return caseEvents + processEvents;
    }

    numberOfPermissions(): number {
        const rolePermissions = this.model.getRoleRefs()
            .map(ref => {
                return (ref.logic.view !== undefined || ref.logic.create !== undefined || ref.logic.delete !== undefined) ? 1 : 0;
            }).reduce((sum, current) => sum + current, 0);
        const userPermission = this.model.getUserRefs()
            .map(ref => {
                return (ref.logic.view !== undefined || ref.logic.create !== undefined || ref.logic.delete !== undefined) ? 1 : 0;
            }).reduce((sum, current) => sum + current, 0);
        return rolePermissions + userPermission;
    }

    numberOfTransitionActions(transition: Transition): number {
        const eventActions = ModelerUtils.numberOfEventActions(transition.eventSource.getEvents());
        const dataRefActions = transition.dataGroups
            .map(dg =>
                dg.getDataRefs()
                    .map(ref =>
                        ModelerUtils.numberOfEventActions(ref.getEvents()),
                    ).reduce((sum, current) => sum + current, 0),
            ).reduce((sum, current) => sum + current, 0);
        return eventActions + dataRefActions;
    }

    numberOfTransitionPermissions(transition: Transition): number {
        const rolePermissions = transition.roleRefs
            .map(ref => {
                return (ref.logic.cancel !== undefined || ref.logic.view !== undefined || ref.logic.assign !== undefined || ref.logic.perform !== undefined || ref.logic.delegate !== undefined) ? 1 : 0;
            }).reduce((sum, current) => sum + current, 0);
        const userPermission = transition.userRefs
            .map(ref => {
                return (ref.logic.cancel !== undefined || ref.logic.view !== undefined || ref.logic.assign !== undefined || ref.logic.perform !== undefined || ref.logic.delegate !== undefined) ? 1 : 0;
            }).reduce((sum, current) => sum + current, 0);
        return rolePermissions + userPermission;
    }
}

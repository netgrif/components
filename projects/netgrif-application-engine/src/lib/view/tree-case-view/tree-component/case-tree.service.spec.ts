import {TestBed} from '@angular/core/testing';
import {CaseTreeService} from './case-tree.service';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TreeCaseViewService} from '../tree-case-view.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {Filter} from '../../../filter/models/filter';
import {Params} from '../../../resources/resource-provider.service';
import {Observable, of} from 'rxjs';
import {Page} from '../../../resources/interface/page';
import {Case} from '../../../resources/interface/case';
import {FilterType} from '../../../filter/models/filter-type';
import {CaseSearchRequestBody} from '../../../filter/models/case-search-request-body';
import {Injectable} from '@angular/core';
import {Task} from '../../../resources/interface/task';
import {IncrementingCounter} from '../../../utility/incrementing-counter';
import {createMockTask} from '../../../utility/tests/utility/create-mock-task';
import {createMockCase} from '../../../utility/tests/utility/create-mock-case';
import {createMockImmediateData} from '../../../utility/tests/utility/create-mock-immediate-data';
import {TreePetriflowIdentifiers} from '../model/tree-petriflow-identifiers';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {CaseGetRequestBody} from '../../../resources/interface/case-get-request-body';
import {Net} from '../../../process/net';
import {ProcessService} from '../../../process/process.service';
import {createMockPage} from '../../../utility/tests/utility/create-mock-page';
import {TaskSearchCaseQuery, TaskSearchRequestBody} from '../../../filter/models/task-search-request-body';
import {EventOutcome} from '../../../resources/interface/event-outcome';
import {TaskSetDataRequestBody} from '../../../resources/interface/task-set-data-request-body';
import {ChangedFieldContainer} from '../../../resources/interface/changed-field-container';
import {getImmediateData} from '../../../utility/get-immediate-data';


class MockTreeNode {
    constructor(public initiallyAvailable: boolean,
                public children: Array<MockTreeNode> = [],
                public stringId?: string) {
    }
}

describe('CaseTreeService', () => {
    let treeService: CaseTreeService;
    let caseResourceMock: TreeTestCaseResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                TreeCaseViewService,
                CaseTreeService,
                TreeTestTaskResourceService,
                TreeTestCaseResourceService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: CaseResourceService, useExisting: TreeTestCaseResourceService},
                {provide: TaskResourceService, useExisting: TreeTestTaskResourceService},
                {provide: ProcessService, useClass: TreeTestProcessService}
            ]
        });
        treeService = TestBed.inject(CaseTreeService);
        caseResourceMock = TestBed.inject(TreeTestCaseResourceService);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should be created', () => {
        expect(treeService).toBeTruthy();
    });

    it('should initialize with root node shown', (done) => {
        caseResourceMock.createMockTree(new MockTreeNode(true, [], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(true).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(1);
                    done();
                });
            }
        });

        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    it('should initialize with root node hidden', (done) => {
        caseResourceMock.createMockTree(new MockTreeNode(true, [], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(false).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(0);
                    done();
                });
            }
        });

        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    it('should initialize lazy-loaded tree with root node shown', (done) => {
        /*
              O
              /\
             O  O
            /\  /\
           O  OO  O
         */
        caseResourceMock.createMockTree(new MockTreeNode(true, [
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)]),
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)])
        ], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(true).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(1);
                    expect(treeService.dataSource.data[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children.length).toEqual(0);
                    done();
                });
            }
        });

        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    it('should initialize lazy-loaded tree with root node hidden', (done) => {
        /*
              O
              /\
             O  O
            /\  /\
           O  OO  O
         */
        caseResourceMock.createMockTree(new MockTreeNode(true, [
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)]),
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)])
        ], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(false).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(2);
                    expect(treeService.dataSource.data[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children.length).toEqual(0);
                    expect(treeService.dataSource.data[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[1].children.length).toEqual(0);
                    done();
                });
            }
        });

        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    it('should initialize eager-loaded tree with root node shown', (done) => {
        /*
              O
              /\
             O  O
            /\  /\
           O  OO  O
         */
        caseResourceMock.createMockTree(new MockTreeNode(true, [
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)]),
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)])
        ], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(true).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(1);
                    expect(treeService.dataSource.data[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children.length).toEqual(2);
                    expect(treeService.dataSource.data[0].children[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[0].children.length).toEqual(2);
                    expect(treeService.dataSource.data[0].children[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[1].children.length).toEqual(2);
                    expect(treeService.dataSource.data[0].children[0].children[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[0].children[0].children.length).toEqual(0);
                    expect(treeService.dataSource.data[0].children[0].children[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[0].children[1].children.length).toEqual(0);
                    expect(treeService.dataSource.data[0].children[1].children[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[1].children[0].children.length).toEqual(0);
                    expect(treeService.dataSource.data[0].children[1].children[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[1].children[1].children.length).toEqual(0);
                    done();
                });
            }
        });

        treeService.isEagerLoaded = true;
        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    it('should initialize eager-loaded tree with root node hidden', (done) => {
        /*
              O
              /\
             O  O
            /\  /\
           O  OO  O
         */
        caseResourceMock.createMockTree(new MockTreeNode(true, [
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)]),
            new MockTreeNode(true, [new MockTreeNode(true), new MockTreeNode(true)])
        ], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(false).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(2);
                    expect(treeService.dataSource.data[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children.length).toEqual(2);
                    expect(treeService.dataSource.data[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[1].children.length).toEqual(2);
                    expect(treeService.dataSource.data[0].children[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[0].children.length).toEqual(0);
                    expect(treeService.dataSource.data[0].children[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children[1].children.length).toEqual(0);
                    expect(treeService.dataSource.data[1].children[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[1].children[0].children.length).toEqual(0);
                    expect(treeService.dataSource.data[1].children[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[1].children[1].children.length).toEqual(0);
                    done();
                });
            }
        });

        treeService.isEagerLoaded = true;
        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    it('should add root child with root node shown', (done) => {
        caseResourceMock.createMockTree(new MockTreeNode(true, [], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(true).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(1);
                    expect(treeService.dataSource.data[0].children).toBeTruthy();
                    expect(treeService.dataSource.data[0].children.length).toEqual(0);

                    treeService.addRootChildNode().subscribe(success => {
                        expect(success).toBeTrue();
                        expect(treeService.dataSource).toBeTruthy();
                        expect(treeService.dataSource.data).toBeTruthy();
                        expect(treeService.dataSource.data.length).toEqual(1);
                        expect(treeService.dataSource.data[0].children).toBeTruthy();
                        expect(treeService.dataSource.data[0].children.length).toEqual(1);
                        expect(treeService.dataSource.data[0].children[0]).toBeTruthy();
                        expect(treeService.dataSource.data[0].children[0].children).toBeTruthy();
                        expect(treeService.dataSource.data[0].children[0].children.length).toEqual(0);
                        done();
                    });
                });
            }
        });

        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    it('should add root child with root node hidden', (done) => {
        caseResourceMock.createMockTree(new MockTreeNode(true, [], 'root'));

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(false).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(0);

                    treeService.addRootChildNode().subscribe(success => {
                        expect(success).toBeTrue();
                        expect(treeService.dataSource).toBeTruthy();
                        expect(treeService.dataSource.data).toBeTruthy();
                        expect(treeService.dataSource.data.length).toEqual(1);
                        expect(treeService.dataSource.data[0].children).toBeTruthy();
                        expect(treeService.dataSource.data[0].children.length).toEqual(0);
                        done();
                    });
                });
            }
        });

        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });

    // NAE-1185
    it('should eager load added subtree', (done) => {
        const subtreeToAdd = new MockTreeNode(false, [new MockTreeNode(true)]);
        caseResourceMock.createMockTree(new MockTreeNode(true, [subtreeToAdd], 'root'));
        caseResourceMock.createNext = subtreeToAdd;

        treeService.treeRootLoaded$.subscribe(loaded => {
            if (loaded) {
                treeService.initializeTree(false).subscribe(() => {
                    expect(treeService.dataSource).toBeTruthy();
                    expect(treeService.dataSource.data).toBeTruthy();
                    expect(treeService.dataSource.data.length).toEqual(0);

                    treeService.addRootChildNode().subscribe(success => {
                        expect(success).toBeTrue();
                        expect(treeService.dataSource).toBeTruthy();
                        expect(treeService.dataSource.data).toBeTruthy();
                        expect(treeService.dataSource.data.length).toEqual(1);
                        expect(treeService.dataSource.data[0].children).toBeTruthy();
                        expect(treeService.dataSource.data[0].children.length).toEqual(1);
                        expect(treeService.dataSource.data[0].children[0]).toBeTruthy();
                        expect(treeService.dataSource.data[0].children[0].children.length).toEqual(0);
                        done();
                    });
                });
            }
        });

        treeService.isEagerLoaded = true;
        treeService.rootFilter = SimpleFilter.fromCaseQuery({stringId: 'root'});
    });
});

@Injectable()
class TreeTestCaseResourceService {

    private _idGenerator: IncrementingCounter;

    // stringId -> Case
    public mockCases: Map<string, Case>;
    public unavailableMockCases: Map<string, Case>;

    public createNext: MockTreeNode = undefined;

    constructor(protected _mockTaskService: TreeTestTaskResourceService) {
        this.mockCases = new Map<string, Case>();
        this.unavailableMockCases = new Map<string, Case>();
        this._idGenerator = new IncrementingCounter();
        this._mockTaskService.mockCaseService = this;
    }

    public createMockTree(rootNode: MockTreeNode): void {
        this.createMockTreeNode(rootNode);
    }

    private createMockTreeNode(node: MockTreeNode): string {
        const treeCase = createMockCase(`${node.stringId ? node.stringId : this._idGenerator.next()}`, 'mockTree');
        node.stringId = treeCase.stringId;
        treeCase.immediateData.push(createMockImmediateData(TreePetriflowIdentifiers.FEATURED_TRANSITION, '1'));
        this._mockTaskService.addTask(treeCase.stringId, '1');

        const availableChildren = [];
        node.children.forEach(childNode => {
            const childId = this.createMockTreeNode(childNode);
            if (childNode.initiallyAvailable) {
                availableChildren.push(childId);
            }
        });
        treeCase.immediateData.push(createMockImmediateData(TreePetriflowIdentifiers.CHILDREN_CASE_REF, availableChildren, ['mockTree']));

        this._mockTaskService.addTask(treeCase.stringId, TreePetriflowIdentifiers.CASE_REF_TRANSITION);
        if (node.initiallyAvailable) {
            this.mockCases.set(treeCase.stringId, treeCase);
        } else {
            this.unavailableMockCases.set(treeCase.stringId, treeCase);
        }
        return treeCase.stringId;
    }

    public searchCases(filter: Filter, params?: Params): Observable<Page<Case>> {
        if (filter.type === FilterType.CASE
            && !Array.isArray(filter.getRequestBody())
            && (filter.getRequestBody() as CaseSearchRequestBody).stringId
            && !Array.isArray((filter.getRequestBody() as CaseSearchRequestBody).stringId)) {
            const content: Array<Case> = [];
            if (this.mockCases.has((filter.getRequestBody() as CaseSearchRequestBody).stringId as string)) {
                content.push(this.mockCases.get((filter.getRequestBody() as CaseSearchRequestBody).stringId as string));
            }
            return of(createMockPage(content));
        } else {
            throw new Error('The mock TreeTestCaseResourceService cannot mock the provided filter');
        }
    }

    public getCases(body: CaseGetRequestBody, params?: Params): Observable<Page<Case>> {
        if (Array.isArray(body.stringId)) {
            const cases: Array<Case> = [];
            body.stringId.forEach(id => {
                if (this.mockCases.has(id)) {
                    cases.push(this.mockCases.get(id));
                }
            });
            return of(createMockPage(cases));
        } else {
            throw new Error('The mock TreeTestCaseResourceService cannot mock the provided filter');
        }
    }

    public createCase(body: any): Observable<Case> {
        if (body && body.title && body.netId) {
            if (!this.createNext) {
                const newCaseId = this.createMockTreeNode(new MockTreeNode(true));
                const newCase = this.mockCases.get(newCaseId);
                newCase.title = body.title;
                newCase.petriNetId = body.netId;
                return of(newCase);
            } else {
                const preparedCase = this.unavailableMockCases.get(this.createNext.stringId);
                if (!preparedCase) {
                   throw new Error('The createNext mock case must be provided to the mock service beforehand!');
                }
                this.unavailableMockCases.delete(preparedCase.stringId);
                this.mockCases.set(preparedCase.stringId, preparedCase);
                return of(preparedCase);
            }
        } else {
            throw new Error('The mock TreeTestCaseResourceService cannot mock the provided create case request');
        }
    }
}

@Injectable()
class TreeTestTaskResourceService {

    private _idGenerator: IncrementingCounter;
    private _mockCaseService: TreeTestCaseResourceService;

    // caseId#transitionId -> Task
    // stringId -> Task
    public mockTasks: Map<string, Task>;

    constructor() {
        this.mockTasks = new Map<string, Task>();
        this._idGenerator = new IncrementingCounter();
    }

    public set mockCaseService(mock: TreeTestCaseResourceService) {
        this._mockCaseService = mock;
    }

    public addTask(caseId: string, transitionId: string): void {
        const task = createMockTask(`${this._idGenerator.next()}`, 'title', transitionId);
        task.caseId = caseId;
        this.mockTasks.set(task.stringId, task);
        this.mockTasks.set(`${caseId}#${transitionId}`, task);
    }

    public getTasks(filter: Filter, params?: Params): Observable<Page<Task>> {
        if (filter.type === FilterType.TASK
            && !Array.isArray(filter.getRequestBody())
            && (filter.getRequestBody() as TaskSearchRequestBody).case
            && !Array.isArray((filter.getRequestBody() as TaskSearchRequestBody).case)
            && (filter.getRequestBody() as TaskSearchRequestBody).transitionId
            && !Array.isArray((filter.getRequestBody() as TaskSearchRequestBody).transitionId)) {
            const caseId = ((filter.getRequestBody() as TaskSearchRequestBody).case as TaskSearchCaseQuery).id;
            const transitionId = (filter.getRequestBody() as TaskSearchRequestBody).transitionId;
            const task = this.mockTasks.get(`${caseId}#${transitionId}`);
            return of(createMockPage(task ? [task] : undefined));
        } else {
            throw new Error('The mock TreeTestTaskResourceService cannot mock the provided filter');
        }
    }

    public assignTask(taskId: string): Observable<EventOutcome> {
        return of({success: '' + this.mockTasks.has(taskId), error: `Task with ID ${taskId} doesn't exist in the mock`, changedFields: {}});
    }

    public setData(taskId: string, body: TaskSetDataRequestBody): Observable<ChangedFieldContainer> {
        const task = this.mockTasks.get(taskId);
        const caseOfTask = this._mockCaseService.mockCases.get(task.caseId);
        Object.entries(body).forEach(([fieldId, changeRequest]) => {
            const data = getImmediateData(caseOfTask, fieldId);
            if (data) {
                data.value = changeRequest.value;
            }
        });
        return of({changedFields: {}});
    }

    public finishTask(taskId: string): Observable<EventOutcome> {
        return this.assignTask(taskId);
    }
}

@Injectable()
class TreeTestProcessService {
    public getNet(identifier: string): Observable<Net> {
        return of(new Net({
            stringId: identifier,
            title: '',
            identifier,
            version: '',
            initials: '',
            defaultCaseName: '',
            createdDate: [],
            author: {
                email: '',
                fullName: ''
            },
            immediateData: []
        }));
    }
}

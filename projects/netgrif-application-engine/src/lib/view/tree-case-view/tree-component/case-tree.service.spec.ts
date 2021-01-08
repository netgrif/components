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
                {provide: TaskResourceService, useExisting: TreeTestTaskResourceService}
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
                    expect(treeService.dataSource.data[0].children.length).toEqual(0);
                    expect(treeService.dataSource.data[1].children).toBeTruthy();
                    expect(treeService.dataSource.data[1].children.length).toEqual(0);
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
});

@Injectable()
class TreeTestCaseResourceService {

    private _idGenerator: IncrementingCounter;

    // stringId -> Case
    public mockCases: Map<string, Case>;

    constructor(protected _mockTaskService: TreeTestTaskResourceService) {
        this.mockCases = new Map<string, Case>();
        this._idGenerator = new IncrementingCounter();
    }

    public createMockTree(rootNode: MockTreeNode): void {
        this.createMockTreeNode(rootNode);
    }

    private createMockTreeNode(node: MockTreeNode): string {
        const treeCase = createMockCase(`${node.stringId ? node.stringId : this._idGenerator.next()}`, 'mockTree');
        treeCase.immediateData.push(createMockImmediateData(TreePetriflowIdentifiers.FEATURED_TRANSITION, '1'));
        this._mockTaskService.addTask(treeCase.stringId, '1');
        treeCase.immediateData.push(createMockImmediateData(TreePetriflowIdentifiers.CHILDREN_CASE_REF,
            node.children.map(childNode => this.createMockTreeNode(childNode)), ['mockTree']));

        this._mockTaskService.addTask(treeCase.stringId, TreePetriflowIdentifiers.CASE_REF_TRANSITION);
        this.mockCases.set(treeCase.stringId, treeCase);
        return treeCase.stringId;
    }

    public searchCases(filter: Filter, params?: Params): Observable<Page<Case>> {
        if (filter.type === FilterType.CASE
            && !Array.isArray(filter.getRequestBody())
            && (filter.getRequestBody() as CaseSearchRequestBody).stringId
            && !Array.isArray((filter.getRequestBody() as CaseSearchRequestBody).stringId)) {
            const page: Page<Case> = {
                content: {} as any,
                pagination: {
                    size: 1,
                    totalElements: 0,
                    totalPages: 1,
                    number: 0
                }
            };

            if (this.mockCases.has((filter.getRequestBody() as CaseSearchRequestBody).stringId as string)) {
                page.content = [this.mockCases.get((filter.getRequestBody() as CaseSearchRequestBody).stringId as string)];
                page.pagination.totalElements = 1;
            }

            return of(page);
        } else {
            throw new Error('The mock TreeTestCaseResourceService cannot mock the provided filter');
        }
    }

    public getCases(body: CaseGetRequestBody, params?: Params): Observable<Page<Case>> {
        if (Array.isArray(body.stringId)) {
            const page: Page<Case> = {
                content: {} as any,
                pagination: {
                    size: 1,
                    totalElements: 0,
                    totalPages: 1,
                    number: 0
                }
            };

            const cases = [];
            body.stringId.forEach(id => {
                if (this.mockCases.has(id)) {
                    cases.push(this.mockCases.get(id));
                }
            });
            if (cases.length > 0) {
                page.content = cases;
                page.pagination.size = cases.length;
                page.pagination.totalElements = cases.length;
            }

            return of(page);
        } else {
            throw new Error('The mock TreeTestCaseResourceService cannot mock the provided filter');
        }
    }
}

@Injectable()
class TreeTestTaskResourceService {

    private _idGenerator: IncrementingCounter;

    // caseId#transitionId -> Task
    // stringId -> Task
    public mockTasks: Map<string, Task>;

    constructor() {
        this.mockTasks = new Map<string, Task>();
        this._idGenerator = new IncrementingCounter();
    }

    public addTask(caseId: string, transitionId: string): void {
        const task = createMockTask(`${this._idGenerator.next()}`, 'title', transitionId);
        task.caseId = caseId;
        this.mockTasks.set(task.stringId, task);
        this.mockTasks.set(`${caseId}#${transitionId}`, task);
    }
}

import {AbstractSearchClauseComponent} from './abstract-search-clause.component';
import {Component, OnDestroy} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Subject} from 'rxjs';
import {EditableClausePredicate} from '../models/predicate/editable-clause-predicate';
import {BooleanOperator} from '../models/boolean-operator';

describe('AbstractSearchClauseComponent', () => {
    let component: TestSearchClauseComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestSearchClauseComponent,
                TestWrapperComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-search-clause',
    template: ''
})
class TestSearchClauseComponent extends AbstractSearchClauseComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-search-clause [predicate]="predicate" [remove$]="remove$" [predicateId]="0"></ncc-search-clause>'
})
class TestWrapperComponent implements OnDestroy {

    public predicate = new EditableClausePredicate(BooleanOperator.OR);
    public remove$ = new Subject();

    ngOnDestroy(): void {
        this.remove$.complete();
    }
}

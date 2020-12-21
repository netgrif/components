import {AbstractSearchClauseComponent} from './abstract-search-clause.component';
import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

describe('SearchClauseComponent', () => {
    let component: TestSearchClauseComponent;
    let fixture: ComponentFixture<TestSearchClauseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestSearchClauseComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSearchClauseComponent);
        component = fixture.componentInstance;
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
    selector: 'nae-search-clause',
    template: ''
})
class TestSearchClauseComponent extends AbstractSearchClauseComponent {
    constructor() {
        super();
    }
}

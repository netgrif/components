import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SearchService} from '../search-service/search.service';
import {TestCaseSearchServiceFactory} from '../../utility/tests/test-factory-methods';
import {Component} from '@angular/core';
import {SearchModule} from '../search.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                SearchModule,
                NoopAnimationsModule,
            ],
            providers: [
                {provide: SearchService, useFactory: TestCaseSearchServiceFactory}
            ],
            declarations: [
                TestComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-search [searchCategories]="arr"></nae-search>'
})
class TestComponent {
    arr = [];
}

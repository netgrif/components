import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CountCardComponent} from './count-card.component';
import {MatCardModule, MatProgressSpinnerModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Component} from '@angular/core';
import {CountCard} from '../model/count-card';
import {DashboardCardTypes} from '../model/dashboard-card-types';
import {CountService} from '../../../resources/abstract-endpoint/count-service';
import {Observable, of} from 'rxjs';
import {Count} from '../../../resources/interface/count';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {FilterType} from '../../../filter/models/filter-type';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CountCardComponent', () => {
    let component: CountCardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatCardModule, FlexLayoutModule, MatProgressSpinnerModule, NoopAnimationsModule],
            declarations: [CountCardComponent, TestWrapperComponent],
            providers: [{
                provide: CaseResourceService,
                useClass: EndpointMock
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-count-card [card]="card"></nae-count-card>'
})
class TestWrapperComponent {
    card: CountCard = {
        filter: {},
        layout: {
            x: 0,
            y: 0,
            cols: 1,
            rows: 1,
        },
        resourceType: FilterType.CASE,
        title: '',
        type: DashboardCardTypes.COUNT
    };
}

class EndpointMock implements CountService {
    count(body: object): Observable<Count> {
        return of({
            count: 0,
            entity: '',
        });
    }

}

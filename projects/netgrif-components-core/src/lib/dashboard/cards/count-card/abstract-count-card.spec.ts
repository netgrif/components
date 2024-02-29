import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, Injector} from '@angular/core';
import {AbstractCountCardComponent} from './abstract-count-card';
import {CountCard} from '../model/count-card';
import {FilterType} from '../../../filter/models/filter-type';
import {DashboardCardTypes} from '../model/dashboard-card-types';
import {Observable, of} from 'rxjs';
import {Count} from '../../../resources/interface/count';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';

describe('AbstractCountCardComponent', () => {
    let component: TestCountCardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatCardModule, FlexLayoutModule, MatProgressSpinnerModule, NoopAnimationsModule],
            declarations: [TestCountCardComponent, TestWrapperComponent],
            providers: [{provide: CaseResourceService, useClass: EndpointMock}]
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-count-card',
    template: ''
})
class TestCountCardComponent extends AbstractCountCardComponent {
    constructor(protected _injector: Injector) {
        super(_injector);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-count-card [card]="card"></ncc-test-count-card>'
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
        type: DashboardCardTypes.COUNT,
        portalComponent: null
    };
}

class EndpointMock {
    count(body: object): Observable<Count> {
        return of({
            count: 0,
            entity: '',
        });
    }
}

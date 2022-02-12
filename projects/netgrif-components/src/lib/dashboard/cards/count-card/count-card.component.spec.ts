import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CountCardComponent} from './count-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseResourceService, Count, CountCard, CountService, DashboardCardTypes, FilterType} from '@netgrif/components-core';

describe('CountCardComponent', () => {
    let component: CountCardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-count-card [card]="card"></nc-count-card>'
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

class EndpointMock implements CountService {
    count(body: object): Observable<Count> {
        return of({
            count: 0,
            entity: '',
        });
    }

}

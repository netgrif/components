import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {HeaderModule} from './header.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseViewService} from '../view/case-view/case-view-service';
import {of} from 'rxjs';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HeaderModule, NoopAnimationsModule],
            providers: [
                {provide: CaseViewService, useValue: {allowedNets$: of([])}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});


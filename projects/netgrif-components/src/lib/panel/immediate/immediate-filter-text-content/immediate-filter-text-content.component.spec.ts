import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextContentComponent} from './immediate-filter-text-content.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ImmediateFilterTextContentComponent', () => {
    let component: ImmediateFilterTextContentComponent;
    let fixture: ComponentFixture<ImmediateFilterTextContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImmediateFilterTextContentComponent],
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImmediateFilterTextContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

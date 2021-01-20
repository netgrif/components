import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchConfigurationInputComponent} from './search-configuration-input.component';

describe('SearchConfigurationInputComponent', () => {
    let component: SearchConfigurationInputComponent;
    let fixture: ComponentFixture<SearchConfigurationInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchConfigurationInputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchConfigurationInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

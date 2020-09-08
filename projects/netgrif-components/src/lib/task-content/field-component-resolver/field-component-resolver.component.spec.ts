import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FieldComponentResolverComponent} from './field-component-resolver.component';

describe('FieldComponentResolverComponent', () => {
    let component: FieldComponentResolverComponent;
    let fixture: ComponentFixture<FieldComponentResolverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FieldComponentResolverComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldComponentResolverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

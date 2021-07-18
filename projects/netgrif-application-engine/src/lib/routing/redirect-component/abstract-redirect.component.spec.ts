import {TestBed} from '@angular/core/testing';
import {AbstractRedirectComponent} from './abstract-redirect.component';
import {RouterTestingModule} from '@angular/router/testing';


describe('AbstractRedirectComponent', () => {
    let component: AbstractRedirectComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])]
        });
        component = TestBed.inject(AbstractRedirectComponent);
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

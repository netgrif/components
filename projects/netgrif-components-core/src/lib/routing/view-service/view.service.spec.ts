import {ViewService} from './view.service';
import {Component, Type, ChangeDetectionStrategy} from '@angular/core';
import {ViewEntry} from './model/view-entry';
import {TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

// esbuild may rename classes in the test bundle (e.g. Test1Component2), the registry is keyed by Type.name,
// so the expectations use the runtime class names instead of string literals
describe('ViewService', () => {

    it('should create', () => {
        expect(new TestViewService([])).toBeTruthy();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
    });

    it('should create with components', () => {
        const service = new TestViewService([Test1Component, Test2Component]);
        expect(service).toBeTruthy();
        expect(service.resolveNameToClass(Test1Component.name)).toBe(Test1Component);
        expect(service.resolveNameToClass(Test2Component.name)).toBe(Test2Component);
        expect(service.resolveNameToClass('unregistered')).toBe(undefined);
    });

    it('should create with View objects', () => {
        const service = new TestViewService([{id: 'view1', class: Test1Component}, {
            id: 'view2',
            class: Test2Component
        }]);
        expect(service).toBeTruthy();
        expect(service.resolveNameToClass('view1')).toBe(Test1Component);
        expect(service.resolveNameToClass('view2')).toBe(Test2Component);
        expect(service.resolveNameToClass(Test1Component.name)).toBe(undefined);
    });

    it('should create with mixed input', () => {
        const service = new TestViewService([Test1Component, {id: 'view2', class: Test2Component}]);
        expect(service).toBeTruthy();
        expect(service.resolveNameToClass(Test1Component.name)).toBe(Test1Component);
        expect(service.resolveNameToClass('view2')).toBe(Test2Component);
        expect(service.resolveNameToClass(Test2Component.name)).toBe(undefined);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class TestViewService extends ViewService {
    constructor(componentClasses: Array<Type<any> | ViewEntry>) {
        super(componentClasses, undefined, undefined, undefined);
    }
}

@Component({
    selector: 'ncc-test-1',
    template: '',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class Test1Component {
}

@Component({
    selector: 'ncc-test-2',
    template: '',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class Test2Component {
}

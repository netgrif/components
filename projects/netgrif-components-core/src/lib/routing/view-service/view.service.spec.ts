import {ViewService} from './view.service';
import {Component, Type} from '@angular/core';
import {ViewEntry} from './model/view-entry';


describe('ViewService', () => {

    it('should create', () => {
        expect(new TestViewService([])).toBeTruthy();
    });

    it('should create with components', () => {
        const service = new TestViewService([Test1Component, Test2Component]);
        expect(service).toBeTruthy();
        expect(service.resolveNameToClass('Test1Component')).toBe(Test1Component);
        expect(service.resolveNameToClass('Test2Component')).toBe(Test2Component);
        expect(service.resolveNameToClass('unregistered')).toBe(undefined);
    });

    it('should create with View objects', () => {
        const service = new TestViewService([{id: 'view1', class: Test1Component}, {id: 'view2', class: Test2Component}]);
        expect(service).toBeTruthy();
        expect(service.resolveNameToClass('view1')).toBe(Test1Component);
        expect(service.resolveNameToClass('view2')).toBe(Test2Component);
        expect(service.resolveNameToClass('Test1Component')).toBe(undefined);
    });

    it('should create with mixed input', () => {
        const service = new TestViewService([Test1Component, {id: 'view2', class: Test2Component}]);
        expect(service).toBeTruthy();
        expect(service.resolveNameToClass('Test1Component')).toBe(Test1Component);
        expect(service.resolveNameToClass('view2')).toBe(Test2Component);
        expect(service.resolveNameToClass('Test2Component')).toBe(undefined);
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
    styles: []
})
class Test1Component {}

@Component({
    selector: 'ncc-test-2',
    template: '',
    styles: []
})
class Test2Component {}

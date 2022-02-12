import {CaseTreeNode} from './case-tree-node';
import {createMockCase} from '../../../../utility/tests/utility/create-mock-case';
import {Subscription} from 'rxjs';

describe('CaseTreeNode', () => {
    it('should create', () => {
        expect(new CaseTreeNode(createMockCase(), undefined)).toBeTruthy();
    });

    // NAE-1221
    it('loggable form should be serializable', () => {
        const root = new CaseTreeNode(createMockCase(), undefined);
        expect(root).toBeTruthy();

        const child = new CaseTreeNode(createMockCase(), root);
        expect(child).toBeTruthy();

        const subscriptions: Array<Subscription> = [];
        subscriptions.push(root.loadingChildren.subscribe(() => {}));
        subscriptions.push(root.removingNode.subscribe(() => {}));
        subscriptions.push(root.addingNode.subscribe(() => {}));
        subscriptions.push(child.loadingChildren.subscribe(() => {}));
        subscriptions.push(child.removingNode.subscribe(() => {}));
        subscriptions.push(child.addingNode.subscribe(() => {}));

        expect(root.toLoggableForm()).toBeTruthy();
        expect(JSON.stringify(root.toLoggableForm())).toBeTruthy();

        expect(child.toLoggableForm()).toBeTruthy();
        expect(JSON.stringify(child.toLoggableForm())).toBeTruthy();

        subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    });
});

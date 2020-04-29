import {TabTestComponent} from './opened-tab.spec';
import {TabView} from './tab-view';

describe('TabGroup', () => {
    it('should create an instance', () => {
        expect(new TabView([])).toBeTruthy();
    });

    it('should play with tabs', () => {
        const tabs = new TabView([{
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }]);
        tabs.openTab({
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: false,
            tabContentComponent: TabTestComponent
        }, true);

        expect(tabs.selectedIndex.value).toEqual(1);
        tabs.switchToTabIndex(0);
        expect(tabs.selectedIndex.value).toEqual(0);
        tabs.switchToTabUniqueId('1');
        expect(tabs.selectedIndex.value).toEqual(1);

        tabs.openTab({
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }, false);
        tabs.initializeTab(2);
        tabs.switchToTabIndex(2);
        expect(tabs.selectedIndex.value).toEqual(2);

        tabs.closeTabIndex(2);
        expect(tabs.openedTabs.length).toEqual(2);

        expect(() => {
            tabs.closeTabIndex(1);
        }).toThrowError('Tab at index 1 can\'t be closed');

        expect(() => {
            tabs.closeTabUniqueId('1');
        }).toThrowError('Tab with ID 1 can\'t be closed');

        tabs.closeTabUniqueId('0');
        expect(tabs.openedTabs.length).toEqual(1);
    });
});

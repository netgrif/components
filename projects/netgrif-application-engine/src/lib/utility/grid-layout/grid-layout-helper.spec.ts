import {GridLayoutHelper} from './grid-layout-helper';
import {DashboardCardTypes} from '../../dashboard/cards/model/dashboard-card-types';
import {LoggerService} from '../../logger/services/logger.service';
import {LogPublisherService} from '../../logger/services/log-publisher.service';
import {DashboardParams} from '../../dashboard/dashboard-content/dashboard-params';
import {ConfigurationService} from '../../configuration/configuration.service';
import {NetgrifApplicationEngine} from '../../configuration/interfaces/schema';

describe('GridLayoutHelper', () => {
    it('should create an instance', () => {
        expect(new GridLayoutHelper(null)).toBeTruthy();
    });

    it('should test fillBlankSpace', () => {
        const params = {
            columns: 4,
            cards: [{
                type: DashboardCardTypes.COUNT,
                title: 'All tasks',
                resourceType: 'task',
                filter: '{}',
                layout: {
                    x: 0,
                    y: 0,
                    rows: 1,
                    cols: 1
                }
            }, {
                type: DashboardCardTypes.IFRAME,
                url: 'https://netgrif.com/',
                layout: {
                    x: 2,
                    y: 0,
                    rows: 2,
                    cols: 2
                }
            }, {
                type: DashboardCardTypes.COUNT,
                title: 'All cases',
                resourceType: 'case',
                filter: '{}',
                layout: {
                    x: 1,
                    y: 1,
                    rows: 1,
                    cols: 1
                }
            }]
        } as DashboardParams;
        const config = new MockConfigService();
        const gridHelper = new GridLayoutHelper(new LoggerService(new LogPublisherService(config), config));
        expect(gridHelper.fillBlankSpace(params.cards, params.columns).length).toEqual(5);
    });
});

class MockConfigService extends ConfigurationService {
    constructor() {
        super({} as NetgrifApplicationEngine);
    }
}

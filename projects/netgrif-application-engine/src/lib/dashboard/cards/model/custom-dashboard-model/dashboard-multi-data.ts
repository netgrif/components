import {DashboardSingleData} from './dashboard-single-data';

export class DashboardMultiData {

    constructor(public name: string, public series: Array<DashboardSingleData>) {
    }
}

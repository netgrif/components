import {DashboardSingleData} from './dashboard-single-data';

export class DashboardMultiData {
    name: string;
    series: Array<DashboardSingleData>;

    constructor(name: string, series: Array<DashboardSingleData>) {
        this.name = name;
        this.series = series;
    }
}

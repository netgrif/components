import {ImmediateData} from '../resources/interface/immediate-data';

export default interface Transition {
    stringId: string;
    title: string;
    petriNetId: string;
    immediateData: Array<ImmediateData>;
}

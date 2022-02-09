import Transition from './transition';

export default interface Transaction {
    transitions: Array<Transition>;
    title: string;
}

export class Behaviour {
    required: boolean;
    optional: boolean;
    visible: boolean;
    editable: boolean;
    hidden: boolean;
    forbidden: boolean;

    // disabled(): boolean {
    //     return this.visible && !this.editable
    // }
}

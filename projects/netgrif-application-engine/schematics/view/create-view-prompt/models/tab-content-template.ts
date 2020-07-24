export class TabContentTemplate {

    public icon: string;
    public text: string;
    public canBeDeleted = true;
    public order: number;
    public injectedObject: any;

    constructor(public tabContentComponent: string) {}

}

export class TabContentTemplate {

    public icon: string | undefined;
    public text: string | undefined;
    public canBeDeleted = true;
    public order: number | undefined;
    public injectedObject: any;

    constructor(public tabContentComponent: string) {}

}

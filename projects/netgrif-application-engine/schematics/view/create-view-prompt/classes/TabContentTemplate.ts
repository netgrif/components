export class TabContentTemplate {

    public icon: string;
    public text: string;
    public canBeDeleted = true;
    public order: number;

    constructor(public tabContentComponent: string) { }

}

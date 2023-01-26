import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

export class LetContext<T> {
    $implicit: T;
    nccLet: T;
}

@Directive({
    selector: '[nccLet]'
})
export class LetDirective<T = unknown> {

    private readonly context: LetContext<T>;
    private hasView: boolean;

    constructor(private templateRef?: TemplateRef<any>,
                private viewContainer?: ViewContainerRef) {
        this.context = new LetContext<T>();
        this.hasView = false;
    }
    @Input()
    set nccLet(obj: T) {
        this.context.$implicit = this.context.nccLet = obj;
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }
}

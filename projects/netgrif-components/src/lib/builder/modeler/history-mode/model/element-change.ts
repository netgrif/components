import {PetriNet} from '@netgrif/petriflow';

export abstract class ElementChange<T> {

    private readonly _originalElement: T;
    private readonly _element: T;
    private readonly _model: PetriNet;
    private readonly _message: string;

    protected constructor(originalElement: T, element: T, model: PetriNet, message: string) {
        this._originalElement = originalElement;
        this._element = element;
        this._model = model;
        this._message = message;
    }

    get model(): PetriNet {
        return this._model;
    }

    get element(): T {
        return this._element;
    }

    get originalElement(): T {
        return this._originalElement;
    }

    get message(): string {
        return this._message;
    }
}

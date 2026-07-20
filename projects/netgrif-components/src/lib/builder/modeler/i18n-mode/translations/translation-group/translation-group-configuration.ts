export enum Type {
  MODEL,
  TASK,
  DATA,
  ROLE
}

export class TranslationGroupConfiguration {
  constructor(type: Type, icon: string, title: string, description: string, disabled: () => boolean, disabledDescription: string) {
    this._type = type;
    this._icon = icon;
    this._title = title;
    this._description = description;
    this._disabled = disabled;
    this._disabledDescription = disabledDescription;
  }

  private _type: Type;

  get type(): Type {
    return this._type;
  }

  set type(value: Type) {
    this._type = value;
  }

  private _icon: string;

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _disabled: () => boolean;

  get disabled(): () => boolean {
    return this._disabled;
  }

  set disabled(value: () => boolean) {
    this._disabled = value;
  }

  private _disabledDescription: string;

  get disabledDescription(): string {
    return this._disabledDescription;
  }

  set disabledDescription(value: string) {
    this._disabledDescription = value;
  }
}

export class Locale {
  private readonly _code: string;
  private readonly _language: string;
  private readonly _languageCode: string;
  private readonly _country: string;
  private readonly _countryCode: string;

  constructor(code: string, language: string, languageCode: string, country: string, countryCode: string) {
    this._code = code;
    this._language = language;
    this._languageCode = languageCode;
    this._country = country;
    this._countryCode = countryCode;
  }

  get code(): string {
    return this._code;
  }

  get language(): string {
    return this._language;
  }

  get languageCode(): string {
    return this._languageCode;
  }

  get country(): string {
    return this._country;
  }

  get countryCode(): string {
    return this._countryCode;
  }

  get prettyName(): string {
    // return `${this.language} (${this.country})`;
    return `${this.language}`;
  }
}

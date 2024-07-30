import {Injectable} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {LanguageIcons} from './models/language-icons';

@Injectable({
    providedIn: 'root'
})
export class LanguageIconsService {
    protected _languageIcons;

    constructor(private _domSanitizer: DomSanitizer) {
    /* eslint-disable */
    /* tslint:disable */
        this._languageIcons = {
            xx: {
                languageName: 'Default',
                svgIcon: this._domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" stroke="rgb(67.843137%,70.980392%,74.117647%)" stroke-width=".04" ><path d="M.02.02h23.957v17.957H.02zm0 0" fill-rule="evenodd" fill="rgb(100%,100%,100%)"/><g fill="none"><path d="M.02.02L23.98 17.98"/><path d="M23.98.02L.02 17.98"/></g></svg>')
            },
            "en-GB": {
                languageName: 'English',
                svgIcon: this._domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" ><path d="M0 0h24v18H0z" fill="rgb(0.392157%,12.941176%,41.176471%)"/><path d="M2.813 0l9.148 6.789L21.074 0H24v2.324l-9 6.715 9 6.672V18h-3l-9-6.711L3.039 18H0v-2.25l8.961-6.676L0 2.398V0zm0 0" fill="rgb(100%,100%,100%)"/><path d="M15.898 10.539L24 16.5V18l-10.164-7.461zM9 11.289l.227 1.313L2.023 18H0zM24 0v.113l-9.336 7.051.074-1.652L22.125 0zM0 0l8.961 6.602h-2.25L0 1.574zm0 0" fill="rgb(78.431373%,6.27451%,18.039216%)"/><path d="M9.039 0v18h6V0zM0 6v6h24V6zm0 0" fill="rgb(100%,100%,100%)"/><path d="M0 7.238v3.598h24V7.238zM10.238 0v18h3.598V0zm0 0" fill="rgb(78.431373%,6.27451%,18.039216%)"/></svg>')
            },
            "de-DE": {
                languageName: 'Deutsch',
                svgIcon: this._domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" ><path d="M0 12h24v6H0zm0 0" fill="rgb(100%,80.784314%,0%)"/><path d="M0 0h24v6H0zm0 0" fill="rgb(0%,0%,0%)"/><path d="M0 6h24v6H0zm0 0" fill="rgb(86.666667%,0%,0%)"/></svg>')
            },
            "sk-SK": {
                languageName: 'Slovenčina',
                svgIcon: this._domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" ><style><![CDATA[.sk-B{fill:rgb(93.333333%,10.980392%,14.509804%)}.sk-C{fill:rgb(4.313725%,30.588235%,63.529412%)}.sk-D{fill:rgb(100%,100%,100%)}]]></style><path d="M0 0h24v18H0z" class="sk-B"/><path d="M0 0h24v12H0zm0 0" class="sk-C"/><g class="sk-D"><path d="M0 0h24v6H0zm0 0"/><path d="M8.738 13.906c-1.613-.777-3.922-2.324-3.922-5.371l.148-4.441h7.551s.145 1.391.145 4.441-2.309 4.59-3.922 5.371zm0 0"/></g><path d="M8.738 13.5c-1.48-.711-3.602-2.129-3.602-4.926L5.273 4.5h6.93s.129 1.273.129 4.074-2.113 4.215-3.594 4.926zm0 0" class="sk-B"/><path d="M9.051 7.836c.402.008 1.188.023 1.879-.207l-.012.539.016.539c-.637-.215-1.426-.219-1.883-.215v1.547h-.629V8.492c-.449-.004-1.242 0-1.879.215l.02-.539-.02-.539c.695.23 1.477.215 1.875.207v-.969c-.363 0-.887.016-1.484.211l.02-.539L6.934 6c.598.199 1.121.219 1.484.215-.02-.617-.199-1.387-.199-1.387l.52.023.516-.023s-.18.77-.199 1.387c.367.004.891-.016 1.488-.215l-.02.539.02.539a4.48 4.48 0 0 0-1.492-.211v.973zm0 0" class="sk-D"/><path d="M8.738 9.875c-.746 0-1.145 1.031-1.145 1.031s-.227-.488-.832-.488c-.414 0-.715.363-.906.703.75 1.191 1.945 1.926 2.883 2.379.938-.449 2.137-1.187 2.883-2.379-.195-.336-.496-.703-.906-.703-.609 0-.832.488-.832.488s-.395-1.031-1.145-1.031zm0 0" class="sk-C"/></svg>')
            },
        };
    }
    /* tslint:enable */
    /* eslint-enable */

    get languageIcons(): LanguageIcons {
        return this._languageIcons;
    }

    public addStringLanguageIcon(shortName: string, langName: string, svgIcon: string) {
        this.addLanguageIcon(shortName, langName, this._domSanitizer.bypassSecurityTrustHtml(svgIcon));
    }

    public addLanguageIcon(shortName: string, langName: string, svgIcon: SafeHtml) {
        this._languageIcons[shortName] = {
            languageName: langName,
            svgIcon
        }
    }
}

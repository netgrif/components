import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MockUserPreferenceService {

    constructor() { }

    public setTaskFilters(viewId: string, value: Array<string>): void {
        return;
    }

    public getTaskFilters(viewId: string): Array<string> | undefined {
        return [];
    }

    public setCaseFilters(viewId: string, value: Array<string>): void {
        return;
    }

    public getCaseFilters(viewId: string): Array<string> | undefined {
        return [];
    }

    public setHeaders(viewId: string, value: Array<string>): void {
        return;
    }

    public getHeaders(viewId: string): Array<string> | undefined {
        return undefined;
    }

    public setLocale(locale: string): void {
        return;
    }

    public getLocale(): string {
        return undefined;
    }

    set drawerWidth(drawerWidth: number) {
    }

    get drawerWidth(): number {
        return undefined;
    }

    public get preferencesChanged$(): Observable<void> {
        return of();
    }
}

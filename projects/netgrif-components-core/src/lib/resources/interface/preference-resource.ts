import {Preferences} from "./preferences";

export interface PreferenceResource {
    preferences: Preferences;
    error: string;
    message: string;
}

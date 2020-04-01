import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {
    getFirstDayOfWeek(): number {
        return 1;
    }
}

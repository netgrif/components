import {MomentDateAdapter} from '@angular/material-moment-adapter';

export class CustomDateAdapter extends MomentDateAdapter {
    getFirstDayOfWeek(): number {
        return 1;
    }
}

import { NativeDateAdapter } from '@angular/material';

export class CustomDateAdapter extends NativeDateAdapter {
    getFirstDayOfWeek(): number {
        return 1;
    }
}

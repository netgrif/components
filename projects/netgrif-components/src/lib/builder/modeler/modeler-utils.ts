import {Event} from '@netgrif/petriflow';

export class ModelerUtils {

    public static numberOfEventActions(events: Array<Event<any>>): number {
        return events.map(e => e.preActions.length + e.postActions.length)
            .reduce((sum, current) => sum + current, 0);
    }

    public static clearSelection(): void {
        if (window.getSelection()) {
            window.getSelection().removeAllRanges();
        } else if (document.getSelection()) {
            document.getSelection().empty();
        }
    }
}

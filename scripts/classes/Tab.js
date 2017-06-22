define(['angular', '../modules/Main'], function (angular) {
    return class Tab {
        page = {};
        loading = false;

        constructor(label) {
            this._label = label;
        }

        get label() {
            return this._label;
        }

        activate(){
        }
    }
});

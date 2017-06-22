define(['angular', './Tab', '../modules/Main'], function (angular, Tab) {
    return class TaskTab extends Tab {
        static _ALL_URL = "";
        static _MY_URL = "";
        static _SEARCH_URL = "";

        tasks = [];

        constructor(label, baseUrl, useCase) {
            super(label);
            this.baseUrl = baseUrl;
            this.useCase = useCase;
        }

        activate(){

        }

        reloadTasks(){
            if(this.tasks.length > 0)
                this.tasks.splice(0,this.tasks.length);
            //TODO load tasks
        }

        load(next){
            const self = this;
            let url = this.filter ? TaskTab._SEARCH_URL : this.baseUrl;
            if(next) url = this.page.next;

        }


        static get ALL_URL() {
            return this._ALL_URL;
        }

        static get MY_URL() {
            return this._MY_URL;
        }

        static get SEARCH_URL() {
            return this._SEARCH_URL;
        }
    }
});

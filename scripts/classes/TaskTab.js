define(['angular', './Tab', '../modules/Main'], function (angular, Tab) {
    return class TaskTab extends Tab {

        constructor(useCase) {
            super();
            this.useCase = useCase;
        }
    }
});

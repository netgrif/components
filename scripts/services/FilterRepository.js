define(['angular', '../classes/Filter', '../modules/Main'], function (angular, Filter) {
    angular.module('ngMain').factory('$filterRepository', function ($q, $log, $process, $user, $i18n, $config) {

        const repository = {
            storage: {},

            /**
             * Get saved filter by key
             * @param {string} key
             * @return {Filter}
             */
            get: function (key) {
                return repository.storage[key];
            },

            /**
             * Save filter to the repository
             * @param {string} key
             * @param {Filter} value
             * @return {Filter} Saved filter
             */
            put: function (key, value) {
                repository.storage[key] = value;
                return repository.storage[key];
            },

            /**
             * Remove filter by key from the repository
             * @param {string} key
             * @return {Filter} Removed filter
             */
            remove: function (key) {
                const deleted = repository.storage[key];
                if (deleted)
                    delete repository.storage[key];
                return deleted;
            },

            /**
             * Create and save default filters of the application
             */
            createDefaults: function () {
                repository.put($config.show.cases.viewId, new Filter("Base case filter", Filter.CASE_TYPE, ""));
                repository.put("tasks", new Filter($i18n.page.tasks.all, Filter.TASK_TYPE, "", null, null));
                repository.put("tasks-my", new Filter($i18n.page.tasks.my, Filter.TASK_TYPE, "(userId:\""+$user.id+"\")", null, null, [{text:$i18n.block.search.chipNameMyCases, query:"(userId:\""+$user.id+"\")"}]));
            },
        };

        return repository;
    });
});
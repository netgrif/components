/*
 Register all controllers that need to be loaded
 controller itself should be handling registration to angular app module
 */

var path = 'scripts/controllers/';
define(['MainController', 'OffersController', 'LoginController', 'ContactsController', 'DocumentsController',
    'ContractsController', 'AdminConsoleController', 'TaskController', 'ContactController','CaseDialogController',
    'TasksDialogController', 'DashboardController', 'PaymentsController']
    .map(ctrl => path+ctrl), function () {});

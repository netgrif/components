/*
 Register all controllers that need to be loaded
 controller itself should be handling registration to angular app module
 */

var path = 'scripts/controllers/';
define(['MainController', 'OffersController', 'LoginController', 'AdminConsoleController', 'TaskController','CaseDialogController', 'DashboardController']
    .map(ctrl => path+ctrl), function () {});

/*
 Register all controllers that need to be loaded
 controller itself should be handling registration to angular app module
 */
// TODO 19.6.2017 define controllers
var path = 'scripts/controllers/';
define([path + 'MainController', path + 'OffersController', path + 'LoginController', path + 'ProfileController', path + 'ContactsController', path + 'AdminConsoleController'], function () {});

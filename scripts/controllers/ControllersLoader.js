/**
 * Created by Milan on 27.1.2017.
 */
/*
    Register all controllers that need to be loaded
    controller itself should be handling registration to angular app module
 */
var path = 'scripts/controllers/';
define([path+'MainController',path+'DashboardController',path+'LoginController',path+'ProfileController',
        ,path+'TasksController',path+'AdminConsoleController'], function () {});

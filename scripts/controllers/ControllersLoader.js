/**
 * Created by Milan on 27.1.2017.
 */
/*
    Register all controllers that need to be loaded
    controller itself should be handling registration to angular app module
 */
var path = 'scripts/controllers/';
define([path+'ContentLoadingController',path+'DashboardController',path+'ProfileController'], function () {});

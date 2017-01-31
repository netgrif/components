/**
 * Created by Milan on 27.1.2017.
 */
/*
 Register all services that need to be loaded
 service itself should be handling registration to angular app module
 */
var path = 'scripts/services/';
define([path+'Loading',path+'Auth'], function () {});

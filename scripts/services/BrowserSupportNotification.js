define(['angular', 'angularRoute', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$BrowserSupportNotification', function ($location, $rootScope, $log, $i18n, $config) {

        const notification = {
            hide: function() {
                let customBrowserSupportMsg = document.getElementById("browser-support-msg");
                let buorg = document.getElementById("buorg");

                if (!customBrowserSupportMsg.classList.contains("hide"))
                    customBrowserSupportMsg.classList.add("hide");
                if (buorg)
                    if (!buorg.classList.contains("hide"))
                        buorg.classList.add("hide");
                document.documentElement.style.marginTop = '0px';
            },
            show: function() {
                let customBrowserSupportMsg = document.getElementById("browser-support-msg");

                if (customBrowserSupportMsg.classList.contains("hide"))
                    customBrowserSupportMsg.classList.remove("hide");
            },
            verifyBrowser: function() {
                const isChromium = window.chrome;
                const winNav = window.navigator;
                const vendorName = winNav.vendor;
                const isOpera = typeof window.opr !== "undefined";
                const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
                const isIOSChrome = winNav.userAgent.match("CriOS");

                if (isIOSChrome || (
                    isChromium !== null &&
                    typeof isChromium !== "undefined" &&
                    vendorName === "Google Inc." &&
                    isOpera === false &&
                    isIEedge === false
                )) {
                    // is Google Chrome or is Google Chrome on IOS
                    $log.info("Using Google Chrome");
                    return true;
                } else {
                    // not Google Chrome
                    $log.info("Using unsupported browser");
                    return false;
                }
            },
            resolve: function (isAuthenticated) {
                if (isAuthenticated || !$config.enable.browserSupportNotification) {
                    notification.hide();
                } else {
                    if (notification.verifyBrowser())
                        notification.hide();
                    else
                        notification.show();
                }
            }
        };

        return notification;
    });
});
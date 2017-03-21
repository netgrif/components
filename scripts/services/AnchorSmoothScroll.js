/**
 * Created by tomin on 20-Mar-17.
 */
define(['angular', 'angularMaterial', '../modules/Main'], function (angular) {
    angular.module('ngMain').factory('$anchorSmoothScroll', function () {

        return {
            scrollTo: function (elementId) {
                let startY = getCurrentYPosition();
                let stopY = getElementYPosition(elementId);
                let distance = stopY > startY ? stopY - startY : startY - stopY;

                if (distance < 100) {
                    scrollTo(0, stopY);
                    return;
                }

                let speed = Math.round(distance / 100);

                if (speed >= 20) speed = 20;

                let step = Math.round(distance / 25);
                let leapY = stopY > startY ? startY + step : startY - step;
                let timer = 0;

                if (stopY > startY) {
                    for (let i = startY; i < stopY; i += step) {
                        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                        leapY += step;
                        if (leapY > stopY)
                            leapY = stopY;
                        timer++;
                    }
                    return;
                }
                for (let i = startY; i > stopY; i -= step) {
                    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                    leapY -= step;
                    if (leapY < stopY)
                        leapY = stopY;
                    timer++;
                }

                function getCurrentYPosition() {
                    if (self.pageYOffset)
                        return self.pageYOffset;
                    if (document.documentElement && document.documentElement.scrollTop)
                        return document.documentElement.scrollTop;

                    return 0;
                }

                function getElementYPosition(elementId) {
                    let element = document.getElementById(elementId);
                    let topOffset = element.offsetTop;
                    let node = element;

                    while(node.offsetParent && node.offsetParent != document.body) {
                        node = node.offsetParent;
                        topOffset += node.offsetTop;
                    }

                    return topOffset;
                }
            }
        }

    });
});

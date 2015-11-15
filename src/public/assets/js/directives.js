(function () {
    'use strict';

    angular
        .module('GrabKartApp')
        .directive('myEnter', myEnter)
        .directive('confirmClick', confirmClick);
})();

function myEnter() {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
};

function confirmClick() {

    function link($scope, element, attrs) {
        element.bind('click', function (e) {
            if (!confirm(attrs.confirmClick)) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        });
    }

    return {
        priority: -1,
        restrict: 'A',
        link: link
    }
}
;

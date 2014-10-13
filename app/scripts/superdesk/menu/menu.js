(function() {
    'use strict';

    angular.module('superdesk.menu', ['superdesk.menu.notifications', 'superdesk.static'])

        // set flags for other directives
        .directive('sdSuperdeskView', ['template', function(template) {
            return {
                templateUrl: template('scripts/superdesk/menu/views/superdesk-view.html'),
                controller: function() {
                    this.flags = {
                        menu: false,
                        notifications: false
                    };
                },
                link: function(scope, elem, attrs, ctrl) {
                    scope.flags = ctrl.flags;
                }
            };
        }])

        .directive('sdMenuWrapper', ['$route', 'superdesk', 'betaService', 'userNotifications', 'template',
        function($route, superdesk, betaService, userNotifications, template) {
            return {
                require: '^sdSuperdeskView',
                templateUrl: template('scripts/superdesk/menu/views/menu.html'),
                link: function(scope, elem, attrs, ctrl) {

                    scope.currentRoute = null;
                    scope.flags = ctrl.flags;
                    scope.menu = _.values(_.where(superdesk.activities, {category: superdesk.MENU_MAIN}));

                    scope.toggleMenu = function() {
                        ctrl.flags.menu = !ctrl.flags.menu;
                    };

                    scope.toggleNotifications = function() {
                        ctrl.flags.notifications = !ctrl.flags.notifications;
                    };

                    scope.toggleBeta = function() {
                        betaService.toggleBeta();
                    };

                    function setActiveMenuItem(route) {
                        _.each(scope.menu, function(activity) {
                            activity.isActive = route && route.href &&
                                route.href.substr(0, activity.href.length) === activity.href;
                        });
                    }

                    scope.$on('$locationChangeStart', function() {
                        ctrl.flags.menu = false;
                    });

                    scope.$watch(function() {
                        return $route.current;
                    }, function(route) {
                        scope.currentRoute = route || null;
                        setActiveMenuItem(scope.currentRoute);
                    });

                    scope.notifications = userNotifications;
                }
            };
        }]);
})();

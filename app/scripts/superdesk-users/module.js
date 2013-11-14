define([
    'angular',
    './controllers/list',
    './controllers/detail',
    './controllers/profile',
    './directives/sdUserPicture',
    './directives/sdUserActivity',
    './directives/sdInfoItem',
    './directives/sdUserEdit',
    './services/profile',
], function(angular) {
    'use strict';

    angular.module('superdesk.users', ['superdesk.entity', 'superdesk.userSettings', 'superdesk.server'])
        .service('profileService', require('superdesk-users/services/profile'))
        .controller('UserDetailCtrl', require('superdesk-users/controllers/detail'))
        .directive('sdUserPicture', require('superdesk-users/directives/sdUserPicture'))
        .directive('sdUserActivity', require('superdesk-users/directives/sdUserActivity'))
        .directive('sdInfoItem', require('superdesk-users/directives/sdInfoItem'))
        .directive('sdUserEdit', require('superdesk-users/directives/sdUserEdit'))
        .value('defaultListParams', {
            search: '',
            searchField: 'username',
            sort: ['display_name', 'asc'],
            page: 1,
            perPage: 25
        })
        .value('defaultListSettings', {
            fields: {
                avatar: true,
                display_name: true,
                username: false,
                email: false,
                created: true
            }
        })
        .config(function($routeProvider) {
            $routeProvider
                .when('/users/:id?', {
                    controller: require('superdesk-users/controllers/list'),
                    templateUrl: 'scripts/superdesk-users/views/list.html',
                    resolve: {
                        users: ['locationParams', 'em', 'defaultListParams',
                            function(locationParams, em, defaultListParams) {
                                var criteria = locationParams.reset(defaultListParams);
                                return em.getRepository('users').matching(criteria);
                            }],
                        user: ['server', '$route',
                            function(server, $route) {
                                if ($route.current.params.id === 'new') {
                                    return {};
                                } else if (_.isString($route.current.params.id)) {
                                    return server.readById('users', $route.current.params.id);
                                } else {
                                    return undefined;
                                }
                            }],
                        userSettings: ['userSettings', 'defaultListSettings',
                            function(userSettings, defaultListSettings) {
                                return userSettings('users:list', defaultListSettings);
                            }],
                        locationParams: ['locationParams', 'defaultListParams', '$route',
                            function(locationParams, defaultListParams, $route) {
                                defaultListParams.id = $route.current.params.id;
                                locationParams.reset(defaultListParams);
                                return locationParams;
                            }]
                    },
                    label: gettext('Users')
                })
                // temporary fake route, just to have menu fixed
                .when('/users', {
                    menu: {
                        label: gettext('Users'),
                        priority: -1
                    }
                })
                .when('/profile', {
                    controller: require('superdesk-users/controllers/profile'),
                    templateUrl: 'scripts/superdesk-users/views/profile.html',
                    resolve: {
                        user: function($rootScope, em) {
                            return em.getRepository('users').find($rootScope.currentUser._id);
                        }
                    },
                    label: gettext('My Profile')
                });
        });
});
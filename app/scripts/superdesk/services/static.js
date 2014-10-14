define([
    'angular'
], function(angular) {
    'use strict';

    /**
     * Static module
     *
     * This module provides povides urls for static assets.
     */
    return angular.module('superdesk.static', [])
        .factory('template', [ 'config', function (config) {
            return function(path) {
                if (config.paths && config.paths.superdesk) {
                    return config.paths.superdesk + path;
                }
                return path;
            };
        }]);
});

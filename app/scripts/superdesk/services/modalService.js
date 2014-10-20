define(['angular'], function(angular) {
    'use strict';

    return angular.module('superdesk.services.modal', ['superdesk.static'])
        .service('modal', ['$q', '$modal', 'template', function($q, $modal, template) {
            this.confirm = function(bodyText, headerText, okText, cancelText) {
                headerText = headerText || gettext('Confirm');
                okText = okText || gettext('OK');
                cancelText = cancelText || gettext('Cancel');

                var delay = $q.defer();

                $modal.open({
                    templateUrl: template('scripts/superdesk/views/confirmation-modal.html'),
                    controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                        $scope.headerText = headerText;
                        $scope.bodyText = bodyText;
                        $scope.okText = okText;
                        $scope.cancelText = cancelText;

                        $scope.ok = function() {
                            delay.resolve(true);
                            $modalInstance.close();
                        };

                        $scope.cancel = function() {
                            delay.reject();
                            $modalInstance.dismiss();
                        };
                    }]
                });

                return delay.promise;
            };

        }]);
});

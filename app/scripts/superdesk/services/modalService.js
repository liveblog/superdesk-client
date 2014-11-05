define(['angular'], function(angular) {
    'use strict';

    return angular.module('superdesk.services.modal', ['ui.bootstrap', 'superdesk.asset'])
        .service('modal', ['$q', '$modal', '$sce', 'asset', function($q, $modal, $sce, asset) {
            this.confirm = function(bodyText, headerText, okText, cancelText) {
                headerText = headerText || gettext('Confirm');
                okText = okText || gettext('OK');
                cancelText = cancelText != null ? cancelText : gettext('Cancel');

                var delay = $q.defer();

                $modal.open({
                    templateUrl: asset.templateUrl('superdesk/views/confirmation-modal.html'),
                    controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                        $scope.headerText = $sce.trustAsHtml(headerText);
                        $scope.bodyText = $sce.trustAsHtml(bodyText);
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

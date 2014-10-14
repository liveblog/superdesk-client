define([
    './entity',
    './server',
    './static'
], function(entityService, serverService, staticService) {
    'use strict';

    describe('Template', function() {
        beforeEach(function() {
            module(entityService.name);
            module(serverService.name);
            module(staticService.name);
        });

        beforeEach(module(function($provide) {
            $provide.value('config', {paths: {superdesk: 'scripts/bower_components/superdesk/app/'}});
        }));

        var template;

        beforeEach(inject(function($injector) {
            template = $injector.get('template');
        }));

        it('can get template url', function() {

            var templateUrl = template('scripts/superdesk-users/views/user-list-item.html');
            expect(templateUrl).toBe('scripts/bower_components/superdesk/app/scripts/superdesk-users/views/user-list-item.html');
        });
    });
});

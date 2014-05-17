/* global require */
require(
    [
        'jquery',
        'underscore',
        'backbone',
        'worker/auth',
        'worker/facebook',
        'rivets',
        'rivets-backbone-adapter',
        'rivets-error-binder',
        'bootstrap',
        'jquery.cookie',
        'setup',
    ],
    function($, _, Backbone, auth, facebook) {
        /* global console */
        'use strict';

        var Router = Backbone.Router.extend({
            routes: {
                ':route':   'go',
                '': 'go'
            },
            
            go: function(route) {
                if (!route) {
                    route = 'home';
                }
                console.log('ROUTE', route);
                var destination = 'view/' + route + '/index';
                require(['view/navbar/index', 'view/footer/index', destination], function(Header, Footer, Page) {
                    new Header({el: $('#nav')});
                    new Page({el: $('#home')});
                    new Footer({el: $('#footer')});
                });
            }
        });

        new Router();
        Backbone.history.start();

        auth.startVisit();
    });

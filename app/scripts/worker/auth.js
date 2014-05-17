/**
 * Main BFP App Logic
 */

define([
    'api',
    'backbone',
    'jquery',
    'jquery.cookie'
],
function (api, Backbone, $) {
    'use strict';
    var Auth = Backbone.Model.extend({
        defaults: {
            COOKIENAME: '_SESSIONTOKEN',
            userLoginId: '',
            loggedIn: false
        },
        initialize: function() {
            var self = this;
            var cookieValue = $.cookie(self.get('COOKIENAME'));
            if (cookieValue) {
                this.set('sessionId', cookieValue);
            }
            // Bind the sessionId to a cookie
            this.on('change:sessionId', function() {
                $.cookie(self.get('COOKIENAME'), self.get('sessionId'), { path: '/' });
            });

            api.auth = this;
        },
        login: function (data) {
            var self = this;
            return this.call('login', {
                authSessionId: self.get('sessionId'),
                USERNAME: data.USERNAME,
                PASSWORD: data.PASSWORD
            }).done(function(response) {
                self.set('userLoginId', data.USERNAME);
                self.set('userName', data.USERNAME);
                self.set('loggedIn', true);
            }).fail(function() {
                /* global alert */
                alert('Login failed');
            });
        },
        logout: function() {
            var self = this;
            // Terminate the server session and clear the local cookie
            this.call('endVisit', {
                sessionId: self.get('sessionId')
            }).done(function(response) {
                self.remove('sessionId');
                self.set('loggedIn', true);
            });
        },
        startVisit: function() {
            var self = this;
            return api.call('startVisit', {
            }).done(function(response) {
                self.set('sessionId', response.token);
            });
        },
        call: function(service, data) {
            return api.call(service, data, this.get('sessionId'));
        }
    });

    return new Auth();
});

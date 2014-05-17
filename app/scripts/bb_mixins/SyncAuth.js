define([
    'underscore',
    'backbone',
    'worker/auth'
],
function(_, Backbone, auth) {
    'use strict';
    var originalSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
        var result;

        if(auth && auth.get('loggedIn')) {
            model.set('sessionId', auth.get('sessionId'), {silent: true});
            try {
                result = originalSync.apply(this, arguments);
            } finally {
                model.unset('sessionId', {silent: true});
            }
        } else {
            result = originalSync.apply(this, arguments);
        }

        return result;
    };
});

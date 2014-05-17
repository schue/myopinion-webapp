/* global define */
define(
    [
        'jquery',
        'worker/auth',
        'underscore',
        'backbone',
        'backbone-seen',
        'backbone-validation'
    ],
    function(
        $,
        auth,
        _,
        Backbone,
        BackboneSeen
    ) {
        'use strict';
        $.ajaxPrefilter(function( options, originalOptions, xhr ) {
            if (auth.get('sessionId') !== null) {
                options.url = options.url + (options.url.indexOf('?') === -1 ? '?':'&') +
                    'sessionId=' + auth.get('sessionId');
            }
        });
        _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
        BackboneSeen.mixin(Backbone.Model);
        Backbone.emulateHTTP = true;
        Backbone.emulateJSON = true;
        return {};
    }
);

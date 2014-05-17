define(['app', 'backbone', 'underscore', 'rivets', 'i18n!nls/signup', 'text!./template.html'],
function(app, Backbone, _, rivets, nls, template) {
        'use strict';
        var view = Backbone.View.extend({
            initialize: function() {
                this.$el.html(template);
                var scope = {
                    nls: nls,
                    doit: function() {
                        app.modal('newaccount');
                    }
                };
                this.binding = rivets.bind(this.$el, scope);
            },
            render: function() {
                this.binding.sync();
            }
        });

        return view;
    });

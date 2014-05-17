define(['app', 'worker/auth', 'backbone', 'underscore', 'rivets', 'text!./template.html'],
    function(app, auth, Backbone, _, rivets, template) {
        'use strict';

        var view = Backbone.View.extend({
            initialize: function() {
                var scope = new Backbone.Model({
                });

                this.$el.html(template);
                this.binding = rivets.bind(this.$el, scope);
            },
            render: function() {
                this.binding.sync();
            }
        });

        return view;
    });

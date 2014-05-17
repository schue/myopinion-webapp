define(['app', 'worker/auth', 'backbone', 'underscore', 'rivets', 'text!./template.html'],
    function(app, auth, Backbone, _, rivets, template) {
        'use strict';

        var view = Backbone.View.extend({
            initialize: function() {
                var scope = new Backbone.Model({
                    auth: auth,
                    username: '',
                    password: '',
                    showLogin: function(e) {
                        app.modal('login');
                        return false;
                    },
                    showSignUp: function(e) {
                        app.modal('newaccount');
                        return false;
                    },
                    login: function(e) {
                        auth.login({
                            USERNAME: scope.get('username'),
                            PASSWORD: scope.get('password')
                        });
                        return false;
                    },
                });

                scope.logout = function() {
                    window.location="/";
                }

                this.$el.html(template);
                this.binding = rivets.bind(this.$el, scope);
            },
            render: function() {
                this.binding.sync();
            }
        });

        return view;
    });

define([
    'worker/auth',
    'facebook',
    'api'
],
function(auth, FB, api) {
    /* global console */
    'use strict';

    var perms = 'email,offline_access,publish_stream';
    var worker = {
        login : function(callback) {
            console.log('FACEBOOK: logging in');

            FB.login(function(response) {
                console.log('FACEBOOK: response',response);

                if (response.authResponse) {
                    worker.sync(response.authResponse, callback);
                } else {
                    console.log('Login failed');
                }
            }, {scope: perms});
        },
        getLoginStatus : function(callbacks) {
            console.log('FACEBOOK: check login');
            FB.getLoginStatus(function(response) {
                console.log('FACEBOOK: responded');
                if (response.status === 'connected') {
                    if (callbacks.loggedIn) {
                        callbacks.loggedIn();
                    }
                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                    if (callbacks.loginRefused) {
                        callbacks.loginRefused();
                    }
                } else {
                    // the user isn't logged in to Facebook.
                    if (callbacks.notLoggedIn) {
                        callbacks.notLoggedIn();
                    }
                }
            });
        },
        sync : function(authResponse, callback) {
            api.call('fbSync', {
                authSessionId: auth.get('sessionId'),
                fbToken: authResponse.accessToken
            }).done(function(res) {
                console.log('CALLBACK', callback);
                auth.set('loggedIn', true);
                auth.set('userName', res.firstName + ' ' + res.lastName);
                console.log(authResponse, res);
                if (callback) {
                    callback();
                }
            });
        }
    };

    worker.FB = FB;

    FB.init({
        appId      : '',
    });

    // If we are already connected to this Facebook account
    // we should upgrade the visit
/*
    var fbinit = function() {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                api.call('fbSync', {
                    authSessionId: auth.get('sessionId'),
                    fbToken: response.authResponse.accessToken
                }).done(function(user) {
                    console.log('Sync completed');
                    auth.set('loggedIn', true);
                    auth.set('USERNAME', user.email);
                });
            } else {
                console.log('Not connected to Facebook');
            }
        });
    };

    if (auth.get('sessionId')) {
        fbinit();
    } else {
        auth.once('change:sessionId', fbinit);
    }
*/

    return worker;
});

/* global require:true */
var require;
require = (function() {
    'use strict';
    var useMock = false;

    var require = {
        baseUrl: 'scripts',
        config: {
            'rivets-error-binder': {
                render: function (el, cmd, errorList) {
                    switch (cmd) {
                        case 'focus':
                            break;
                        case 'blur':
                            break;
                        case 'validated':
                            if (errorList) {
                                $(el).tooltip({title: errorList, trigger: 'focus'});
                                $(el).tooltip('show');
                                $(el).parent().addClass('has-error');
                            } else {
                                $(el).tooltip('destroy');
                                $(el).parent().removeClass('has-error');
                            }
                            break;
                    }
                }
            }
        },
        shim: {
            waypoints: {
                deps: [
                    'jquery-waypoints'
                ]
            },
            imagesloaded: {
                exports: 'imagesLoaded'
            },
            'rivets-error-binder': {
                deps: [
                    'bootstrap'
                ]
            },
            facebook: {
                exports: 'FB'
            },
            infinity: {
                deps: [
                    'jquery'
                ]
            },
            bootstrap: {
                deps: [
                    'jquery'
                ]
            },
            'jquery.cookie': {
                deps: [
                    'jquery'
                ]
            },
            masonry: {
                deps: [
                    'outlayer',
                    'get-size'
                ]
            },
            effeckt: {
                exports: 'Effeckt'
            }
        },
        paths: {
            main: 'main',
            effeckt: '../bower_components/Effeckt.css/js/Effeckt',
            facebook: 'https://connect.facebook.net/en_US/all',
            ofbiz: '../bower_components/ofbiz-backbone-models/src/scripts/ofbiz',
            jquery: '../../bower_components/jquery/jquery',
            bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
            backbone: '../../bower_components/backbone/backbone',
            'rivets-backbone-adapter': '../../bower_components/rivets-backbone-adapter/rivets-backbone',
            rivets: '../../bower_components/rivets/dist/rivets',
            underscore: '../../bower_components/underscore/underscore',
            text: '../../bower_components/text/text',
            infinity: '../../bower_components/infinity/infinity',
            'backbone-validation': '../../bower_components/backbone-validation/dist/backbone-validation-amd',
            i18n: '../../bower_components/i18n/i18n',
            'rivets-error-binder': '../../bower_components/rivets-error-binder/src/scripts/rivets-error-binder',
            'jquery.cookie': '../../bower_components/jquery.cookie/jquery.cookie',
            'backbone-nested-models': '../../bower_components/backbone-nested-models/src/scripts/backbone-nested-models',
            'masonry-shim': '../../bower_components/masonry-shim/masonry.pkgd.min',
            'backbone-seen': '../../bower_components/backbone-seen/src/scripts/backbone-seen',
            item: '../../bower_components/outlayer/item',
            outlayer: '../../bower_components/outlayer/outlayer',
            masonry: '../../bower_components/masonry/masonry',
            'get-size': '../../bower_components/get-size/get-size',
            'jquery-waypoints': '../../bower_components/jquery-waypoints/waypoints',
            'backbone-pageable': '../../bower_components/backbone-pageable/lib/backbone-pageable',
            imagesloaded: '../../bower_components/imagesloaded/imagesloaded'
        }
    };

    if (useMock) {
    }
    return require;
})();

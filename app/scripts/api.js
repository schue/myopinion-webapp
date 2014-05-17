/**
 * Main BFP App Logic
 */

define(
		[ 'jquery' ],
		function($) {
            'use strict';
			var api = {
				protocol : '',
				host : '',
				urls : {
                    PlaceOrder: '/api/placeorder'
				},
				getUrl : function(url) {
					var newUrl = api.protocol + api.host + (this.urls[url] ? this.urls[url] : '/api/' + url);
					return newUrl;
				},
				call : function(fName, data) {
					var result = $.Deferred();
                    $.ajax(api.getUrl(fName),
                        {
                            dataType : 'json',
                            type : 'POST',
                            data : {
                                _method : 'CALL',
                                model : JSON.stringify(data),
                            }
                        }).success(function(data, status, xhr) {
                            if (data.errorMessage) {
                                result.reject(data.errorMessage);
                            } else {
                                result.resolve(data);
                            }
                        }).error(function() {
                            result.reject(arguments);
                        });
					return result.promise();
				},
			};

			return api;
		});

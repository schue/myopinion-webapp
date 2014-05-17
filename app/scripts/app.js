/* global require:true */
define(['view/modal/index'], function(Modal) {
    'use strict';
    return {
        go: function(path) {
            this.modalWindow.closeModal();
            window.location = '#' + path;
        },
        modal: function(path) {
            if (this.modalWindow === undefined) {
                this.modalWindow = new Modal();
            }
            var modalWindow = this.modalWindow;
            require(['view/' + path + '/index'], function(View) {
                var view = new View({el: modalWindow.$el.find('.effeckt-modal-content').get(0)});
                modalWindow.show();
                view.trigger('modalShow');
            });
        },
        currentItem: null,
        getConfig: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
    };
});

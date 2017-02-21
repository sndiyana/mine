angular.module('starter.service')

.service('contactList', function () {
            return {
                form: {},
                getForm: function () {
                    return this.form;
                },
                updateForm: function (form) {
                    this.form = form;
                }
            }
        })


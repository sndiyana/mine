angular.module('starter.service')

.service('businessData', function () {
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


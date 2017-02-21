angular.module('starter.service')

.service('compData', function () {
            return {
                data: {},
                getData: function () {
                    return this.data;
                },
                updateData: function (data) {
                    this.data = data;
                }
            }
        })


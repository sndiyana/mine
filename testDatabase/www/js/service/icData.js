angular.module('starter.service')

.service('icData', function () {
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


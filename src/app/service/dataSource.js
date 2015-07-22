/**
 * Created by rkishorekumar on 6/9/2015.
 */
'use strict';

angular.module('dataSourceModule', []).factory('dataSource', function($timeout) {
    var service = {};

    function typeAhead(params) {
        var html = '<div class="typetext" ng-show="!editing" ng-click="startEditing()">{{data.' + params.colDef.field + '}}</div> ' +
            '<input ng-blur="loadToStore(data.' + params.colDef.field + '); editing=false" ng-show="editing" ng-model="data.' + params.colDef.field + '" typeahead="affliation for affliation in affliations($viewValue)" class="form-control grid-txtbox">' +
            '<i ng-show="loadingLocations" class="glyphicon glyphicon-refresh"></i>';
        var domElement = document.createElement("span");
        domElement.innerHTML = html;
        params.$scope.startEditing = function() {
            params.$scope.editing = true;

            $timeout(function() {
                var txtbox = domElement.querySelector('input');
                txtbox.focus();
            }, 0);
        };

        return domElement;
    }

    function setDirtyFlag(params)
    {
      params.data.isDirty = true;
    }

    var _dataGridCols = [{
        headerName: 'First name',
        field: 'firstName',
        editable: true,
        floatCell: false,
        width: 150,
        icons: {
            sortAscending: '<i class="glyphicon glyphicon-sort-by-alphabet"/>',
            sortDescending: '<i class="glyphicon glyphicon-sort-by-alphabet-alt"/>'
        },
        cellValueChanged: setDirtyFlag
    }, {
        headerName: 'Last name',
        field: 'lastName',
        editable: true,
        filter: 'set',
        width: 150,
        icons: {
            sortAscending: '<i class="glyphicon glyphicon-sort-by-alphabet"/>',
            sortDescending: '<i class="glyphicon glyphicon-sort-by-alphabet-alt"/>'
        }
    }, {
        headerName: 'Country',
        field: 'country',
        filter: 'set',
        editable: true,
        floatCell: true,
        width: 100,
        icons: {
            sortAscending: '<i class="glyphicon glyphicon-sort-by-alphabet"/>',
            sortDescending: '<i class="glyphicon glyphicon-sort-by-alphabet-alt"/>'
        }
    }, {
        headerName: 'Affliation',
        field: 'affiliation',
        editable: false,
        filter: 'set',
        icons: {
            sortAscending: '<i class="glyphicon glyphicon-sort-by-alphabet"/>',
            sortDescending: '<i class="glyphicon glyphicon-sort-by-alphabet-alt"/>'
        },
        width: 250,
        cellValueChanged: setDirtyFlag,
        cellRenderer: typeAhead

    }, {
        headerName: 'Department',
        field: 'department',
        filter: 'set',
        editable: true,
        floatCell: true,
        width: 250,
        icons: {
            sortAscending: '<i class="glyphicon glyphicon-sort-by-alphabet"/>',
            sortDescending: '<i class="glyphicon glyphicon-sort-by-alphabet-alt"/>'
        }
    }, {
        headerName: 'Specialties',
        field: 'specialties',
        editable: true,
        width: 238,
        icons: {
            sortAscending: '<i class="glyphicon glyphicon-sort-by-alphabet"/>',
            sortDescending: '<i class="glyphicon glyphicon-sort-by-alphabet-alt"/>'
        }
    }];

    service.getTemplateColumn = function() {
        return _dataGridCols;
    };

    return service;
});

/**
 * Created by rkishorekumar on 6/8/2015.
 */
'use strict';

angular.module('gridConfigModule', []).factory('gridConfig', ['$q', function($q) {
    var service = {};

    var _angularGridConfig = {
        columnDefs: [],
        rowData: null,
        rowsAlreadyGrouped: false, // set this to true, if you are passing in data alrady in nodes and groups
        groupHeaders: false,
        groupKeys: undefined, //set as string of keys eg ["region","country"],
        groupIncludeFooter: false,
        pinnedColumnCount: 0, //and integer, zero or more, default is 0
        rowHeight: 25, // defaults to 25, can be any integer
        enableColResize: true, //one of [true, false]
        enableSorting: true, //one of [true, false]
        enableFilter: true, //one of [true, false]
        rowSelection: 'multiple', // one of ['single','multiple'], leave blank for no selection
        rowDeselection: true,
        groupSelectsChildren: true, // one of [true, false]
        suppressRowClickSelection: true, // if true, clicking rows doesn't select (useful for checkbox selection)
        angularCompileRows: false,
        angularCompileFilters: true,
        angularCompileHeaders: true,

        icons: {
            filter: '<i class="fa fa-filter"/>',
            sortAscending: '<i class="glyphicon glyphicon-sort-by-alphabet"/>',
            sortDescending: '<i class="glyphicon glyphicon-sort-by-alphabet-alt"/>',
            groupExpanded: '<i class="glyphicon glyphicon-chevron-down"/>',
            groupContracted: '<i class="glyphicon glyphicon-chevron-right"/>',
            columnGroupOpened: '<i class="glyphicon glyphicon-chevron-down"/>',
            columnGroupClosed: '<i class="glyphicon glyphicon-chevron-right"/>'
        },

        // callback when row clicked
        rowClicked: function(params) {
            // console.log("Callback rowClicked: " + params.data + " - " + params.event);
        },
        // callback when cell clicked
        cellClicked: function(params) {
            // console.log("Callback cellClicked: " + params.value + " - " + params.colDef.field + ' - ' + params.event);
        },
        // callback when cell double clicked
        cellDoubleClicked: function(params) {
            // console.log("Callback cellDoubleClicked: " + params.value + " - " + params.colDef.field + ' - ' + params.event);
        },

        cellValueChanged: function(params){
          // console.log("Callback cellDoubleClicked: " + params.value + " - " + params.colDef.field + ' - ' + params.event);
        },

        ready: function(api) {
            // console.log('Callback ready: api = ' + api);
        }
    };

    service.getGridConfig = function() {
        return _angularGridConfig;
    };

    return service;
}]);

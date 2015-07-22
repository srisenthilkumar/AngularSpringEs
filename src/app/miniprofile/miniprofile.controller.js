'use strict';

angular.module('client')
    .controller('MiniProfileCtrl', function($scope, gridConfig, dataSource, $http, ProfileService,LookUpService,limitToFilter,localStorageService) {


        localStorageService.remove('affliations');
        $scope.isGridEmpty = true;
        $scope.searchProject = undefined;
        $scope.angularGrid = gridConfig.getGridConfig();

        $scope.colCount = 6;
        $scope.rowCount = 50;

        $scope.size = 'fill'; // model for size select
        $scope.width = '100%'; // the div gets it's width and height from here
        $scope.height = '300px';

        $scope.style = 'ag-fresh';
        $scope.groupBy = '';
        $scope.groupType = 'col';
        $scope.groupHeaders = 'false';
        // $scope.rowSelection = 'checkbox';

        $scope.angularGrid = {
            columnDefs: dataSource.getTemplateColumn(),
            rowData: null,
            pinnedColumnCount: 1,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            angularCompileRows: true
        };

        var isContains =function(value){
          $.each($scope.angularGrid.rowData, function(index,record){
            if(record.affiliation === value)
            {
              return true;
            }
          });
          return false;
        };

        $scope.projects = function(val) {
          return LookUpService.getProjects(val).then(function(response){
            var output = [{name: 'No result'}];
            if(response.data.result.length > 0){
              output = [];
              $.each(response.data.result,function(index, project){
                output.push(project);
              });
            }
            return output;
          });
        };

        $scope.affliations = function(val) {
          return LookUpService.getAffliations(val).then(function(response){
            var output = ['No result'];
            if(response.data.result.length > 0){
              output = [];
              $.each(response.data.result,function(index, affliation){
                output.push(affliation.name);
              });
            }
            if(localStorageService.get('affliations'))
            {

              if(output[0] === 'No result'){output = []};
              output.splice.apply(output, [2, 0].concat(localStorageService.get('affliations')));
              //output.push();
            }
            return output;
          });
        };

        $scope.loadToStore = function (value)
        {
            console.log(value);
            var affliationsInStore = localStorageService.get('affliations');
            if(!affliationsInStore)
            {
              affliationsInStore = [];
            }
            if(affliationsInStore.indexOf(value) === -1 && isContains(value))
            {


              affliationsInStore.push(value);
              localStorageService.set('affliations', affliationsInStore);
            }
            $scope.editing = false;
        };

        $scope.loadProfile = function() {
            ProfileService.getProfiles($scope.searchProject.id)
                .success(function(data, status, headers, config) {
                    $scope.isGridEmpty = false;
                    $scope.angularGrid.rowData = data.result;
                    console.log(data.result);
                    $scope.addNewRow();
                    $scope.angularGrid.api.onNewRows();
                })
                .error(function(data, status, headers, config) {
                    $scope.isGridEmpty = true;
                });
        };


        $scope.save = function() {
          var modifiedRecord = [];
          $.each($scope.angularGrid.rowData, function(index,record){
            if(record.isDirty)
            {
              if(record.id === "-1")
              {
                record.id = null;
              }
              modifiedRecord.push(record);
            }
          });
            //var updatedData = $scope.angularGrid.rowData[0];
            ProfileService.saveProfile(modifiedRecord);
        };

        $scope.addNewRow = function(){
          var newRow = {affiliation: '',country: '',department: '',firstName: '',id: '-1',lastName: '',projectId: '1',projectName: 'Novatran Pain Reducer',specialties: ''};
          $scope.angularGrid.rowData.push(newRow);
          $scope.angularGrid.api.onNewRows();
        };



    });

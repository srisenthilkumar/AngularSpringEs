angular.module('angular-json-rpc', []).config([ "$provide", function($provide) {

    return $provide.decorator('$http', ['$delegate', function($delegate){
            $delegate.jsonrpc = function(url, method, parameters, config){
                var data = {"jsonrpc": "2.0", "method": method, "params": parameters, "id" : 1};
                return $delegate.post(url, data, angular.extend({'headers':{'Content-Type': 'application/json'}}, config) );
            };
            return $delegate;
        }]);
}]);

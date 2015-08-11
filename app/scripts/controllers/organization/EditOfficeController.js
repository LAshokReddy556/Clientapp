(function(module) {
  mifosX.controllers = _.extend(module, {
    EditOfficeController: function(scope, routeParams, resourceFactory, location,dateFilter,$rootScope) {
        scope.formData = {};
        scope.first = {};
        resourceFactory.officeResource.get({officeId: routeParams.id, template: 'true'} , function(data) {
        	scope.minDate = new Date(data.date);
            if(data.openingDate){
            var editDate = dateFilter(data.openingDate,'dd MMMM yyyy');
            scope.officeTypes = data.officeTypes;
            scope.first.date = new Date(editDate); }
            
            for(var i in data.officeTypes){
            	if(data.officeTypes[i].name == data.officeType){
            		scope.formData.officeType = data.officeTypes[i].id;
            	}
            }
            scope.formData = {
              name : data.name,
              externalId : data.externalId,
              officeType : scope.formData.officeType
              
          };
           
        });
        
        scope.submit = function() {
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            this.formData.locale = $rootScope.locale.code;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.openingDate = reqDate;
            resourceFactory.officeResource.update({'officeId': routeParams.id},this.formData,function(data){
             location.path('/viewoffice/' + data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('EditOfficeController', ['$scope', '$routeParams', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.EditOfficeController]).run(function($log) {
    $log.info("EditOfficeController initialized");
  });
}(mifosX.controllers || {}));

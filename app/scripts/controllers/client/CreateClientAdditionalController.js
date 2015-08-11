(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateClientAdditionalController: function(scope,routeParams, resourceFactory, location, http, dateFilter,API_VERSION,$rootScope,PermissionService,$upload,filter,webStorage) {

    	scope.formData = {};
        scope.clientCategoryDatas=[];
        scope.groupNameDatas=[];
        scope.nationalityDatas = [];
        scope.genderDatas = [];
        scope.clientId = routeParams.id;
        scope.customeridentificationDatas = [];
        scope.cummunitcationDatas = [];
        scope.languagesDatas = [];
        scope.ageGroupDatas = [];
        scope.date = {};

        
        scope.clientAddInfo = webStorage.get("client-additional-data");
		  
        resourceFactory.clientAdditionalTemplateResource.get(function(data) {
        	scope.date.todayDate = data.date;
            scope.nationalityDatas= data.nationalityDatas;
            scope.genderDatas= data.genderDatas;
            scope.ageGroupDatas = data.ageGroupDatas;
            scope.customeridentificationDatas= data.customeridentificationDatas;
            scope.cummunitcationDatas= data.cummunitcationDatas;
            scope.languagesDatas= data.languagesDatas;
            
        });

        scope.submit = function() {
        	 scope.flag = true;
            var reqDate = dateFilter(new Date(scope.date.todayDate),'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.activationDate = reqDate;
            this.formData.locale = 'en';
            if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
            resourceFactory.clientAdditionalResource.save({'clientId': routeParams.id},this.formData,function(data){
            		  location.path('/viewclient/' + data.resourceId);
            },function(errData){
          	  scope.flag = false;
            });
          };
    }
  });
  mifosX.ng.application.controller('CreateClientAdditionalController', [
                                                              '$scope',
                                                              '$routeParams',
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              '$http', 
                                                              'dateFilter',
                                                              'API_VERSION',
                                                              '$rootScope',
                                                              'PermissionService',
                                                              '$upload',
                                                              '$filter',
                                                              'webStorage',
                                                              mifosX.controllers.CreateClientAdditionalController]).run(function($log) {
    $log.info("CreateClientAdditionalController initialized");
  });
}(mifosX.controllers || {}));

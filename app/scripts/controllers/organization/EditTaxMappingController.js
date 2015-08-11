(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditTaxMappingController: function(scope, routeParams, resourceFactory, location,dateFilter,$rootScope) {
		  scope.chargecodetaxs = [];
		  scope.typetaxmapdatas = [];
		  scope.priceRegionDatas = [];
		  scope.date = {};
        
         resourceFactory.getTaxmappingResource.get({taxId: routeParams.id, template: 'true'} , function(data) {
        	 scope.minDate = new Date(data.date);
        	 scope.chargecodetaxs = data.chargeCodesForTax;
             scope.taxTypeDatas = data.taxTypeData;
             scope.priceRegionDatas = data.priceRegionData;
             scope.taxMapId = data.id;
             scope.formData = data;
            
             var actDate = dateFilter(data.startDate,'dd MMMM yyyy');
             scope.date.startDate = new Date(actDate);  
         });
        
         scope.submit = function() {
        	
        	 this.formData.locale = $rootScope.locale.code;
        	 this.formData.dateFormat = 'dd MMMM yyyy';
        	 this.formData.taxRegion = this.formData.taxRegionId;
        	 if(scope.date.startDate){
        		 this.formData.startDate = dateFilter(scope.date.startDate, 'dd MMMM yyyy');
        	 }
        	 delete this.formData.id;
        	 delete this.formData.priceRegionData;
        	 delete this.formData.taxRegionId;
        	 delete this.formData.taxTypeData;
        	 delete this.formData.chargeCodesForTax;
        	 delete this.formData.date;
            
             resourceFactory.getTaxmappingResource.update({'taxId': routeParams.id}, this.formData, function(data){
            	 location.path('/viewtaxmapping/' + data.resourceId);
             });
        };
    }
  });
  mifosX.ng.application.controller('EditTaxMappingController', [
       '$scope',
       '$routeParams',
       'ResourceFactory',
       '$location',
       'dateFilter',
       '$rootScope',
       mifosX.controllers.EditTaxMappingController
       ]).run(function($log) {
    	   $log.info("EditTaxMappingController initialized");
       });
}(mifosX.controllers || {}));
(function(module) {
  mifosX.controllers = _.extend(module, {
ClientCloseController: function(scope,webStorage, resourceFactory, location, translate,dateFilter,routeParams,$rootScope) {
            
			scope.formData={};	
			scope.close = {};
			/*scope.close.date = dateFilter(new Date(),'dd MMMM yyyy');
			scope.minDate= scope.close.date;*/
			scope.closureReasons =[];
			
			scope.clientId=routeParams.id;
			var clientData = webStorage.get('clientData') || "";
				scope.displayName=clientData.displayName;
				scope.hwSerialNumber=clientData.hwSerialNumber;
				scope.statusActive=clientData.statusActive;
				scope.accountNo=clientData.accountNo;
				scope.officeName=clientData.officeName;
				scope.balanceAmount=clientData.balanceAmount;
				scope.currency=clientData.currency;
				scope.imagePresent=clientData.imagePresent;
				scope.categoryType=clientData.categoryType;
				scope.email=clientData.email;
				scope.phone=clientData.phone;
			
			
			// TEMPLATE DATA
			resourceFactory.clientTemplateResource.get({commandParam:'close'} ,function(data) {
				scope.close.date = dateFilter(new Date(data.date),'dd MMMM yyyy');
				scope.minDate= scope.close.date;
				
			    scope.closureReasons = data.closureReasons;
			    
			});
			            
			           
			scope.submit = function() {
				scope.formData.locale = $rootScope.locale.code;
				var reqDate = dateFilter(scope.close.date,'dd MMMM yyyy');
				scope.formData.closureDate = reqDate;
				scope.formData.dateFormat = 'dd MMMM yyyy';
			
	                resourceFactory.clientResource.save({'clientId': routeParams.id,command:'close'},scope.formData,function(data){
	                	location.path('/clients/');
	               });
		    };
    }
  });
  mifosX.ng.application.controller('ClientCloseController', [
                                                             '$scope', 
                                                             'webStorage',
                                                             'ResourceFactory',
                                                             '$location', 
                                                             '$translate',
                                                             'dateFilter', 
                                                             '$routeParams',
                                                             '$rootScope', 
                                                             mifosX.controllers.ClientCloseController]).run(function($log) {
    $log.info("ClientCloseController initialized");
  });
}(mifosX.controllers || {}));
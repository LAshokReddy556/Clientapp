(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditPropertyDefinitionController: function(scope, resourceFactory, location, dateFilter, $rootScope,webStorage,routeParams) {
			  
			 scope.formData = {};
	        resourceFactory.propertyResource.get({propertyId:routeParams.id,template:'true'} ,function(data) {
	        	scope.propertyCodeTypes = data.propertyTypes;
	        	scope.formData = data;
	        });
	     
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "PropertyMaster" });
	           };
	           
	        
	        scope.submit = function() {  
	        	delete scope.formData.propertyTypes;
	        	delete scope.formData.id;
	            resourceFactory.propertyResource.update({propertyId : routeParams.id},scope.formData, function(data){
	            	webStorage.add("callingTab", {someString: "PropertyMaster" });
	            		location.path('/property');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('EditPropertyDefinitionController', [
	      '$scope',
	      'ResourceFactory',
	      '$location',
	      'dateFilter',
	      '$rootScope',
	      'webStorage',
	      '$routeParams',
	      mifosX.controllers.EditPropertyDefinitionController
	      ]).run(function($log) {
	    	  $log.info("EditPropertyDefinitionController initialized");
	  });
	}(mifosX.controllers || {}));
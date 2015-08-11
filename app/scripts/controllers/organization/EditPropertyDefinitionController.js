(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditPropertyDefinitionController: function(scope, resourceFactory, location, dateFilter, $rootScope,webStorage,routeParams) {
			  
			 scope.formData = {};scope.minLength = 2;
	        resourceFactory.propertyResource.get({propertyId:routeParams.id,template:'true'} ,function(data) {
	        	scope.propertyCodeTypes = data.propertyTypes;
	        	scope.formData = data;
	        	scope.changeFeildLength(data.propertyCodeType);
	        	
	        });
	        
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "PropertyMaster" });
	           };
	           
	           scope.changeFeildLength = function(propertType){
		        	if(propertType!=null){
		        		  console.log(propertType);
						  if (propertType.match("Parcel")) {
							scope.minLength = 2;
							scope.maxLength = 2;
						  } else if (propertType.match("Unit Codes")) {
							scope.minLength = 4;
							scope.maxLength = 4;
						  } else if (propertType.match("Building Codes")) {
							scope.minLength = 3;
							scope.maxLength = 3;
						 } else if (propertType.match("Level/Floor")) {
							scope.minLength = 2;
							scope.maxLength = 2;
						}
		        	 }else{
		        	 
		        		 
		        	 }
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
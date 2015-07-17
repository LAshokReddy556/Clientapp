(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePropertyDefinitionController: function(scope, resourceFactory, location, dateFilter, $rootScope,webStorage) {
			  
	        resourceFactory.propertyTemplateResource.query(function(data) {
	        	scope.propertyCodeTypes = data;
	            scope.formData = {};
	        });
	        
	     
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "PropertyMaster" });
	           };
	           /*scope.maxLength=0;   
	           scope.minLength=0;*/
	          
	           scope.changeFeildLength=function(propertType){
	        	if(propertType!=null){
	        		  console.log(propertType);
					  if (propertType.match("Parcel")) {
						scope.minLength = 2;
						scope.myMinLength = 2;
						scope.maxLength = 2;
					  } else if (propertType.match("Unit Codes")) {
						scope.minLength = 4;
						scope.myMinLength = 4;
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
	            resourceFactory.propertyResource.save(scope.formData, function(data){
	            	webStorage.add("callingTab", {someString: "PropertyMaster" });
	            		location.path('/property');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreatePropertyDefinitionController', [
	      '$scope',
	      'ResourceFactory',
	      '$location',
	      'dateFilter',
	      '$rootScope',
	      'webStorage',
	      mifosX.controllers.CreatePropertyDefinitionController
	      ]).run(function($log) {
	    	  $log.info("CreatePropertyDefinitionController initialized");
	  });
	}(mifosX.controllers || {}));
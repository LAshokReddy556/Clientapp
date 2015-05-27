	  EditProfileController = function(scope, RequestSender, routeParams,location, dateFilter,localStorageService,rootScope) {
            
		     scope.clientId 			= routeParams.clientId;
		     scope.isConfigNationalId 	= angular.lowercase(routeParams.isConfigNationalId) == 'true';
			 var clientData= localStorageService.get('clientTotalData');
			 if(clientData){
				 scope.formData = {};
				 RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
					 scope.displayName					= data.displayName;
					 scope.formData.officeId			= data.officeId;
					 scope.formData.phone 				= data.phone;
					 scope.formData.homePhoneNumber		= data.homePhoneNumber;
					 scope.formData.externalId			= data.externalId;
			   });
			 }
			 
			//national Id validation
		      scope.nationalIdvalue = true;
			 scope.nationalIdValidationFun = function(id){
				 if(id){
					 scope.nationalIdvalue = Kennitala.validate(id);
				 }
			 };
					        
			scope.submit = function() {
				var name_array = new Array();
				 name_array = (scope.displayName.split(" "));
		            
		          scope.formData.firstname = name_array[0];
		          scope.formData.lastname = name_array[1];
		            if(scope.formData.lastname == null){
		            	scope.formData.lastname=".";
		            }
				RequestSender.clientResource.update({clientId: scope.clientId},scope.formData, function(data) {
					location.path('/profile');
			   });
			};
    };

selfcareApp.controller('EditProfileController', ['$scope', 
                                                  'RequestSender',
                                                  '$routeParams',
                                                  '$location',
                                                  'dateFilter', 
                                                  'localStorageService', 
                                                  '$rootScope', 
                                                  EditProfileController]);


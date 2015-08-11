	  EditProfileController = function(scope, RequestSender, routeParams,location, dateFilter,localStorageService,rootScope) {
            
		     scope.clientId 			= routeParams.clientId;
			 if(rootScope.selfcare_sessionData){
				 scope.formData = {};
				 scope.clientData={};
				 RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
					 scope.displayName					= data.displayName;
					 scope.formData.officeId			= data.officeId;
					 scope.formData.phone 				= data.phone;
					 scope.formData.homePhoneNumber		= data.homePhoneNumber;
					 scope.formData.externalId			= data.externalId;
					 
				  RequestSender.clientDataResource.get({clientId: scope.clientId} , function(additionalData) {
					var dataObj = angular.fromJson(angular.toJson(additionalData));
	        		 Object.keys(dataObj).length == 0 ? scope.editAdditionalDatasBtn = false : scope.editAdditionalDatasBtn = true;
	        		 
	        		 scope.date = {};
	        		 if(scope.editAdditionalDatasBtn){
					   RequestSender.clientDataResource.get({clientId: scope.clientId,template:'true'} , function(data) {
						 	scope.editInfoBtn 				= true;
						 	scope.maxDate 					= new Date(data.date);
						 	scope.nationalityDatas			= data.nationalityDatas;
				            scope.genderDatas				= data.genderDatas;
				            scope.ageGroupDatas 			= data.ageGroupDatas;
				            scope.customeridentificationDatas= data.customeridentificationDatas;
				            scope.cummunitcationDatas		= data.cummunitcationDatas;
				            scope.languagesDatas			= data.languagesDatas;
				            
	            		if(data){ 
						 scope.clientData.gender				= data.genderId;
						 scope.clientData.nationality 			= data.nationalityId;
						 scope.clientData.jobTitle				= data.jobTitle;
						 scope.clientData.dateOfBirth			= dateFilter(data.dateOfBirth,'dd MMMM yyyy');
						 scope.clientData.preferredLang 		= data.preferLanId;
						 scope.clientData.remarks				= data.remarks;
						 scope.clientData.idType 				= data.customerIdentificationTypeId;
						 scope.clientData.idNumber				= data.customerIdentificationNumber;
						 scope.clientData.ageGroup				= data.ageGroupId;
						 scope.clientData.utsCustomerId			= data.utsCustomerId;
						 scope.clientData.financeId				= data.financeId;
						 scope.clientData.preferredCommunication = data.preferCommId;
						 if(data.dateOfBirth){
				             var dateOfBirth = dateFilter(data.dateOfBirth,'dd MMMM yyyy');
				            scope.date.dateOfBirth = new Date(dateOfBirth);
				            }
	            	  }
				    });
	        	  }
			    });
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
		            
		          scope.formData.firstname = name_array.shift();
		          scope.formData.lastname = name_array.join(' ');
		            if(scope.formData.lastname == ""){
		            	scope.formData.lastname=".";
		            }
		            
				RequestSender.clientResource.update({clientId: scope.clientId},scope.formData, function(data) {
					location.path('/profile');
			   });
			};
			scope.addinfosubmit = function(){
				
				scope.clientData.locale = rootScope.localeLangCode;
				scope.clientData.dateFormat = 'dd MMMM yyyy';
				if(scope.date.dateOfBirth){scope.clientData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
				if(scope.editAdditionalDatasBtn){
					RequestSender.clientDataResource.update({clientId: scope.clientId},scope.clientData,function(data) {
						location.path('/profile');
					});
				}else{
					RequestSender.clientDataResource.save({clientId: scope.clientId},scope.clientData,function(data) {
						location.path('/profile');
					});
				}
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


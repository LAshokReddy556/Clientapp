ActivateUserController = function(scope,RequestSender,rootScope,routeParams,sessionManager,authenticationService,$modal,$filter) {

		
		
		//default variables for this controller
		  rootScope.isRegClientProcess = true;
		  
		//declaration of formData
		  scope.formData = {};
		  var configDeviceAgreeType = {};
		  
		  
		//function called when  clicking on Login link
		  scope.goToSignInPageFun = function(){
			  	rootScope.currentSession = sessionManager.clear();
		   };
		  
		   //getting the key value form routeParams
		   scope.existedEmail = routeParams.mailId || "";
		   var actualKey = routeParams.registrationKey || "";
		  //adding jsondata for selfcare activation updation request
		  scope.registrationKey = {'verificationKey' : actualKey.slice(0, 27),
		  	  						'uniqueReference' : scope.existedEmail};
		  
		  authenticationService.authenticateWithUsernamePassword(function(data){
		  	 	//sending selfcare activation updation request
			  rootScope.currentSession= {user :'selfcare'};
		  		RequestSender.registrationResource.update(scope.registrationKey,function(successData) {
		  			scope.isRegPage=true;
	  					  
		  			//getting list of city data
		  			scope.cities = [];
	  				RequestSender.addressTemplateResource.get(function(data) {
	  					scope.cities=data.cityData;
	  					  
	  					//getting data from c_configuration for isRegister_plan and isisDeviceEnabled
	  					 var configurationDatas = [];var registrationListing = {};
	  					  RequestSender.configurationResource.get(function(data){

	  						configDeviceAgreeType = JSON.parse(data.clientConfiguration);
	  						scope.isConfigNationalId 	= configDeviceAgreeType.nationalId;
	  							 registrationListing	= configDeviceAgreeType.registrationListing;
	  						scope.isConfigPassport		= registrationListing.passport == 'true';
	  						scope.isConfigRedeem		= registrationListing['is-redeem'] == 'true';
	  						 if(!scope.isConfigPassport) scope.formData.passport = "123456789";
	  						 if(!scope.isConfigRedeem) scope.voucherNumber = "A123";
	  						(configDeviceAgreeType.deviceAgrementType == 'SALE') ?
									  scope.isCPE_TYPESale = true:
								  (configDeviceAgreeType.deviceAgrementType == 'OWN') ?
									  scope.isCPE_TYPEOwn = true :
									  (scope.isCPE_TYPEOwn = false,
									  scope.isCPE_TYPESale = false);

	  						configurationDatas = data.globalConfiguration;
	  						  for(var i in configurationDatas){
	  							 if(configurationDatas[i].name==selfcareModels.registerPlan){
	  								 
	  								  scope.isRegisteredPlan = configurationDatas[i].enabled;
	  								  
	  						      }else if(configurationDatas[i].name==selfcareModels.registrationRequiresDevice){
	  						    	  
	  								  scope.isDeviceEnabled = configurationDatas[i].enabled;
	  								  
	  							  }
	  						  }
	  					  });
	  					});
	
		        },function(errorData){
		      	 if(errorData.data.errors[0].userMessageGlobalisationCode == "error.msg.billing.generatedKey.already.verified"){
		      		 scope.isAlreadyActive=true;
         	  	  }
		        });
		  });
		  
		//national Id validation
		     scope.nationalIdvalue = true;
			 scope.nationalIdValidationFun = function(id){
				 if(id){
				 scope.nationalIdvalue = Kennitala.validate(id);
				 }
			 };
		  		  
		 //function called when entering the device name 
			 var itemDetails = {};
		  scope.getDataForMacId = function(query){
			  if(query){
				  var str = "";
				  var containsColon = query.match(":");
				  if(containsColon){
					  str = query;
				  }else{
					  str += query[0]+query[1]+":";
					  for(var val=3;val<=query.length-1;val++){
						  if(val == query.length-1){
							  break;
						  }
						  if(val%2 == 0)
							  str += query[val]+":";
						  else
							  str +=query[val];
					  }
				  }
				  RequestSender.gettingSerialNumbers.query({query:query},function(data){
					  itemDetails = {};
					  itemDetails = data;
					  if(itemDetails.length == 0){
						  scope.isInvalidMacId = true;
					  }
					  else if(itemDetails.length >=1){
						  scope.isInvalidMacId = false;
				          scope.isDisabledSerialNumber = true;
		            		 if(query.toLowerCase() == itemDetails[0].serialNumber.toLowerCase()){
		            			 scope.provisioningSerialNumber =  itemDetails[0].provisioningSerialNumber;
		            		 }else{
		            			 scope.isInvalidMacId = true;
		            			 delete scope.provisioningSerialNumber;
		            		 }
					  }
				  });
			  }else{
				  scope.isDisabledSerialNumber = false;
				  scope.isInvalidMacId = false;
				  delete scope.provisioningSerialNumber;
			  }
		  };
		  

		  scope.getDataForSerialNumber = function(query){
			  if(query){
				  var str = "";
				  var containsColon = query.match(":");
				  if(containsColon){
					  str = query;
				  }else{
					  str += query[0]+query[1]+":";
					  for(var val=3;val<=query.length-1;val++){
						  if(val == query.length-1){
							  break;
						  }
						  if(val%2 == 0)
							  str += query[val]+":";
						  else
							  str +=query[val];
					  }
				  }
				  RequestSender.gettingSerialNumbers.query({query:query},function(data){
					  itemDetails = {};
					  itemDetails = data;
					  if(itemDetails.length == 0){
						  scope.isInvalidSerialNumber = true;
					  }
					  else if(itemDetails.length >=1){
						  scope.isInvalidSerialNumber = false;
						  scope.isDisabledMacId = true;
		            		 if(query.toLowerCase() == itemDetails[0].provisioningSerialNumber.toLowerCase()){
		            			 	scope.formData.deviceNo =  itemDetails[0].serialNumber;
		            		 }else{
		            			 scope.isInvalidSerialNumber = true;
		            			 delete scope.formData.deviceNo;
		            		 }
					  }
				  });
			  }else{
				  scope.isDisabledMacId = false;
				  scope.isInvalidSerialNumber = false;
				  delete scope.formData.deviceNo;
			  }
		  };
			              
		
		   
		   //getting state and country while changing the city
			  scope.getStateAndCountry=function(city){
				  scope.formData.zipcode = city;
				//sending request for getting state and country while changing the city
				  RequestSender.addressTemplateResource.get({city :city}, function(data) {
					  scope.formData.state = data.state;
					  scope.formData.country = data.country;
				  },function(errorData) {
					  delete scope.formData.state ;
					  delete scope.formData.country;
				  });
			  };
		  
			  function  approve($scope, $modalInstance) {
      	    	  rootScope.currentSession = sessionManager.clear();
      	    	  rootScope.popUpMsgs.push({
      	    		  'image' : '../images/info-icon.png',
      	    		  'names' : [{'name' : 'title.account.activated'},
      	    		             {'name' : 'title.account.activated.userpwd'},
      	    		             {'name' : 'title.login.msg'}]
      	    	      });
      		
		      		$scope.approve = function () { 
		      			
		      			$modalInstance.dismiss('cancel');
		      		 };
			  	} 
			 
			 scope.voucherNumberValidationFun = function(id){
					 if(id){
						 RequestSender.VoucherResource.query({pinNumber:id},function(data){
							 if(data.length == 1){
								 scope.isInValidVoucher = false;
								 var expiryDate  = $filter('DateFormat')(data[0].expiryDate);
								 var todayDate	 = new Date().toDateString();
								 if(Date.parse(expiryDate) < Date.parse(todayDate)){
									 console.log(expiryDate);
									 delete scope.voucherNumber;
									 scope.isDateExpired = true;
								 }else{
									 scope.isDateExpired = false;
								 }
							 }else{
								 scope.isDateExpired = false;
								 scope.isInValidVoucher = true;
								 delete scope.voucherNumber;
								 scope.voucher = id;
							 }
							 
						 });
					 }
				 };
		  		
			//function called when clicking on Register button in Registration Page
			scope.registerBtnFun =function(){
				
				scope.clientData = {};
				 //deviceNo added to form data when isDeviceEnabled true
					 if(scope.formData.deviceNo){
						 scope.clientData.device = scope.formData.deviceNo;
					 }
					 if(scope.formData.homePhoneNumber){
						 scope.clientData.homePhoneNumber = scope.formData.homePhoneNumber;
					 }
					 if((scope.formData.password) !=null){
						 scope.clientData.password = scope.formData.password;
					 }
					 if(scope.isConfigPassport){
						 scope.clientData.passport = scope.formData.passport;
					 }
					 
					 var name_array = new Array();
					 name_array = (scope.formData.fullName.split(" "));
			            
			          scope.clientData.firstname = name_array[0];
			          scope.clientData.fullname = name_array[1];
			            if(scope.clientData.fullname == null){
			            	scope.clientData.fullname=".";
			            }
					 scope.clientData.address 				= scope.formData.address;
					 scope.clientData.nationalId			= scope.formData.nationalId;
					 scope.clientData.zipCode 				= scope.formData.zipcode;
					 scope.clientData.city 					= scope.formData.city;
					 scope.clientData.phone 				= parseInt(scope.formData.mobileNo); 
					 scope.clientData.email 				= scope.existedEmail;
					 scope.clientData.deviceAgreementType 	= configDeviceAgreeType.deviceAgrementType;
					 
					 rootScope.popUpMsgs = [];rootScope.infoMsgs = [];
					 RequestSender.authenticationClientResource.save(scope.clientData,function(data){
						 scope.clientId = data.resourceId;
						 isConfigRedeemFun(function(){
							 
							 if(scope.clientData.password) {
								 rootScope.currentSession = sessionManager.clear();
								 rootScope.infoMsgs.push({
									 'image' : '../images/info-icon.png',
									 'names' : [{'name' : 'title.account.activated'},
									            {'name' : 'title.login.msg'}]
								 });
							 }else{
								 $modal.open({
									 templateUrl: 'messagespopup.html',
									 controller: approve,
									 resolve:{}
								 });
							 }
						 });
		      	      
					 });
					 
					 function  RedemptionErrorMsgPopupController($scope, $modalInstance) {
		      	    	if(scope.clientData.password) {
							 rootScope.currentSession = sessionManager.clear();
							 rootScope.popUpMsgs.push({
								 'image' : '../images/info-icon.png',
								 'names' : [{'name' : 'title.account.activated'},
								            {'name' : 'title.redeem.errormsg'},
								            {'name' :  scope.errorMsg},
								            {'name' : 'title.redeem.login.msg'}]
							 });
							
						 }else{
							 rootScope.currentSession = sessionManager.clear();
			      	    	  rootScope.popUpMsgs.push({
			      	    		  'image' : '../images/info-icon.png',
			      	    		  'names' : [{'name' : 'title.account.activated'},
			      	    		             {'name' : 'title.account.activated.userpwd'},
			      	    		             {'name' : 'title.redeem.errormsg'},
			      	    		             {'name' :  scope.errorMsg},
			      	    		             {'name' : 'title.redeem.login.msg'}]
			      	    	      });
						 }
		      		
				      		$scope.approve = function () { 
				      			
				      			$modalInstance.dismiss('cancel');
				      		 };
					  	}
					 
				   function isConfigRedeemFun(handler){
					 if(scope.isConfigRedeem){
					   var voucherData = {clientId:scope.clientId,pinNumber:scope.voucherNumber};
					   RequestSender.redemptionResource.save(voucherData,function(data){
						   handler();
					   },function(errorData){
						   scope.errorMsg = errorData.data.errors[0].userMessageGlobalisationCode;
						   $modal.open({
								 templateUrl: 'messagespopup.html',
								 controller: RedemptionErrorMsgPopupController,
								 resolve:{}
							 });
					   });
					 }else{
						 handler();
					 }
				   }

					
		};
    };
    
selfcareApp.controller('ActivateUserController', ['$scope',
                                                  'RequestSender',
                                                  '$rootScope',
                                                  '$routeParams',
                                                  'SessionManager',
                                                  'AuthenticationService',
                                                  '$modal',
                                                  '$filter',
                                                  ActivateUserController]);

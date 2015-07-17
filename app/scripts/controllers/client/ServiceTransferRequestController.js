(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServiceTransferRequestController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,$rootScope, http,API_VERSION,PermissionService,$upload,filter,$modal) {
		  
		  
		  scope.walletConfig = webStorage.get('is-wallet-enable');

	        var clientData = webStorage.get('clientData');
	        scope.displayName=clientData.displayName;
	        scope.statusActive=clientData.statusActive;
		    scope.hwSerialNumber=clientData.hwSerialNumber;
	        scope.accountNo=clientData.accountNo;
	        scope.officeName=clientData.officeName;
	        scope.balanceAmount=clientData.balanceAmount;
	        scope.currency=clientData.currency;
	        scope.imagePresent=clientData.imagePresent;
	        scope.categoryType=clientData.categoryType;
	        scope.email=clientData.email;
	        scope.phone=clientData.phone;
	        if(scope.imagePresent){
	         scope.image=clientData.image;
	        }

	  scope.walletConfig = webStorage.get('is-wallet-enable');
		var clientData = webStorage.get('clientData');
		scope.hwSerialNumber = clientData.hwSerialNumber;
		scope.displayName = clientData.displayName;
		scope.statusActive = clientData.statusActive;
		scope.accountNo = clientData.accountNo;
		scope.officeName = clientData.officeName;
		scope.balanceAmount = clientData.balanceAmount;
		scope.currency = clientData.currency;
		scope.imagePresent = clientData.imagePresent;
		scope.categoryType = clientData.categoryType;
		scope.email = clientData.email;
		scope.phone = clientData.phone;
		
        if(scope.imagePresent){
        	scope.image=clientData.image;
		}  
       scope.walletAmount = webStorage.get("walletAmount");
        
       scope.formData = {};
       scope.property = {};
       scope.precinctData = [];
       scope.parcelData = [];
       scope.floorData = [];
       scope.serialNumber ='';
       scope.shiftingCheckbox = "Yes";
       scope.clientId = routeParams.clientId;
       scope.serviceTransferRequestData = {};
       scope.propertyCodesData = [];scope.feeMasterData = [];
       resourceFactory.serviceTransferRequestResource.get({clientId:routeParams.clientId},function(data){
    	  scope.serviceTransferRequestData = data;
    	  scope.existingProperty=data.propertyCode;
    	  scope.feeMasterData  = data.feeMasterData;
    	  scope.propertyTypes  = data.propertyTypes;
    	  scope.propertyId=scope.serviceTransferRequestData.id;
    	  scope.propertyCodes = data.propertyCodes;
    	  
    	  if(scope.feeMasterData){
    		  scope.formData.shiftChargeAmount = scope.feeMasterData.defaultFeeAmount;
    		  scope.formData.chargeCode = scope.feeMasterData.chargeCode;
    	  }
    	  scope.deviceMappingDatas = data.deviceMappingDatas; 
    	  scope.propertyCodeId = scope.deviceMappingDatas[0].id;
    	   scope.serialNumber=scope.deviceMappingDatas[0].serialNumber;
       });
       
       scope.changeProperty = function(id){
    	   var propertyCode;
    	   
    	   for(var i in scope.deviceMappingDatas){
    		   if(scope.deviceMappingDatas[i].id == id){
    			   propertyCode = scope.deviceMappingDatas[i].propertycode;
    			   scope.serialNumber=scope.deviceMappingDatas[i].serialNumber;
    		   }
    		   
    	   }
    	   resourceFactory.serviceTransferRequestResource.get({clientId:routeParams.clientId,propertyCode:propertyCode},function(data){
    	    	  scope.serviceTransferRequestData = data;
    	    	  scope.serviceTransferRequestData.propertyCode = data.addressNo;
    	    	  scope.feeMasterData  = data.feeMasterData;
    	    	  scope.propertyTypes  = data.propertyTypes;
    	    	  scope.propertyId=scope.serviceTransferRequestData.id;
    	    	  scope.propertyCodes = data.propertyCodes;
    	    	  if(scope.feeMasterData){
    	    		  scope.formData.shiftChargeAmount = scope.feeMasterData.defaultFeeAmount;
    	    		  scope.formData.chargeCode = scope.feeMasterData.chargeCode;
    	    	  }
    	    	  scope.propertyCodes = data.propertyCodes;
    	    	  scope.deviceMappingDatas = data.deviceMappingDatas; 
    	       });
    	  
       };
       
       
       scope.invalidBuildingCode = false;
       var serviceTransferFormVal = false;
       scope.$watch(function(){
       	return scope.invalidBuildingCode;
       },function(){
       	if(scope.invalidBuildingCode){
       		scope.servicetransferform.$valid ?
       				(serviceTransferFormVal = scope.servicetransferform.$valid,scope.servicetransferform.$valid = !serviceTransferFormVal) :
       					scope.servicetransferform.$valid = false;
       	}else{
       		if(scope.servicetransferform.$valid) scope.servicetransferform.$valid = true;
       		else {
       			if(serviceTransferFormVal) scope.servicetransferform.$valid = true;
       			else scope.servicetransferform.$valid = false;
       		}
       	}
       });

     //vacant properties
       scope.getExistsProperty = function(query){
    	   scope.invalidBuildingCode = true;
          	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
          	      params: {
          	    	  		query: query
          	      		   }
          	    }).then(function(res){   
          	    	 scope.propertyCodesData=res.data;
          	    	
          	      return scope.propertyCodesData;
          	    });
            };  
       
       scope.getPropertyDetails = function(existsProperty){ 
    	   
          	   if(!angular.isUndefined(existsProperty)){
          		  for(var j in scope.propertyCodesData)  {
          			 if(existsProperty == scope.propertyCodesData[j].propertyCode){
          				 scope.invalidBuildingCode = false;
          				 scope.formData.newPropertyCode = scope.propertyCodesData[j].propertyCode;
          				 scope.unitStatus = scope.propertyCodesData[j].status;
          				 scope.propertyId = scope.propertyCodesData[j].id;
          				 break;
          			 }
          		 }
          		  
          	   }else{
          		 
          	   }
          	 
             };        
           
	     scope.generatePropertyPopup = function (){
	    	 $modal.open({
	    		 templateUrl: 'generateProperty.html',
	  	         controller: generatePropertyController,
	  	         resolve:{}
	  	     });
	     };
	     
	     
	     //starting of property controller     
	     function  generatePropertyController($scope, $modalInstance) {
	    	
	    	 $scope.propertyTypesForPopup = scope.propertyTypes;
	    	 if(Object.keys(scope.property).length >0){
	    		 $scope.parcel = scope.property.parcel ;
	    		 $scope.precinct = scope.property.precinctCode;
	    		 $scope.buildingCode = scope.property.buildingCode;
	    		 $scope.floor = scope.property.floor;
	    		 $scope.unitCode = scope.property.unitCode;
	    		 $scope.propertyCode = scope.property.propertyCode;
	    		 $scope.propertyType =  scope.property.propertyType;
	    		 
	    	 }
	    	
	    	//precinct Data 
	    	$scope.getPrecinct = function(query){
				return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
	       	      params: {
	       	    	  		query: query
	       	      		   }
	       	    }).then(function(res){   
	       	    	 scope.precinctData=res.data;	
	       	      return scope.precinctData;
	       	    });
	        };   
			
			$scope.getPrecinctDetails = function(precinct){
				if(precinct!=undefined){
				    for(var i in scope.precinctData){
				    	if(precinct==scope.precinctData[i].cityCode){
				    		scope.property.precinctCode = scope.precinctData[i].cityCode.substr(0,2);
				    		scope.property.precinct = scope.precinctData[i].cityName;
			          		scope.property.state =  scope.precinctData[i].state;
			          		scope.property.country = scope.precinctData[i].country;
			          		scope.property.precinct = scope.precinctData[i].cityName;
			          		$scope.getWatch(scope.property.precinctCode);
			          		break;
			          }else{
			        	  
							delete scope.property.state;
				    		delete scope.property.country;
						}
					}
				  }else{
					    
						delete scope.property.state;
			    		delete scope.property.country; 
				  }
			};
			
			//parcel Data
			$scope.getParcel = function(queryParam){
				return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	       	      params: {
	       	    	  		query: 'parcel',
	       	    	  	    queryParam:queryParam			
	       	      		   }
	       	    }).then(function(res){   
	       	    	 scope.parcelData=res.data;	
	       	      return scope.parcelData;
	       	    });
	        };   
	        
	        $scope.getParcelDetails = function(parcel){
	       	 if(parcel !=undefined){
	            for(var i in scope.parcelData){
	           	 if(parcel== scope.parcelData[i].code){
				    		scope.property.parcel = scope.parcelData[i].code.substr(0,2);
				    		scope.street = scope.parcelData[i].referenceValue;
				    		$scope.getWatch(scope.property.parcel);
			          		break;
			          }	 
	               }
	           }
	        };
	        
	        //Floor Data
			$scope.getFloor = function(queryParam){
				return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	       	      params: {
	       	    	  		query: 'Level/Floor',
	       	    	  	    queryParam:queryParam	
	       	      		   }
	       	    }).then(function(res){   
	       	    	 scope.floorData=res.data;	
	       	      return scope.floorData;
	       	    });
	        };   
	        
	        $scope.getFloorDetails = function(floor){
	       	 if(floor!=undefined){
	       		 for( var i in scope.floorData){
	       			 if(floor==scope.floorData[i].code){
					    		scope.property.floor = scope.floorData[i].code.substr(0,2);
					    		$scope.getWatch(scope.property.floor);
				          		break;
				          }	 
	                }
	       	 }	       	        
	     };
	     
	     //Building Code
	     $scope.getBuild = function(queryParam){
				return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	     	      params: {
	     	    	  		query: 'Building Codes',
	     	    	  		queryParam:queryParam
	     	      		   }
	     	    }).then(function(res){   
	     	    	 scope.buildingData=res.data;	
	     	      return scope.buildingData;
	     	    });
	      }; 
	      
	     $scope.getbuildCode = function(building){
	       if(!angular.isUndefined(building)){ 
	          for( var i in scope.buildingData){ 
	        	  if(building==scope.buildingData[i].code){
				    		scope.property.buildingCode = scope.buildingData[i].code.substr(0,3);
				    		$scope.getWatch(scope.property.buildingCode);
			          }	 
	             }
	          }
	      };  
	      
	      //Unit code Data
	      $scope.getUnit = function(queryParam){
				return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	      	      params: {
	      	    	  		query: 'Unit Codes',
	      	    	  	queryParam:queryParam
	      	      		   }
	      	    }).then(function(res){   
	      	    	 scope.unitData=res.data;	
	      	      return scope.unitData;
	      	    });
	       };
	       
	      $scope.getunitCode = function(unit){
	      	 if(!angular.isUndefined(unit)){
	          	 scope.property.unitCode=unit.substr(0,4);
	          	if(angular.isUndefined(scope.property.propertyCode)){
	          	      $scope.getPropertyCode(scope.property.unitCode);
	          	}else{
	          		$scope.getWatch(scope.property.unitCode);
	          	   }					 
			      }	 
	       };
	       
	   	$scope.getPropertyCode=function(unitCode){
			if(scope.property.precinctCode !=undefined&&scope.property.parcel!=undefined&&scope.property.buildingCode!=undefined &&scope.property.floor!=undefined){
		   // scope.property.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,unitCode);
		    $scope.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,unitCode);
		    scope.property.unitCode=unitCode;
		    scope.property.propertyCode=$scope.propertyCode;
		    scope.getPropertyStatus(scope.property.propertyCode);
			}
		  }; 
		  
		 $scope.getWatch=function(labelValue){
			  if(!angular.isUndefined(labelValue)&&!angular.isUndefined(scope.property.propertyCode)){
			     scope.property.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor, scope.property.unitCode);
			     $scope.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor, scope.property.unitCode);
			     scope.getPropertyStatus(scope.property.propertyCode);
			  }
      
         };
		  
		  $scope.accept = function (propertyType) {
			 scope.invalidBuildingCode = false;
			 //scope.getPropertyStatus(scope.property.propertyCode);
			 scope.formData.newPropertyCode=scope.property.propertyCode;
			 scope.property.propertyType = propertyType;
 			 $modalInstance.dismiss('delete');
 			
	     };
	    	
	    	
	      $scope.cancel = function () {
		       $modalInstance.dismiss('cancel');
		   };
	         
       
       scope.getPropertyStatus = function(query){
       	return http.get($rootScope.hostUrl+API_VERSION+'/property', {
       	      params: {       	    	 		       	  
       	    	  sqlSearch: query,
	    	         limit : 15,
	    	         offset:0
       	      		   }
       	    }).then(function(res){   
       	    	 scope.propertyCodesData=res.data.pageItems;	
       	    	if(scope.propertyCodesData.length>0){
       	    		 scope.unitStatus=scope.propertyCodesData[0].status;
       	    		 scope.propertyId=scope.propertyCodesData[0].id;
       	    		if(scope.unitStatus == 'OCCUPIED'){
    	    		     $scope.errorData= [];
  	                     $scope.errorData.push({code:'error.msg.property.code.already.allocated'});
  	                    $("#property").addClass("validationerror");
  	                 
    	    	    }else{
    	    		   delete $scope.errorData;
 	    	    	   scope.propertyId=undefined;
 	    		       $("#property").removeClass("validationerror");
 	    		     
    	    	   }
       	    	}else{
       	    	    delete $scope.errorData;
       	    		scope.unitStatus='VACANT';
       	    		scope.propertyId=undefined;
       	    	}
       	      return scope.propertyCodesData;
       	    });
           }; 
           
	     }//end of propertyController
       
       scope.submit = function(){
    	   scope.formData.oldPropertyCode = scope.serviceTransferRequestData.propertyCode; 
    	   scope.formData.serialNumber = scope.serialNumber
    	   scope.formData.locale = "en"; 
    	   if(scope.shiftingCheckbox == "Yes"){
    		  scope.formData.newPropertyCode = scope.existingProperty; 
    	   }/*else if(scope.shiftingCheckbox == "No"){
    		   scope.formData.newPropertyCode = scope.formData.propertyCode; 
    	   }*/
    	   if(angular.isUndefined(scope.propertyId)){
    		   delete scope.property.precinctCode;
    		   resourceFactory.propertyCodeResource.save({},scope.property,function(data){
    			   
        		   resourceFactory.serviceTransferRequestResource.save({clientId:routeParams.clientId},scope.formData,function(data){
        			   location.path("/viewclient/"+scope.clientId);
        		   });
    		   });
    	   }else{
    		   resourceFactory.serviceTransferRequestResource.save({clientId:routeParams.clientId},scope.formData,function(data){
    			   location.path("/viewclient/"+scope.clientId);
    		   });
    	   }
       };
    }
  });
  mifosX.ng.application.controller('ServiceTransferRequestController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','$rootScope',
                                                                        '$http','API_VERSION','PermissionService','$upload','$filter','$modal',
                                                                        mifosX.controllers.ServiceTransferRequestController]).run(function($log) {
    $log.info("ServiceTransferRequestController initialized");
  });
}(mifosX.controllers || {}));

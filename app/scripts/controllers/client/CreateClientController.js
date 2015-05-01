(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateClientController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,$rootScope,PermissionService,$upload,filter,webStorage,$modal) {

    	scope.formData = {};
       
        scope.offices = [];
        scope.cities = [];
        scope.clientCategoryDatas=[];
        scope.groupNameDatas=[];

        
        scope.propertyCodes = [];
        scope.parcelData = [];
   	    scope.floorData = [];
   	    scope.buildingData = [];
   	    scope.property = {};

        scope.nationalityDatas = [];
        scope.genderDatas = [];
        scope.customeridentificationDatas = [];
        scope.cummunitcationDatas = [];
        scope.languagesDatas = [];
        scope.ageGroupDatas = [];
        scope.date = {};

       // var IsClientIndividual = filter('ConfigLookup')('IsClientIndividual');
        var IsClientIndividual =  webStorage.get("client_configuration").IsClientIndividual;
        if(IsClientIndividual == 'true'){
        	scope.formData.entryType ='IND';
        }else{
        	scope.formData.entryType ='ORP';
        }
        


        scope.propertyMaster = webStorage.get("is-propertycode-enabled");
        scope.clientAddInfo = webStorage.get("client-additional-data");

        resourceFactory.clientTemplateResource.get(function(data) {
            scope.offices = data.officeOptions;
            scope.formData.officeId = data.officeId;
            scope.cities=data.addressTemplateData.cityData;
            scope.clientCategoryDatas=data.clientCategoryDatas;
            scope.groupNameDatas = data.groupNameDatas;
            scope.formData.clientCategory=scope.clientCategoryDatas[0].id;
            scope.configurationProperty=data.loginConfigurationProperty.enabled;
            
            if(data.clientAdditionalData){
            scope.nationalityDatas= data.clientAdditionalData.nationalityDatas;
            scope.genderDatas= data.clientAdditionalData.genderDatas;
            scope.ageGroupDatas = data.clientAdditionalData.ageGroupDatas;
            scope.customeridentificationDatas= data.clientAdditionalData.customeridentificationDatas;
            scope.cummunitcationDatas= data.clientAdditionalData.cummunitcationDatas;
            scope.languagesDatas= data.clientAdditionalData.languagesDatas;
            }
            
            
        });
      scope.getStateAndCountry=function(city){
    	  
      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
          		scope.formData.state = data.state;
          		scope.formData.country = data.country;
      	  });
        };
        
      
	     scope.generatePropertyPopup = function (){
	    	 $modal.open({
	    		 templateUrl: 'generateProperty.html',
	  	         controller: generatePropertyController,
	  	         resolve:{}
	  	     });
	     };
	          
	     function  generatePropertyController($scope, $modalInstance) {
	    	 $scope.propertyTypes = [];
	    	 $scope.precinctData = [];
	    	 $scope.formData = {};
			  resourceFactory.propertyCodeTemplateResource.get(function(data) {
				  $scope.propertyTypes = data.propertyTypes;
				  if(Object.keys(scope.property).length >0){
			    		 $scope.formData.precinct=scope.property.precinct;
			    		 $scope.formData.buildingCode=scope.property.buildingCode;
			    		 $scope.formData.unitCode=scope.property.unitCode;
			    		 $scope.formData.propertyCode=scope.property.propertyCode;
			    		 $scope.formData.street=scope.property.street;
			    		 $scope.formData.state=scope.property.state;
			    		 $scope.formData.country=scope.property.country;
			    		 $scope.formData.poBox=scope.property.poBox;
			    		 $scope.formData.propertyType=scope.property.propertyType;
			    		 for( var i in scope.parcelData){
			    			 if(scope.property.parcel == scope.parcelData[i].code){
			    				 $scope.parcel = scope.parcelData[i].description;
			    				 break;
			    			 }
			    		 }
			    		 for( var i in scope.floorData){
			    			 if(scope.property.floor ==  scope.floorData[i].code){
			    				 $scope.floor =scope.floorData[i].description;
			    				 break;
			    			 }
			    		 }
			    	 }
				});
			  
			  //precinct auto complete 
				$scope.getPrecinct = function(query){
					return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
		        	      params: {
		        	    	  		query: query
		        	      		   }
		        	    }).then(function(res){   
		        	    	 $scope.precinctData=res.data;	
		        	      return $scope.precinctData;
		        	    });
	             };   
				
				$scope.getPrecinctDetails = function(precinct){
					if(precinct!=undefined){
					    for(var i in $scope.precinctData){
					    	if(precinct==$scope.precinctData[i].cityName){
					    		scope.property.precinctCode = $scope.precinctData[i].cityCode.substr(0,2);
				          		$scope.formData.state =  $scope.precinctData[i].state;
				          		$scope.formData.country = $scope.precinctData[i].country;
				          		$scope.getWatch(scope.property.precinctCode);
				          		break;
				          }else{
				        	  
								delete $scope.formData.state;
					    		delete $scope.formData.country;
							}
						}
					  }else{
						    
							delete $scope.formData.state;
				    		delete $scope.formData.country; 
					  }
				};
				
				
				$scope.getParcel = function(query){
					return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
		        	      params: {
		        	    	  		query: 'parcel'
		        	      		   }
		        	    }).then(function(res){   
		        	    	 scope.parcelData=res.data;	
		        	      return scope.parcelData;
		        	    });
	             };   
	             $scope.getParcelDetails = function(parcel){
	            	 if(parcel !=undefined){
	                 for(var i in scope.parcelData){
	                	 if(parcel== scope.parcelData[i].description){
					    		scope.property.parcel = scope.parcelData[i].code.substr(0,2);
					    		$scope.formData.street = scope.parcelData[i].referenceValue;
					    		$scope.getWatch(scope.property.parcel);
				          		break;
				          }	 
	                    }
	                }
	             };
				
				$scope.getFloor = function(query){
					return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
		        	      params: {
		        	    	  		query: 'Level/Floor'
		        	      		   }
		        	    }).then(function(res){   
		        	    	 scope.floorData=res.data;	
		        	      return scope.floorData;
		        	    });
	             };   
	             
	             $scope.getFloorDetails = function(floor){
	            	 if(floor!=undefined){
	            		 for( var i in scope.floorData){
	            			 if(floor==scope.floorData[i].description){
						    		scope.property.floor = scope.floorData[i].code.substr(0,2);
						    		$scope.getWatch(scope.property.floor);
					          		break;
					          }	 
		                 }
	            	 }	       	        
	          };
	            
	  		$scope.getPropertyCode=function(unitCode){
				if(scope.property.precinctCode !=undefined&&scope.property.parcel!=undefined&&$scope.formData.buildingCode!=undefined &&scope.property.floor!=undefined){
			    $scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,$scope.formData.buildingCode,scope.property.floor,unitCode);
				}
			}; 
			
	    	 $scope.accept = function () {
	    		 scope.property.precinct=$scope.formData.precinct; 
	    		 scope.property.buildingCode=$scope.formData.buildingCode;
	    		 scope.property.unitCode=$scope.formData.unitCode;
	    		 scope.property.propertyType=$scope.formData.propertyType;
	    		 scope.property.propertyCode=$scope.formData.propertyCode;
	    		 scope.property.street=$scope.formData.street;
	    		 scope.property.state=$scope.formData.state;
	    		 scope.property.country=$scope.formData.country;
	    		 scope.property.poBox=$scope.formData.poBox;
	    		 
	    		 scope.formData.addressNo = $scope.formData.propertyCode;
    			 scope.formData.street = $scope.formData.street;
    			 scope.formData.city  =  $scope.formData.precinct; 
    			 scope.formData.state =  $scope.formData.state;
    			 scope.formData.country = $scope.formData.country;
    			 scope.formData.zipCode = $scope.formData.poBox;
    			 $modalInstance.dismiss('delete');
    			 if(!angular.isUndefined(scope.formData.addressNo)){
    				 $('#propertyCode').attr("readonly","readonly");
    			 }
	      	 };
	         $scope.cancel = function () {
	        	 $modalInstance.dismiss('cancel');
	         };
	         
	         $scope.getWatch=function(labelValue){
				  if(!angular.isUndefined(labelValue)&&!angular.isUndefined($scope.formData.propertyCode)){
				     $scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,$scope.formData.buildingCode,scope.property.floor,$scope.formData.unitCode);
					}
	         
	            };
	     }//end of propertyController

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        };
        scope.setChoice = function(){
            if(this.formData.active){
                scope.choice = 1;
            }
            else if(!this.formData.active){
                scope.choice = 0;
            }
        };
        scope.dbClick = function(){
        	console.log("dbclick");
        	return false;
        };

        scope.submit = function() {
        	if(scope.propertyMaster){
        		delete scope.property.precinctCode;
        		 resourceFactory.propertyCodeResource.save({},scope.property,function(data){
        	        	scope.flag = true;
        	            var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
        	            scope.formData.locale = $rootScope.locale.code;
        	            scope.formData.active = true;
        	            scope.formData.dateFormat = 'dd MMMM yyyy';
        	            scope.formData.activationDate = reqDate;
        	            scope.formData.flag=scope.configurationProperty;
        	            scope.formData.locale = $rootScope.locale.code;
        	            scope.formData.dateFormat = 'dd MMMM yyyy';
        	            if(scope.date.dateOfBirth){scope.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
        	            resourceFactory.clientResource.save(scope.formData,function(data){
        	            	
        	              if (scope.file) {
        	            	  $upload.upload({
        	                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
        	                  data: {},
        	                  file: scope.file
        	                }).then(function(imageData) {
        	                  // to fix IE not refreshing the model
        	                  if (!scope.$$phase) {
        	                    scope.$apply();
        	                  }
        	                  if(scope.clientAddInfo){
        	            		  location.path('/clientadditionalinfo/' + data.resourceId);
        	            	  }else if(PermissionService.showMenu('READ_CLIENT')){
        	                	  location.path('/viewclient/'+data.resourceId);
        	            	  }else{
        	                	  location.path('/clients');
        	            	  }
        	                });
        	              } else{
        	            	  if(scope.clientAddInfo){
        	            		  location.path('/clientadditionalinfo/' + data.resourceId);
        	            	  }else if(PermissionService.showMenu('READ_CLIENT')){
        	            		  location.path('/viewclient/' + data.resourceId);
        	            	  }else{
        	            		  location.path('/clients');
        	            	  }
        	              }
        	            },function(errData){
        	          	  scope.flag = false;
        	            });
        	        	},function(errorData){
        	        		 scope.flag = false;
        		 });
        }else{
        	scope.flag = true;
            var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
            this.formData.locale = $rootScope.locale.code;
            this.formData.active = true;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.activationDate = reqDate;
            this.formData.flag=scope.configurationProperty;
            this.formData.locale = $rootScope.locale.code;
            this.formData.dateFormat = 'dd MMMM yyyy';
            if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
            resourceFactory.clientResource.save(this.formData,function(data){
            	
              if (scope.file) {
            	  $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
                	  location.path('/viewclient/'+data.resourceId);
            	  }else{
                	  location.path('/clients');
            	  }
                });
              } else{
            	  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
            		  location.path('/viewclient/' + data.resourceId);
            	  }else{
            		  location.path('/clients');
            	  }
              }
            },function(errData){
          	  scope.flag = false;
            });
        	}
        };
    }
  });
  mifosX.ng.application.controller('CreateClientController', [
                                                              '$scope',
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
                                                              '$modal',
                                                              mifosX.controllers.CreateClientController]).run(function($log) {
    $log.info("CreateClientController initialized");
  });
}(mifosX.controllers || {}));

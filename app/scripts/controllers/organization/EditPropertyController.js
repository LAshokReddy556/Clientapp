(function(module) {
	mifosX.controllers = _.extend(module, {
		EditPropertyController : function(scope, location,  $modal, route, webStorage,resourceFactory,PermissionService,routeParams,http,dateFilter,API_VERSION,$rootScope,$upload,filter) {
	
			scope.propertyTypes = [];
			scope.precinctData = [];
			scope.parcelData = [];
			scope.buildingData = [];
			scope.floorData = [];
			scope.unitData =[];
			scope.formData = {};
			scope.PermissionService = PermissionService;
			scope.propertyId= routeParams.id;
			
			resourceFactory.propertyCodeResource.get({propertyId: routeParams.id,template:'true'},function(data) {
				scope.formData = data;
				scope.propertyTypes = data.propertyTypes;
				scope.citiesData = data.citiesData;
			/*	if(angular.lowercase(scope.formData.parcel).contains(angular.lowercase("Parcel"))){
					scope.formData.parcel=scope.formData.parcel.replace('Parcel ','');
				}*/
				for(var i in scope.citiesData){
				if(scope.formData.precinct==scope.citiesData[i].cityName){
					scope.cityName=scope.formData.precinct;
					scope.precinctCode = scope.citiesData[i].cityCode.substr(0,2);
					break;
				  }
				}
				for(var i in scope.propertyTypes){
					if(scope.propertyTypes[i].id==scope.formData.propertyTypeId){
						scope.formData.propertyType=scope.propertyTypes[i].id;
						break;
					}
				}
				
			});
			
			//precinct auto complete 
			scope.getPrecinct = function(query){
				return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(res){   
	        	    	 scope.precinctData=res.data;	
	        	      return scope.precinctData;
	        	    });
             };   
			
			scope.getPrecinctDetails = function(precinct){
				if(precinct!=undefined){
				    for(var i in scope.precinctData){
				    	if(precinct==scope.precinctData[i].cityCode){
				    		scope.precinctCode = scope.precinctData[i].cityCode.substr(0,2);
				    		scope.cityName=scope.precinctData[i].cityName;
			          		scope.formData.state =  scope.precinctData[i].state;
			          		scope.formData.country = scope.precinctData[i].country;
			          		scope.getWatch(scope.precinctCode);
			          		break;
			          }else{
			        	   
							delete scope.formData.state;
				    		delete scope.formData.country;
						}
					}
				  }else{
					    //delete scope.formData.precinct;
						delete scope.formData.state;
			    		delete scope.formData.country; 
			    		//delete scope.formData.propertyCode;
				  }
			};
			
			//parcel auto complete 
			scope.getParcel = function(queryParam){
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
             scope.getParcelDetails = function(parcel){
            	 if(parcel !=undefined){
                 for(var i in scope.parcelData){
                	 if(parcel== scope.parcelData[i].code){
				    		scope.formData.parcel = scope.parcelData[i].code.substr(0,2);
				    		scope.formData.street = scope.parcelData[i].referenceValue;
				    		scope.getWatch(scope.formData.parcel);
			          		break;
			          }	 
                    }
                }
             };

           //building auto complete 
             scope.getBuild = function(queryParam){
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
	             
	             scope.getbuildCode = function(building){
	            	 if(!angular.isUndefined(building)){
	                     for(var i in scope.buildingData){
	                    	 if(building==scope.buildingData[i].code ){
					    		scope.formData.buildingCode = scope.buildingData[i].code.substr(0,3);
					    		scope.getWatch(scope.formData.buildingCode);
					    		break;
				            }	 
	                     }
	            	 }
		         }; 
			
		     //floor auto complete      
			scope.getFloor = function(queryParam){
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
             
             scope.getFloorDetails = function(floor){
            	 if(floor!=undefined){
            		 for( var i in scope.floorData){
            			 if(floor==scope.floorData[i].code){
					    		scope.formData.floor = scope.floorData[i].code.substr(0,2);
					    		scope.getWatch(scope.formData.floor);
				          		break;
				          }	 
	                 }
            	 }	       	        
          };
          
          //unitcode auto complete
          scope.getUnit = function(queryParam){
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
           
           scope.getunitCode = function(unit){
          	 if(!angular.isUndefined(unit)){
              	 scope.formData.unitCode=unit.substr(0,4);
              	if(angular.isUndefined(scope.formData.propertyCode)){
              	      scope.getPropertyCode(scope.formData.unitCode);
              	}else{
              		scope.getWatch(scope.formData.unitCode);
              	    }					 
			     }	 
           };
           
           scope.getPropertyCode=function(unitCode){
				if(scope.precinctCode !=undefined&&scope.formData.parcel!=undefined&&scope.formData.buildingCode!=undefined &&scope.formData.floor!=undefined){
			     scope.formData.propertyCode=scope.precinctCode.concat(scope.formData.parcel,scope.formData.buildingCode,scope.formData.floor,unitCode);
			    // scope.getProperty($scope.formData.propertyCode);
				}
			}; 
			scope.getWatch=function(labelValue){
			  if(labelValue!=undefined){
			     scope.formData.propertyCode=scope.precinctCode.concat(scope.formData.parcel,scope.formData.buildingCode,scope.formData.floor,scope.formData.unitCode);
				}
			};
			  
			scope.submit = function() { 
				delete scope.formData.id;
				delete scope.formData.propertyTypes;
				delete scope.formData.citiesData;
				delete scope.formData.clientId;
				delete scope.formData.propertyTypeId;
				delete scope.formData.floorDesc;
				delete scope.formData.parcelDesc;
				scope.formData.precinct=scope.cityName;
				resourceFactory.propertyCodeResource.update({propertyId : routeParams.id}, scope.formData,function(data){
				location.path('/viewproperty/'+data.resourceId);
				});
			}; 
		}
	});
	mifosX.ng.application.controller('EditPropertyController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    'PermissionService',
	    '$routeParams',
	    '$http', 
        'dateFilter',
        'API_VERSION',
        '$rootScope',
        '$upload',
        '$filter',
	    mifosX.controllers.EditPropertyController 
	    ]).run(function($log) {
	    	$log.info("EditPropertyController initialized");
	    });
}(mifosX.controllers || {}));


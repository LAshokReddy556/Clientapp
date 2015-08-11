(function(module) {
	mifosX.controllers = _.extend(module, {
		PropertyController : function(scope, location,  $modal, route, webStorage,resourceFactory,PermissionService,$upload,$rootScope,API_VERSION,paginatorService) {
	
			scope.formData={};
			scope.propertyCodes = [];
			scope.propertyMasters = [];
			scope.PermissionService = PermissionService;
			scope.totalPages = 1;
			scope.pageNo	 = 1;
			
			var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "PropertyMaster") {
					scope.propertyMasterTab = true;
					webStorage.remove('callingTab');
				}
			}
			
	
			scope.propertyDetailsFetchFunction = function(offset, limit, callback) {
				resourceFactory.propertyCodeResource.getAlldetails({offset: offset, limit: limit} , function(data){
		        	scope.totalpropeties = data.totalFilteredRecords;
		        	scope.allDatas = data.pageItems;
		        	if(scope.totalpropeties%15 == 0)	
		        		scope.totalPages = scope.totalpropeties/15;
		        	else
		        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
		        	callback(data);
		        });
			};
			
			scope.getAllProperties = function(){
				
			  scope.propertyCodes = paginatorService.paginate(scope.propertyDetailsFetchFunction, 14);
			};
			

		    scope.searchPropertyDetails123 = function(offset, limit, callback) {
		    	  resourceFactory.propertyCodeResource.getAlldetails({offset: offset, limit: limit,sqlSearch: scope.filterText } , callback); 
		     };
		  		
		    scope.searchPropertyDetails = function(filterText) {
		  			scope.propertyCodes = paginatorService.paginate(scope.searchPropertyDetails123, 14);
		  	};
		
		    scope.nextPageNo = function(){
		    	  if(scope.pageNo < scope.totalPages)
		    	   scope.pageNo +=1;
		      };
		      
		      scope.previousPageNo = function(){
		    	  if(scope.pageNo >1)
		    	  scope.pageNo -=1;
		      };
		      
		      scope.lastPageNo = function(){
		    	  scope.pageNo =scope.totalPages;
		      };
		      
		      scope.firstPageNo = function(){
		    	  scope.pageNo =1;
		      };
		      
		  	
			scope.routeToProperty = function(id) {
				location.path('/viewproperty/' + id);
			};
			 
		  	
		  	
		    /**
	       	 * Upload property
	       	 * */
			
	         scope.uploadProperty = function (){
	          	 $modal.open({
	  	                templateUrl: 'uploadProperty.html',
	  	                controller: approve1,
	  	                resolve:{}
	  	        });
	         };
	          
	      	function  approve1($scope, $modalInstance) {
	      		
	      		 $scope.value=false;
	      		 $scope.onFileSelect = function($files) {
		             $scope.file = $files[0];
		             if($scope.file!=undefined){
		            	 $scope.value=true;
		             }
		           };
		            
		           $scope.downloadFile=function(){
		            window.open("csv/Property Data.csv");
		           };  
		           
	      		$scope.approve = function () {
	      			 $upload.upload({/*41.75.85.206:8080*/
	                     url: $rootScope.hostUrl+ API_VERSION +'/property/documents', 
	                     data: scope.formData,
	                     file: $scope.file
	                   }).then(function(data) {
	                     // to fix IE not refreshing the model
	                     if (!scope.$$phase) {
	                       scope.$apply();
	                     }
	                 	$modalInstance.dismiss('delete');
	                     route.reload();
	                   });
	              
	      		};
	            $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	            };
	        }
	      	
	      	
	        /**
		      * Delete Property
		      **/
		     scope.deleteProperty = function (id){
		    	 scope.propertyId=id;
		    	 $modal.open({
		    		 templateUrl: 'deletePopupForProperty.html',
		  	         controller: approve,
		  	         resolve:{}
		  	     });
		     };
		          
		     function  approve($scope, $modalInstance) {
		    	 $scope.approve = function () {
		    		 resourceFactory.propertyCodeResource.remove({propertyId: scope.propertyId} , {} , function(data) {
		    			 $modalInstance.dismiss('delete');
		    			  route.reload();
		             });
		      	 };
		         $scope.cancel = function () {
		        	 $modalInstance.dismiss('cancel');
		         };
		     }
		     
		     
		     // property history
		   	var propertyhistoryController=function($scope,$modalInstance){

	    		$scope.searchHistory123 = function(offset, limit, callback) {
			    	  resourceFactory.propertyCodeResource.getAlldetails({otherResource:'history',offset: offset, limit: limit ,sqlSearch: scope.propertyCode } , callback); 
			     };
			  		
			     $scope.propertyhistory = paginatorService.paginate($scope.searchHistory123, 14);
			     
	    		$scope.accept = function(){
	    		 $modalInstance.close('delete');
	    		};
	        };
	    	
    	   scope.propertyHistoryPopup = function(propertyCode){
    		   scope.propertyCode = propertyCode;
               $modal.open({
                   templateUrl: 'propertyhistory.html',
                   controller: propertyhistoryController,
                   resolve:{}
               });
    	     };
    	     
    	     
    	     
    	     scope.propertyMasterFetchFunction = function(offset, limit, callback) {
 				resourceFactory.propertyResource.getAlldetails({offset: offset, limit: limit} , function(data){
		        	scope.totalpropeties = data.totalFilteredRecords;
		        	scope.allDatas = data.pageItems;
		        	if(scope.totalpropeties%15 == 0)	
		        		scope.totalPages = scope.totalpropeties/15;
		        	else
		        		scope.totalPages = Math.floor(scope.totalpropeties/15)+1;   
		        	callback(data);
		        });
			};
 			
 			scope.getPropertyMaster=function(){
 			   scope.propertyMasters = paginatorService.paginate(scope.propertyMasterFetchFunction, 14);
 			};

 		    scope.searchPropertyMaster123 = function(offset, limit, callback) {
 		    	  resourceFactory.propertyResource.getAlldetails({offset: offset, limit: limit,sqlSearch: scope.filterText } , callback); 
 		     };
 		  		
 		    scope.searchPropertyMaster = function(filterText) {
 		  			scope.propertyMasters = paginatorService.paginate(scope.searchPropertyMaster123, 14);
 		  	};
 		
 		   /**
	       	 * Upload propertyMaster's
	       	 * */
			
	         scope.uploadPropertyDefinitions = function (){
	          	 $modal.open({
	  	                templateUrl: 'uploadPropertyDefinition.html',
	  	                controller: approve12,
	  	                resolve:{}
	  	        });
	         };
	          
	      	function  approve12($scope, $modalInstance) {
	      		
	      		 $scope.value=false;
	      		 $scope.onFileSelect = function($files) {
		             $scope.file = $files[0];
		             if($scope.file!=undefined){
		            	 $scope.value=true;
		             }
		           };
		            
		           $scope.downloadFile=function(){
		            window.open("csv/Property Master.csv");
		           };  
		           
	      		$scope.approve = function () {
	      			 $upload.upload({/*41.75.85.206:8080*/
	                     url:$rootScope.hostUrl+ API_VERSION +'/propertymaster/documents', 
	                     data: scope.formData,
	                     file: $scope.file
	                   }).then(function(data) {
	                     // to fix IE not refreshing the model
	                     if (!scope.$$phase) {
	                       scope.$apply();
	                     }
	                 	$modalInstance.dismiss('delete');
	                     webStorage.add("callingTab", {someString: "PropertyMaster" });
	                     route.reload();
	                   });
	              
	      		};
	            $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	            };
	        }
	      	
	      	/**
		      * Delete PropertyMaster
		      **/
		     scope.deletePropertyMaster = function (id){
		    	 scope.propertyId=id;
		    	 $modal.open({
		    		 templateUrl: 'deletePopupForPropertyMaster.html',
		  	         controller: approve3,
		  	         resolve:{}
		  	     });
		     };
		          
		     function  approve3($scope, $modalInstance) {
		    	 $scope.approve = function () {
		    		 resourceFactory.propertyResource.remove({propertyId: scope.propertyId} , {} , function(data) {
		    			 $modalInstance.dismiss('delete');
		    			 webStorage.add("callingTab", {someString: "PropertyMaster" });
		    			  route.reload();
		             });
		      	 };
		         $scope.cancel = function () {
		        	 $modalInstance.dismiss('cancel');
		         };
		     }
	      	
    	     
	      	scope.routeToPropertyMaster=function(id){
	      		location.path('/editpropertydefinition/' + id);
	      	};
		  }
	});
	mifosX.ng.application.controller('PropertyController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    'PermissionService',
	    '$upload',
	    '$rootScope',
	    'API_VERSION',
	    'PaginatorService',
	    mifosX.controllers.PropertyController 
	    ]).run(function($log) {
	    	$log.info("PropertyController initialized");
	    });
}(mifosX.controllers || {}));

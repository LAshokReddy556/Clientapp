(function(module) {
	mifosX.controllers = _.extend(module, {
		RadiusController : function(scope, location,  $modal, route, webStorage,resourceFactory) {
		
		scope.nasDatas =[];	
		scope.radServices =[];
		scope.value = [];
		scope.formData = {};
		
		var callingTab = webStorage.get('callingTab', null);
		if (callingTab == null) {
			callingTab = "";
		} else {
			scope.displayTab = callingTab.someString;
			if (scope.displayTab == "radService") {
				scope.radServiceTab = true;
				webStorage.remove('callingTab');
			}
		}
		
		scope.getNas = function() {
			  resourceFactory.nasResource.get(function(data) {
				  scope.nasDatas = data.nasData;
				  scope.radiusVersion = data.radiusVersion || undefined;
				  if(!scope.radiusVersion){
					  scope.radiusVersion = mifosX.models.radiusVersion;
				  }
			  });
		};
		
		scope.getRadService = function() {
			resourceFactory.radServiceResource.get({},function(data) {
				scope.radServices2 = [];
				scope.radiusVersion = data.radiusVersion;
				if(scope.radiusVersion ==  'version-1'){
					scope.radServices = data.radServiceData;
					scope.value = [];
					for(var i=0;i<scope.radServices.length;i++){
						if(scope.radServices[i].value){
							scope.value[i]=scope.radServices[i].value.split('/');
							var lengthPin = scope.value[i].length;
							if(lengthPin > 1){
								scope.radServices[i].upRate = scope.value[i][0];
								scope.radServices[i].downRate = scope.value[i][1];
							}
						}
					};
				}
				else if(scope.radiusVersion ==  'version-2'){
					scope.radServices2 = data.radServiceData;
				}
			});
		};
		
		
		scope.routeToRadService = function(radiusVersion,radServiceId) {
			
			location.path("editRadService/"+radiusVersion + "/"+radServiceId);
		};
		
	    /**
       	 * Delete Nas
       	 * */
         scope.deleteNas = function (id){
         	scope.nasId=id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForNas.html',
  	                controller: approve,
  	                resolve:{}
  	        });
         };
          
      	function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
      			console.log(scope.nasId);
              	resourceFactory.nasResource.remove({nasId: scope.nasId} , {} , function() {
                    route.reload();
              	});
              	$modalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
        }
      	
      	scope.reloadNases = function(nasname){
      		scope.formData.nasname = nasname;
      		resourceFactory.nasReloadResource.save(scope.formData,function(data){
       		  location.path('/radius' );
         });
      	};
      	
        /**
       	 * Delete radService
       	 * */
         scope.deleteRadService = function (id){
         	scope.radServiceId=id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForRadService.html',
  	                controller: remove,
  	                resolve:{}
  	        });
         };
          
      	function  remove($scope, $modalInstance) {
      		$scope.remove = function () {
              	resourceFactory.radServiceResource.remove({radServiceId: scope.radServiceId} , {} , function() {
              		webStorage.add("callingTab", {someString: "radService"});
                    route.reload();
              	});
              	$modalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
        }
		}
	});
	mifosX.ng.application.controller('RadiusController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    mifosX.controllers.RadiusController 
	    ]).run(function($log) {
	    	$log.info("RadiusController initialized");
	    });
}(mifosX.controllers || {}));








































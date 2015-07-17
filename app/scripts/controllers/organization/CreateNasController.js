(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateNasController : function(scope, location,  $modal, route,$http, webStorage,resourceFactory,routeParams) {
			
			scope.radiusVersion = routeParams.version;
			if(scope.radiusVersion == 'version-2'){
				scope.formData = {
						description : '',
						enableapi  : 0,
						type : '0',
						ports : 'null',
						community : 'null',
						starospassword : '',
						ciscobwmode : 0,
						apiusername : '',
						apipassword : ''
				};
			}else{
				scope.formData = {
						description : '',
				};
			}
			
			
			scope.submit = function() {  		
		
		    resourceFactory.nasResource.save(scope.formData,function(data){
		        		  location.path('/radius/' );
		          });
		   
		  };
		}
	});
	mifosX.ng.application.controller('CreateNasController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    '$http',
	    'webStorage',
	    'ResourceFactory',
	    '$routeParams',
	    mifosX.controllers.CreateNasController 
	    ]).run(function($log) {
	    	$log.info("CreateNasController initialized");
	    });
}(mifosX.controllers || {}));
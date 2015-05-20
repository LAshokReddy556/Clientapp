(function(module) {
	mifosX.controllers = _.extend(module, {
		ViewRegionController : function(scope, routeParams, location,
				resourceFactory, PermissionService, $modal, route) {
			scope.region = [];
			scope.PermissionService = PermissionService;
			resourceFactory.regionResource.get({ regionId : routeParams.id }, function(data) {
				scope.region = data;
			});

			scope.deleteRegion = function() {
				$modal.open({
					templateUrl : 'deleteregion.html',
					controller : RegionDeleteCtrl
				});
			};

			var RegionDeleteCtrl = function($scope, $modalInstance) {

				$scope.regionDelete = function() {
					resourceFactory.regionResource.remove({ regionId : routeParams.id }, {}, function(data) {
					//	route.reload();
						location.path('/regions');				
					});
					$modalInstance.close('delete');
				};

				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			};

		}
	});
	mifosX.ng.application.controller('ViewRegionController', [ 
	'$scope', 
	'$routeParams', 
	'$location', 
	'ResourceFactory',
	'PermissionService', 
	'$modal', 
	'$route',
	mifosX.controllers.ViewRegionController ]).run(
			function($log) {
				$log.info("ViewRegionController initialized");
			});

}(mifosX.controllers || {}));
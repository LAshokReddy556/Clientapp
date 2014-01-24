(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPlanController: function(scope, routeParams , location,resourceFactory,$modal ) {
        scope.plan = [];
        resourceFactory.planResource.get({planId: routeParams.id} , function(data) {
            scope.plan = data;
           
        });
        
        scope.deleteplan=function(){
        
            $modal.open({
                templateUrl: 'approve.html',
                controller: Approve,
                resolve:{}
            });
        }
        
        var Approve = function ($scope, $modalInstance) {
            $scope.approve = function (act) {
                scope.approveData = {};
                resourceFactory.planResource.delete({'planId':routeParams.id},{},function(data){
                    location.path('/plans');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
    }
  });
  mifosX.ng.application.controller('ViewPlanController', ['$scope', '$routeParams', '$location','ResourceFactory','$modal', mifosX.controllers.ViewPlanController]).run(function($log) {
    $log.info("ViewPlanController initialized");
  });
}(mifosX.controllers || {}));

(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  StatementsController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  scope.statementsData = [];
		  var statementsData= webStorage.get('clientTotalData');
		  scope.statementsData = statementsData.statementsData;
    }
  });
  selfcare.ng.application.controller('StatementsController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.StatementsController]);
}(selfcare.controllers || {}));

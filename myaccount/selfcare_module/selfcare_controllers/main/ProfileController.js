(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ProfileController: function(scope,RequestSender,rootScope,http,authenticationService,webStorage,httpService,sessionManager,location,routeParams) {
		  
		  scope.clientData =[];
		  
		  var selfcare_sessionData = webStorage.get("selfcare_sessionData");
		  if(selfcare_sessionData){		  
			  var clientTotalData= webStorage.get('clientTotalData');
			  scope.clientId = clientTotalData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  scope.clientData = data;
			  });
		  }
		  
		  /*RequestSender.clients.get({clientId:routeParams.clientId},function(data){
			  scope.client = data;
		  });*/
    }
  });
  selfcare.ng.application.controller('ProfileController', ['$scope','RequestSender','$rootScope','$http','AuthenticationService','webStorage','HttpService','SessionManager','$location','$routeParams', selfcare.controllers.ProfileController]);
}(selfcare.controllers || {}));

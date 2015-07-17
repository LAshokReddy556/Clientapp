(function(module) {
  mifosX.controllers = _.extend(module, {
    LoginFormController: function(scope,webStorage,resourceFactory,authenticationService,$rootScope ) {
      scope.loginCredentials = {};
      scope.authenticationFailed = false;
      scope.configs = [];
     
      
      scope.login = function() {
    	scope.authenticationFailed = false;
        authenticationService.authenticateWithUsernamePassword(scope.loginCredentials);
        
      };
      $rootScope.clearCrendentials=function(){
    	  delete scope.loginCredentials.password;    
      };
      $('#pwd').keypress(function(e) {
          if(e.which == 13) {
              scope.login();
          }
        });
      scope.$on("UserAuthenticationFailureEvent", function(data) {

    	  if($rootScope.errorStatus=='Invalid License'){
    		  
    	  }else{
    	  	scope.authenticationFailed = true;
    	  	$rootScope.clearCrendentials();
    	  }
      });
     
    }
  });
  mifosX.ng.application.controller('LoginFormController', ['$scope','webStorage','ResourceFactory', 'AuthenticationService','$rootScope', mifosX.controllers.LoginFormController]).run(function($log) {
    $log.info("LoginFormController initialized");
  });
}(mifosX.controllers || {}));

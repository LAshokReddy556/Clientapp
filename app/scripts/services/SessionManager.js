(function(module) {
  mifosX.services = _.extend(module, {
    SessionManager: function(webStorage, httpService, resourceFactory,localStorageService,location,TENANT) {
      var EMPTY_SESSION = {};

      this.get = function(data) {
        webStorage.add("sessionData", {userId: data.userId, authenticationKey: data.base64EncodedAuthenticationKey,loginHistoryId:data.loginHistoryId,tenant:TENANT});
        httpService.setAuthorization(data.base64EncodedAuthenticationKey);
        return {user: new mifosX.models.LoggedInUser(data)};
      };

      this.clear = function() {
        webStorage.remove("sessionData");
        webStorage.remove("clientData");
        webStorage.remove("walletAmount");
        httpService.cancelAuthorization();
        return EMPTY_SESSION;
      };

      this.restore = function(handler) {
        var sessionData = webStorage.get('sessionData');
        if (sessionData !== null) {
          if(sessionData.tenant == TENANT){
	          httpService.setAuthorization(sessionData.authenticationKey);
	          resourceFactory.userResource.get({userId: sessionData.userId}, function(userData) {
	   		  if(location.path() == "/")location.path('/home');
	   		  else if(location.path())location.path(location.path());
	   		  else location.path('/home');
	            handler({user: new mifosX.models.LoggedInUser(userData)});
	          });
          }else{
        	  location.path('/').replace();
        	  this.clear();
          }
        } else {
        	location.path('/').replace();
          handler(EMPTY_SESSION);
        }
      };
    }
  });
  mifosX.ng.services.service('SessionManager', [
    'webStorage',
    'HttpService',
    'ResourceFactory',
    'localStorageService',
    '$location',
    'TENANT',
    mifosX.services.SessionManager
  ]).run(function($log) {
    $log.info("SessionManager initialized");
  });
}(mifosX.services || {}));

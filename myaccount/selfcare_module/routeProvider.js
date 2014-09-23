(function(selfcare) {
  var defineRouteProvider = function($routeProvider, $locationProvider) {
    $routeProvider
    
    .when('/home', {
    	templateUrl: 'selfcare_module/views/clients/home.html'
    })
    .when('/active/:mailId/:registrationKey', {
        templateUrl: 'selfcare_module/views/clients/activateuser.html'
    })
    .when('/activeclientpreviewscreen', {
        templateUrl: 'selfcare_module/views/clients/activeclientpreviewscreen.html'
    })
    .when('/additionalorderspreviewscreen/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/additionalorderspreviewscreen.html'
    })
    .when('/eventdetailspreviewscreen', {
    	templateUrl: 'selfcare_module/views/clients/eventdetailspreviewscreen.html'
    })
    .when('/profile', {
        templateUrl: 'selfcare_module/views/clients/profile.html'
    })
    .when('/reloadprofile', {
        templateUrl: 'selfcare_module/views/clients/profile.html'
    })
    .when('/orders', {
        templateUrl: 'selfcare_module/views/clients/orders.html'
    })
    .when('/statements', {
        templateUrl: 'selfcare_module/views/clients/statements.html'
    })
    .when('/payments', {
        templateUrl: 'selfcare_module/views/clients/payments.html'
    })
    .when('/tickets', {
        templateUrl: 'selfcare_module/views/clients/tickets.html'
    })
    .when('/newTicket/:clientId', {
        templateUrl: 'selfcare_module/views/clients/newTicket.html'
    })
    .when('/changepwd', {
        templateUrl: 'selfcare_module/views/clients/changepassword.html'
    })
    .when('/additionalorders/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/additionalorders.html'
    })
    .when('/vodevents', {
	    templateUrl: 'selfcare_module/views/clients/vodevents.html'
	})
	.when('/vieworder/:orderId/:clientId', {
        templateUrl: 'selfcare_module/views/clients/vieworder.html'
	})
	.when('/changeorder/:orderId/:clientId', {
	    templateUrl: 'selfcare_module/views/clients/changeorder.html'
    })
    .when('/renewalorder/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/renewalorder.html'
    })
    .when('/renewalorderpreviewscreen/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/renewalorderpreviewscreen.html'
    })
    .when('/listofvods', {
    	templateUrl: 'selfcare_module/views/clients/listofvods.html'
	})
	.when('/kortaIntegration/:planId/:clientId',{
    	templateUrl: 'selfcare_module/views/kortaIntegration.html'
    })
    .when('/kortasuccess',{
    	templateUrl: 'selfcare_module/views/kortasuccess.html'
    })
    .when('/kortatokenpayment/:planId/:clientId',{
    	templateUrl: 'selfcare_module/views/KortaTokenPayment.html'
    })
    .when('/kortatokenpaymentsuccess/:planId/:clientId',{
    	templateUrl: 'selfcare_module/views/KortaTokenPaymentSuccess.html'
    });
       
    $locationProvider.html5Mode(false);
  };
  selfcare.ng.application.config(defineRouteProvider).run(function($log) {
    $log.info("RouteProvider definition completed");
  });
}(selfcare || {}));

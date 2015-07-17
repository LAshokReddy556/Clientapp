selfcareApp.config(function($routeProvider, $locationProvider) {
	
    $routeProvider
    
    .when('/active/:mailId/:registrationKey', {
        templateUrl: 'views/activateuser.html'
    })
    .when('/orderbookingscreen/:screenName/:clientId/:planId/:priceId', {
    	templateUrl: 'views/orderbookingscreen.html'
    })
    .when('/profile', {
        templateUrl: 'views/profile.html'
    })
    .when('/statements', {
        templateUrl: 'views/statements.html'
    })
    .when('/tickets', {
        templateUrl: 'views/tickets.html'
    })
    .when('/newTicket', {
        templateUrl: 'views/newTicket.html'
    })
    .when('/changepwd', {
        templateUrl: 'views/changepassword.html'
    })
    .when('/addevents', {
	    templateUrl: 'views/addevents.html'
	})
	.when('/vieworder/:orderId/:clientId', {
        templateUrl: 'views/vieworder.html'
	})
    .when('/services', {
    	templateUrl: 'views/services.html'
	})
	.when('/kortaintegration/:price',{
    	templateUrl: 'views/kortaintegration.html'
    })
    .when('/kortasuccess/:screenName/:planId/:priceId',{
    	templateUrl: 'views/kortasuccess.html'
    })
    .when('/kortatokenintegration/:price',{
    	templateUrl: 'views/kortatokenintegration.html'
    })
    .when('/changekortatoken',{
    	templateUrl: 'views/changekortatoken.html'
    })
    .when('/usersetting',{
    	templateUrl: 'views/usersettings.html'
    })
    .when('/viewstatement/:billId',{
    	templateUrl: 'views/viewstatement.html'
    })
    .when('/obsglobalpay',{
    	templateUrl: 'views/globalpaysuccess.html'
    })
    .when('/globalpayintegration',{
    	templateUrl: 'views/globalpayintegration.html'
    })
    .when('/paymentgatewayresponse/:clienId',{
    	templateUrl: 'views/paymentgatewayresponse.html'
    })
    .when('/paymentprocess/:screenName/:planId/:priceId/:price',{
    	templateUrl: 'views/paymentprocess.html'
    })
    .when('/neteller/:clientId',{
    	templateUrl: 'views/neteller.html'
    })
    .when('/internalpayment/:screenName/:clientId/:planId/:priceId/:amount',{
    	templateUrl: 'views/internalpayment.html'
    })
    .when('/prepaidpayment',{
    	templateUrl: 'views/prepaidpayment.html'
    })
    .when('/twocheckoutsuccess',{
    	templateUrl: 'views/twocheckoutsuccess.html'
    })
    .when('/interswitchintegration/:screenName/:clientId/:planId/:priceId/:amount/:productId/:payItemId',{
    	templateUrl: 'views/interswitchintegration.html'
    })
     .when('/paypalrecurring',{
    	templateUrl: 'views/paypalrecurring.html'
    })
    .when('/paypalrecurringsuccess/:screenName/:clientId/:planId/:priceId/:orderId',{
    	templateUrl: 'views/paypalrecurringsuccess.html'
    })
    .when('/paypalredirection',{
    	templateUrl: 'views/paypalredirection.html'
    })
    .when('/events',{
    	templateUrl: 'views/events.html'
    })
    .when('/editprofile/:clientId',{
    	templateUrl: 'views/editprofile.html'
    })
    .when('/evointegration',{
    	templateUrl: 'views/evointegration.html'
    })
    .when('/evosuccess',{
    	templateUrl: 'views/evosuccess.html'
    });
       
    $locationProvider.html5Mode(false);
 
});

TwoCheckoutSuccessController = function(scope,RequestSender, location,localStorageService) {
 
    		var formData = {};
    		scope.isQueryString = true;
    		
    		   if(window.location.search){
    			   scope.isQueryString = true;
    			   var qs = (function(a) {
	    			    if (a == "") return {};
	    			    var b = {};
	    			    for (var i = 0; i < a.length; ++i)
	    			    {
	    			        var p=a[i].split('=', 2);
	    			        if (p.length == 1)
	    			            b[p[0]] = "";
	    			        else
	    			            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	    			    }
	    			    return b;
    			   })(window.location.search.substr(1).split('&'));
    			   localStorageService.add("queryString",{transactionId:qs["order_number"],currency :qs["currency_code"],
    				   				total_amount:qs["total"],otherData :{"clientName":qs["card_holder_name"]}});
    			   window.location.search="";
    		   }else if(localStorageService.get("queryString")){
    			   
    			   scope.isQueryString = false;
    			   formData = localStorageService.get("queryString");
    			   localStorageService.remove("queryString");
		    		
		    		formData.source 		= '2checkout';
		    		formData.locale 		= 'en';
		    		var StorageData			= localStorageService.get("twoCheckoutStorageData");
		    		
		    		if(StorageData){
		    			var screenName			= StorageData.screenName;
		    			formData.clientId		= StorageData.clientId;
		    			var planId				= StorageData.planId;
		    			var priceId				= StorageData.priceId;
		    			
			    		RequestSender.paymentGatewayResource.update(formData, function(data){
			    			localStorageService.remove("twoCheckoutStorageData", data);
			    			localStorageService.add("paymentgatewayresponse", {data:data});
			    			var result = angular.uppercase(data.Result) || "";
			    			location.$$search = {};
			    			if(screenName == 'payment'){
								location.path('/paymentgatewayresponse/'+formData.clientId);
							}else {
								localStorageService.add("gatewayStatus",result);
								location.path("/orderbookingscreen/"+screenName+"/"+formData.clientId+"/"+planId+"/"+priceId);
							}
			    		});
		    		}
    		   }
    		
		};

selfcareApp.controller('TwoCheckoutSuccessController', ['$scope',
                                                        'RequestSender', 
                                                        '$location', 
                                                        'localStorageService', 
                                                        TwoCheckoutSuccessController]);


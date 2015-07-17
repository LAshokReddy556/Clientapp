	 
	var locationOrigin = window.location.origin;
	var locationPathname = window.location.pathname;
	
	
	Langs = [{"name" : "English" , "code" : "en"},
            {"name" : "íslenska", "code":"is"}];
	
	
	
	 
   selfcareModels =  {
	   
	   obs_username 				: "selfcare",
	   obs_password 				: "selfcare",
	   tenantId		 				: "default",
	   OBS_URL		 				: "/obsplatform/api/v1",
	   returnURL 					: locationOrigin+locationPathname+"#/active",
	   selfcareAppUrl 				: locationOrigin+locationPathname,
	   additionalKortaUrl 			: locationOrigin+locationPathname+"#/kortasuccess",
	   encriptionKey 				: "Hugo Technologys",
	   kortaServer 					: "TEST",//or LIVE
	   kortaAmountField 			: "amount",
	   kortaclientId  				: 'clientId',
	   kortaPaymentMethod			: "PaymentMethodType",
	   kortaTokenValue				: "kortaToken",
	   kortaCurrencyType    		: "ISK",
	   kortaDoActionMsg		   		: "STORAGE",
	   changeKortaTokenDoActionMsg	: "STNOCAP",
	   locale   					: "en",
	   registerPlan		    		: "register-plan",
	   registrationRequiresDevice	: "registration-requires-device",
	   deviceAgrementType			: "device-agrement-type",
	   isPassport					: "passport",
	   isRedemption					: "is-redemption",
	   isClientAdditionalData		: "client-additional-data",
	   globalPayCurrencyType		: "NGN",
	   netellerCurrencyType			: "EUR",
	   interswitchCurrencyType		: "566",
	   interswitchJspPage			: "interswitch.jsp",
	   EVO_CurrencyType				: "GBP",
	   EVO_Blowfish					: "9b_JY3m=2t*Pa)T8",
	   EVO_HMAC						: "f]7C8bW[c!4ET9x?5j)XH=6e2Fo*Gw(3",
	   
	   webtvURL						: locationOrigin+"/webtv/index.html#/",
		   
   	};
   
   paymentGatewayNames  = {
		   
		   korta 					: 'korta',
		   dalpay 					: 'dalpay',
		   globalpay 				: 'globalpay',
		   paypal 					: 'paypal',
		   neteller 				: 'neteller',
		   internalPayment 			: 'internalPayment',
		   two_checkout 			: '2checkout',
		   interswitch	 			: 'interswitch',
		   evo	 					: 'evo',
   };
   
   paymentGatewaySourceNames  = {
		   
		   korta 					: 'korta',
		   dalpay 					: 'dalpay',
		   globalpay 				: 'globalpay',
		   paypal 					: 'paypal',
		   neteller 				: 'neteller',
		   internalPayment 			: 'internalPayment',
		   two_checkout 			: '2checkout',
		   evo			 			: 'evo',
   };

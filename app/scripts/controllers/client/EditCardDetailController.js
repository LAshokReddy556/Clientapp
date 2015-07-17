(function(module) {
	mifosX.controllers = _.extend(module, {
		EditCardDetailController : function(scope,webStorage, routeParams , location, resourceFactory) {
			scope.clientId = routeParams.clientId;
			scope.id = routeParams.id;
			scope.type = routeParams.type;
            var clientData = webStorage.get('clientData');
            scope.hwSerialNumber=clientData.hwSerialNumber;
            scope.displayName=clientData.displayName;
            scope.statusActive=clientData.statusActive;
            scope.accountNo=clientData.accountNo;
            scope.officeName=clientData.officeName;
            scope.balanceAmount=clientData.balanceAmount;
            scope.currency=clientData.currency;
            scope.imagePresent=clientData.imagePresent;
            scope.categoryType=clientData.categoryType;
            scope.email=clientData.email;
            scope.phone=clientData.phone;
            scope.formData = {};
            scope.formEncryptedData = {};
            scope.cardTypeDatas = ['MASTERCARD','VISA','DISCOVERY','AMERICAN EXPRESS','OTHERS'];
            var key  = mifosX.models.encrptionKey;
            
            resourceFactory.creditCardUpdateResource.get({clientId: routeParams.clientId, id: routeParams.id, cardType: routeParams.type} , function(data) {
                scope.formData = data;  
                if(scope.formData.type=='CreditCard'){
              	    
    			        var decrypted1 = CryptoJS.AES.decrypt(scope.formData.cardNumber,  key);
       			        scope.cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
       			     var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
			          var stars = "";
			         for (var j in cardNum){
			        	 if(j>=0&&j<(cardNum.length)-4)	{
			        		 stars += "*";
			        	 };
			         }
			         cardNum = stars+cardNum.substr(cardNum.length-4,cardNum.length-1);
			         scope.formData.crdNumber = cardNum;
    			        
    			        var decrypted2 = CryptoJS.AES.decrypt(scope.formData.cardExpiryDate,  key);
    			        scope.formData.cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
    			       //var decrypted3 = CryptoJS.AES.decrypt(scope.formData.cvvNumber,  key);
    			        //scope.formData.cvvNumber = decrypted3.toString(CryptoJS.enc.Utf8);
       			     //var cvvNum = decrypted3.toString(CryptoJS.enc.Utf8);
			          /*var stars = "";
			         for (var j in cvvNum){
			        		 stars += "*";
			         }
			         cvvNum = stars;
			         scope.formData.cvvNum = cvvNum;*/
			         if(scope.formData.cardExpiryDate){
			        	var expireCard = cardExpireDate(scope.formData.cardExpiryDate);
			        	if(expireCard){
			        		scope.cardExpireMsg = true;
			        		scope.expireCardDate = true;
			        	}
			         }
    			        
                }else if(scope.formData.type=='ACH'){
                	  
    			        var decrypted1 = CryptoJS.AES.decrypt(scope.formData.routingNumber, key);
    			        //scope.formData.routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
    			        var routingNum = decrypted1.toString(CryptoJS.enc.Utf8);
  			          var stars = "";
  			         for (var j in routingNum){
  			        	 if(j>=0&&j<(routingNum.length)-4)	{
  			        		 stars += "*";
  			        	 };
  			         }
  			       routingNum = stars+routingNum.substr(routingNum.length-4,routingNum.length-1);
  			         scope.formData.routingNum = routingNum;
      			        
    			       
    			        var decrypted2 = CryptoJS.AES.decrypt(scope.formData.bankAccountNumber, key);
    			       //scope.formData.bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
    			        var bankAccountNum = decrypted2.toString(CryptoJS.enc.Utf8);
    			          var stars = "";
    			         for (var j in bankAccountNum){
    			        	 if(j>=0&&j<(bankAccountNum.length)-4)	{
    			        		 stars += "*";
    			        	 };
    			         }
    			         bankAccountNum = stars+bankAccountNum.substr(bankAccountNum.length-4,bankAccountNum.length-1);
    			         scope.formData.bankAccountNum = bankAccountNum;
    			         
    			         var decrypted3 = CryptoJS.AES.decrypt(scope.formData.bankName,  key);
     			        scope.formData.bankName = decrypted3.toString(CryptoJS.enc.Utf8);
                }
            });
            
            var errors = []; 
            
            scope.selectCardType = function(number){
                if(number){
              	var cardNumber = number.replace(/ +/g, "");
              	var masterCard = cardNumber.match(/^5[1-5][0-9]{5,}$/);
              	var visaCard = cardNumber.match(/^4[0-9]{6,}$/);
              	var discoveryCard = cardNumber.match(/^6(?:011|5[0-9]{2})[0-9]{3,}$/);
              	var americanExpressCard = cardNumber.match(/^3[47][0-9]{5,}$/);
              	if(masterCard) scope.formData.cardType = 'MASTERCARD';
              	else if(visaCard) scope.formData.cardType = 'VISA';
              	else if(discoveryCard) scope.formData.cardType = 'DISCOVERY';
              	else if(americanExpressCard) scope.formData.cardType = 'AMERICAN EXPRESS';
              	else  scope.formData.cardType = 'OTHERS';
                }
                else{
              	  delete scope.formData.cardType;
                }
              };
            scope.cradNumberErrorHide = function(){
            	 //scope.cardNumberReq = false;
            	 scope.cardNumberDigit = false;
            	 scope.cardNumberValid = false;
            	 errors = []; 
            };
            scope.cardExpireErrorHide = function(){
            	 //scope.cardExpiryDateReq = false;
           	     scope.patternMatch = false;
           	     scope.cardExpire = false;
           	     errors = []; 
           };
            
            var cardExpireDate = function(dateVal){
            	  var now=new Date();
				  var nowMonth = now.getMonth()+1; var nowYear = now.getFullYear();
				  var inputDate = (dateVal).split("/");
				  var inputMonth = parseInt(inputDate[0]); var inputYear = parseInt(inputDate[1]);
				  if(inputMonth<=nowMonth ){
					  if(inputYear<=nowYear) return true;
					  else  return false;
				  }else if(inputMonth>nowMonth){
					  if(inputYear<nowYear) return true;
					  else  return false;
				  }
            };
            
            scope.cardCvvNoErrorHide = function(){
               	scope.cardCvvNoDigit = false;
               	errors = []; 
               };
            var cardNumberValid = function(value){
            	
            	// accept only digits and dashes
            	if (/[^0-9-]+/.test(value))
            		return false;
            	var nCheck = 0, nDigit = 0, bEven = false;

            	value = value.replace(/\D/g, "");

            	for (n = value.length - 1; n >= 0; n--) {
            		var cDigit = value.charAt(n);
            		var nDigit = parseInt(cDigit, 10);
            		if (bEven) {
            			if ((nDigit *= 2) > 9) nDigit -= 9;
            		}
            		nCheck += nDigit;
            		bEven = !bEven;
            	}
            	return (nCheck % 10) == 0;
            };
            
            //ACH Validations
            /*scope.hideRoutingNumError = function(){
            	scope.routingNumDigit = false;
            	errors = [];
            };*/
            scope.hideBankAccountNumError = function(){
            	scope.bankAccountNumDigit = false;
            	errors = [];
            };
            scope.hideRoutingNumError = function(){
            	scope.errorMsg = false;
            	errors = [];
            };
            scope.reset123 = function(){
            	webStorage.add("callingTab", {someString: "documents" });
            };
            
			  scope.submit = function () {
				  
				  var cardNumber = $('#cardNumber').val();
				  if(cardNumber){
					 // /^\d+$/.test(value)
					  cardNumber = cardNumber.replace(/ +/g, "");
					  var digitMatch=cardNumber.match(/^\d+$/);
					  if (!digitMatch){
						 scope.cardNumberDigit = true;
						 errors.push({"cardNumberDigit":'true'});
					  }else if(!cardNumberValid(cardNumber)){
						  scope.cardNumberValid = true;
						  errors.push({"cardNumberValid":'true'});
					  }
				  }
				  var cardExpiryDate = $('#cardExpiryDate').val();
				  if(cardExpiryDate){
					  var match=$('#cardExpiryDate').val().match(/^\s*(0?[1-9]|1[0-2])\/(\d{4})\s*$/);
					  if (!match){
						  scope.patternMatch = true;
						  errors.push({"patternMatch":'true'});
					  }else if(cardExpireDate(cardExpiryDate)){
						  scope.cardExpire = true;
						  errors.push({"cardExpire":'true'});
					  }
				  }
				  /*var cardCvvNo = $('#cardCvvNo').val();
				  if(cardCvvNo){
					  var match = $('#cardCvvNo').val().match(/^(?!0+$)\d{1,19}$/);
					  if(!match){
						  scope.cardCvvNoDigit = true;
						  errors.push({"cardCvvNoDigit":'true'});
					  }
				  }*/
			    /* var routingNum = $('#routingNum').val();
				  if(routingNum){
					  var match = $('#routingNum').val().match(/^(?!0+$)\d{1,30}$/);
					  if(!match){
						  scope.routingNumDigit = true;
						  errors.push({"routingNumDigit":'true'});
					  }
				  }*/
				  
				  var bankAccountNum = $('#bankAccountNum').val();
				  if(bankAccountNum){
					  var match = $('#bankAccountNum').val().match(/^(?!0+$)\d{1,30}$/);
					  if(!match){
						  scope.bankAccountNumDigit = true;
						  errors.push({"bankAccountNumDigit":'true'});
					  }
				  }
				  
				  var routingNum = $('#routingNum').val();
				  if(routingNum){
					  var contains=scope.formData.routingNum.indexOf("*");
				  	if(contains != -1){
				  		scope.errorMsg =  true;
				  		errors.push({"errorMsg":'true'});
				  	}
				  }
				  
				 if(errors.length == 0){
				    if(this.formData.type=='ACH'){
				    	    this.formEncryptedData.type='ACH';
						    this.formEncryptedData.routingNumber = CryptoJS.AES.encrypt(this.formData.routingNum, key).toString();
						    this.formEncryptedData.bankAccountNumber = CryptoJS.AES.encrypt(this.formData.bankAccountNum, key).toString();
						    this.formEncryptedData.bankName = CryptoJS.AES.encrypt(this.formData.bankName, key).toString();	
						    this.formEncryptedData.name = this.formData.name;
						    this.formEncryptedData.accountType=this.formData.accountType;		
				    }else{
				    	this.formEncryptedData.type="CreditCard";
				    	/*if(this.formData.cvvNum)
				    	this.formEncryptedData.cvvNumber=CryptoJS.AES.encrypt(this.formData.cvvNum, key).toString();*/
				    	this.formEncryptedData.cardType=this.formData.cardType;
					    this.formEncryptedData.name = this.formData.name;
					    this.formEncryptedData.cardNumber = CryptoJS.AES.encrypt(this.formData.crdNumber, key).toString();
					    this.formEncryptedData.cardExpiryDate = CryptoJS.AES.encrypt(this.formData.cardExpiryDate, key).toString();			        
				    }
				   		   
	                resourceFactory.creditCardUpdateResource.update({clientId: routeParams.clientId, id: routeParams.id, cardType: routeParams.type},this.formEncryptedData,function(data){
	                	webStorage.add("callingTab", {someString: "documents" });
	                    location.path('/viewclient/' + data.clientId);
	                });
				  }
	            };
			
		}
	});
	 mifosX.ng.application.controller('EditCardDetailController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.EditCardDetailController]).run(function($log) {
	        $log.info("EditCardDetailController initialized");
	    });
}(mifosX.controllers || {}));

/*if(scope.formData.crdNumber.indexOf("*")!= -1)
{
	this.formData.cardNumber = scope.cardNum;
}
else{
this.formData.cardNumber = scope.formData.crdNumber;
}*/

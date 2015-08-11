(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateTicketController: function(scope,webStorage, resourceFactory, location, translate,dateFilter,routeParams,$rootScope) {
           
		  var locationOrigin = window.location.origin;
      	var locationPathname = window.location.pathname;
        	
			scope.priorityTypes = [];
			scope.formData={};						
			scope.problemsDatas = [];
			scope.usersDatas=[];
			scope.sourceData=[];
			 scope.start = {};
			 /*scope.start.date = new Date();
			 scope.minDate= scope.start.date;*/
			 
			 scope.first = {};
			 //scope.first.date = new Date();
		     //scope.first.time = "10:10";
		     
			 $('#timepicker1').timepicker({
		        	showInputs:false,
		        	showMeridian:false
		        });
			 
			 scope.clientId=routeParams.id;
			 scope.walletConfig = webStorage.get('is-wallet-enable');
			 var clientData = webStorage.get('clientData');
			    scope.displayName=clientData.displayName;
			    scope.hwSerialNumber=clientData.hwSerialNumber;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.currency=clientData.currency;
			    scope.imagePresent=clientData.imagePresent;
			    scope.categoryType=clientData.categoryType;
		        scope.email=clientData.email;
		        scope.phone=clientData.phone;
		        if(scope.imagePresent){
		        scope.image=clientData.image;
		        }
		        
		        var sessionData=webStorage.get('sessionData');
		        scope.formData.assignedTo=sessionData.userId;
		       
            resourceFactory.ticketResourceTemplate.get(function(data){ 
            	
            	scope.start.date = new Date(data.date);
   			 	scope.minDate= scope.start.date;
   			 
              scope.date = data.ticketDate;
              scope.priorityTypes=data.priorityType;
              for(var i=0;i<scope.priorityTypes.length;i++){
            	  
              	if(scope.priorityTypes[i].value=='LOW'){
              		scope.formData.priority=scope.priorityTypes[i].value;
              	}
              }
              scope.problemsDatas=data.problemsDatas;
              scope.usersDatas=data.usersData;
              scope.sourceData=data.sourceData;
              for(var i=0;i<scope.sourceData.length;i++){
            	  
                	if(scope.sourceData[i].mCodeValue=='Phone'){
                		scope.formData.sourceOfTicket=scope.sourceData[i].mCodeValue;
                	}
                }
            });
            
            
            scope.reset123 = function(){
         	   webStorage.add("callingTab", {someString: "Tickets" });
         	   delete scope.first.time;
            };
           
			scope.submit = function() { 
				this.formData.locale = $rootScope.locale.code;
				scope.first.time=$('#timepicker1').val();
				//console.log(scope.first.date);
				//console.log(scope.first.time);
				var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
				//alert(scope.first.time);
				if(scope.first.date==null||scope.first.time==''){
					delete this.formData.dueTime;
				}else{
					this.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
				}
	        	
	        	
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.ticketDate = reqDate;
				this.formData.dateFormat = 'dd MMMM yyyy';
				this.formData.ticketURL=locationOrigin+''+locationPathname+"#/viewTicket/"+scope.clientId+"/";
				//alert(this.formData.ticketURL);
				this.formData.ticketTime = ' '+new Date(scope.start.date).toLocaleTimeString().replace("IST","").trim();
                resourceFactory.ticketResource.save({'clientId': routeParams.id},this.formData,function(data){
                 location.path('/viewTicket/'+ routeParams.id+'/'+data.resourceId);
               });
         };
    }
  });
  mifosX.ng.application.controller('CreateTicketController', ['$scope', 'webStorage','ResourceFactory', '$location', '$translate','dateFilter', '$routeParams','$rootScope', mifosX.controllers.CreateTicketController]).run(function($log) {
    $log.info("CreateTicketController initialized");
  });
}(mifosX.controllers || {}));


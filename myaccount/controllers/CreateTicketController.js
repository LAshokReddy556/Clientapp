	  CreateTicketController = function(scope, RequestSender, location, dateFilter,localStorageService,rootScope) {
            
			scope.priorityTypes = [];
			scope.formData={};						
			scope.problemsDatas = [];
			scope.usersDatas=[];
			scope.sourceData=[];
			 scope.start = {};
			 scope.start.date = new Date();
			 scope.minDate= scope.start.date;
			 
			 scope.first = {};
		     
			 $('#timepicker1').timepicker({
		        	showInputs:false,
		        	showMeridian:false
		        });
			 var clientData= localStorageService.get('clientTotalData');
			 if(clientData){
			   var selfcare_sessionData=localStorageService.get('selfcare_sessionData');
			   scope.formData.assignedTo=1;//selfcare_sessionData.userId;
			   scope.clientId=clientData.id;
			   RequestSender.ticketResourceTemplate.get(function(data){ 
				   
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
			 }
					        
			scope.submit = function() { 
				this.formData.locale = rootScope.localeLangCode;
				scope.first.time=$('#timepicker1').val();
				var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
				if(scope.first.date==null||scope.first.time==''){
					delete this.formData.dueTime;
				}else{
					this.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
				}
	        	
	        	
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.ticketDate = reqDate;
				this.formData.dateFormat = 'dd MMMM yyyy';
				this.formData.ticketTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
				RequestSender.ticketResource.save({'clientId': scope.clientId},this.formData,function(data){
					location.path('/tickets');
               });
         };
    };

selfcareApp.controller('CreateTicketController', ['$scope', 
                                                  'RequestSender',
                                                  '$location',
                                                  'dateFilter', 
                                                  'localStorageService', 
                                                  '$rootScope', 
                                                  CreateTicketController]);


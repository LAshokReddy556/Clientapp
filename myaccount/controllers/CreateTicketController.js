	  CreateTicketController = function(scope, RequestSender, location, dateFilter,rootScope) {
            
			
			
			 scope.start = {};
			 //scope.minDate= scope.start.date;
			 
			 scope.first = {};
		     
			 $('#timepicker1').timepicker({
		        	showInputs:false,
		        	showMeridian:false
		      });
			 
			 scope.formData={};						
			 if(rootScope.selfcare_sessionData){
			   scope.formData.assignedTo=1;
			   scope.clientId=rootScope.selfcare_sessionData.clientId;
			   
			   scope.priorityTypes = [];scope.problemsDatas = [];scope.usersDatas=[];scope.sourceData=[];
			   RequestSender.ticketResourceTemplate.get(function(data){ 
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
			 }
					        
			scope.submit = function() { 
				scope.formData.locale = rootScope.localeLangCode;
				scope.first.time=$('#timepicker1').val();
				if(scope.first.date==null||scope.first.time==''){
					delete scope.formData.dueTime;
				}else{
					scope.formData.dueTime = dateFilter(scope.first.date,'yyyy-MM-dd')+" "+$('#timepicker1').val()+':00';
				}
	        	
	        	
	            scope.formData.ticketDate = dateFilter(scope.start.date,'dd MMMM yyyy');
				scope.formData.dateFormat = 'dd MMMM yyyy';
				scope.formData.ticketTime = ' '+new Date(scope.formData.ticketDate).toLocaleTimeString().replace("IST","").trim();
				RequestSender.ticketResource.save({'clientId': scope.clientId},scope.formData,function(data){
					location.path('/tickets');
               });
         };
    };

selfcareApp.controller('CreateTicketController', ['$scope', 
                                                  'RequestSender',
                                                  '$location',
                                                  'dateFilter', 
                                                  '$rootScope', 
                                                  CreateTicketController]);


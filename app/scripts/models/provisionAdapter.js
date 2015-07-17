(function(module) {
  mifosX.models = _.extend(module, {
	  
	 //for Adapter Changes
	   AdapterStartCommand : "sh /home/ranjith/jasper/BeeniusAdapter/Beeniusadapter.sh start",
	   AdapterStopCommand : "sh /home/ranjith/jasper/BeeniusAdapter/Beeniusadapter.sh stop",  
	   AdapterStatusCommand : "sh /home/ranjith/jasper/BeeniusAdapter/Beeniusadapter.sh status",
	   AdapterLogFileCommand : "/home/ranjith/jasper/BeeniusLogFiles/logs/BeeniusIntegrator.log",
	   AdapterLogFileDateFormat : "yyyy-MM-dd",
	   AdapterLogFileIntervelDays : 7,
	   
	   AdapterStatusStopedResponse : "Adapter is not running",
	   AdapterStatusStartingResponse   : "Adapter is running",
	   
	   AdapterStopedResponse : "Adapter stopped",
	   AdapterStartingResponse   : "Adapter started",
	   
	   AdapterProvSystem : "CMS",
	   AdapterFileName : "adapter",
	   radiusVersion : "version-1",
  });
}(mifosX.models || {}));

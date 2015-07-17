selfcareApp.filter('DateFormat', function(dateFilter,localStorageService) {
  return function(input) {
	  if(input){
          var tDate = new Date(input);
          return dateFilter(tDate,localStorageService.get('localeDateFormat'));
      }

  };
});



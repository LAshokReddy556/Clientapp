(function (module) {
    mifosX.directives = _.extend(module, {
    	NgMinlengthDirective: function () {
        	return {
        	    require: 'ngModel',
        	    link: function(scope,elm,attr,ngModel){
        	      
        	      var minlength = 0;
        	     
        	      var minLengthValidator = function(value){   
        	        var validity = ngModel.$isEmpty(value) || value.length >= minlength;
        	        ngModel.$setValidity('minlength',  validity);
        	        return validity ? value : undefined;
        	      };
        	            
        	      attr.$observe('myMinlength', function(val){
        	         minlength = parseInt(val,10);
        	         minLengthValidator(ngModel.$viewValue);
        	      });

        	      
        	      ngModel.$parsers.push(minLengthValidator);
        	      ngModel.$formatters.push(minLengthValidator);
        	    } 
        	  };

        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("myMinlength", [mifosX.directives.NgMinlengthDirective]).run(function ($log) {
    $log.info("NgMinlengthDirective initialized");
});
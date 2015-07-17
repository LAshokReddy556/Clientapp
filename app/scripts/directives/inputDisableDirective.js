(function(module) {
    mifosX.directives = _.extend(module, {
    	inputDisableDirective: function() {
    		return function(scope, element, attrs){
    		    scope.$watch(attrs.inputDisabled, function(val){
    		      if(val)
    		    	  element.attr("disabled", "disabled");
    		      else
    		    	  element.removeAttr("disabled");
    		    });
    		  }
        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("inputDisabled", [mifosX.directives.inputDisableDirective]).run(function($log) {
    $log.info("inputDisableDirective initialized");
});
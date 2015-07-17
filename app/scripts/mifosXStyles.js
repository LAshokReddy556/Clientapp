define(['underscore'], function() {
  var styles = {
    css: [
      'bootstrap-combined.min',
      'bootswatch',
      'font-awesome.min',
      'app',
      'nv.d3',
      'style',
      'bootstrap-timepicker',
      'jquery-ui',
      'jquery.jWizard.min',
      'chosen.min',
      'multiple-select',
      'bootstrap-switch',
      'additional',
      'fullcalendar',
      'fullcalendar.print'
      
    ]
  };

  require(_.reduce(_.keys(styles), function(list, pluginName) {
    return list.concat(_.map(styles[pluginName], function(stylename) { return pluginName + "!styles/" + stylename; }));
  }, []));
});

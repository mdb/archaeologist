var _ = require('underscore');

exports.getOutFields = function (fields) {
  var formattedFields;

  if (typeof fields === 'string') return 'outFields=' + encodeURIComponent(fields);

  formattedFields = _.map(fields, function(item) {
    return item;
  }).join(',+');

  return 'outFields=' + formattedFields;
};

exports.buildReqParamsString = function (params) {
  return _.map(params, function(value, key) {
    if (key === 'where') {
      return key + '=' + encodeURIComponent(value);
    } else if (key === 'outFields') {
      return exports.getOutFields(value);
    } else {
      return key + '=' + value;
    }
  }).join('&');
};

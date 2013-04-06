var request = require('request'),
    _ = require('underscore'),
    helpers = require('./helpers');

function Archaeologist(opts) {
  this.defaultSettings = {
    apiHost: undefined,
    apiPathBase: undefined,
    defaultResultOptions: {
      returnCountOnly: false,
      returnIdsOnly: false,
      returnGeometry: false,
      maxAllowableOffset: '',
      outSR: '4326', // outputSpatialReference
      outFields: '*',
      f: 'json'
    }
  };

  this.settings = opts ? _.defaults(opts, this.defaultSettings) : this.defaultSettings;

  if (opts && opts.defaultResultOptions) {
    this.settings.defaultResultOptions = _.defaults(opts.defaultResultOptions, this.defaultSettings.defaultResultOptions);
  }
}

Archaeologist.prototype.get = function (params, callback) {
  var paramsWithDefaults = _.defaults(params, this.settings.defaultResultOptions),
      url = this.settings.apiHost + this.settings.apiPathBase + '?' + helpers.buildReqParamsString(paramsWithDefaults);

  request(url, function (err, response, body) {
    if (err) return callback(err);
    callback(null, JSON.parse(body));
  });
};

module.exports = function(opts) {
  return new Archaeologist(opts);
};

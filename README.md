# Archaeologist

A thin Node.js client for working with the [ESRI ArcGIS Server REST API](http://resources.esri.com/help/9.3/arcgisserver/apis/rest).

## Example Usage

Basic usage:

    var Arc = require('archaeologist');
    var arc = new Arc({
      apiHost: 'http://host.com',
      apiPathBase: '/path/to/service'
    });

    arc.get({where: "SOMEFIELD='SomeValue'"}, function (error, data) {
      /*
      performs a get request to:
      http://host.com/path/to/service?returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outputSpatialReference=&outFields=*&where=SOMEFIELD='SomeValue'&f=json
      */
      if (error) return error;
      console.log(data);
    });

Overriding default response options:

    var Arc = require('archaeologist');
    var arc = new Arc({
      apiHost: 'http://host.com',
      apiPathBase: '/path/to/service'
    });

    arc.get({
      where: "SOMEFIELD='SomeValue'",
      returnCountOnly: true,
      outFields: ['somefield']
    }, function (error, data) {
      /*
      performs a get request to:
      http://host.com/path/to/service?returnCountOnly=true&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outputSpatialReference=&outFields=somefield&where=SOMEFIELD='SomeValue'&f=json
      */
      if (error) return error;
      console.log(data);
    });

## Configuration

View settings:
    
    arc.settings

Specifying new settings on instantiation:
    
    var arc = new Arc({
      apiHost: 'http://host.com',
      apiPathBase: '/path/to/service',
      defaultResultOptions: {
        outFields: ['field', 'anotherField'],
      }
    });

View original, default settings:
    
    arc.defaultSettings
    
    /*
    {
      apiHost: undefined,
      apiPathBase: undefined,
      defaultResultOptions: {
        returnCountOnly: false,
        returnIdsOnly: false,
        returnGeometry: true,
        maxAllowableOffset: '',
        outputSpatialReference: '',
        outFields: '*',
        f: 'json'
      }
    }
    */

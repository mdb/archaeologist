# Archaeologist

A thin Node.js client for working with the [ESRI ArcGIS Server REST API](http://resources.esri.com/help/9.3/arcgisserver/apis/rest).

This is a work in progress.

## Example Usage

Basic usage:

    var Archaeologist = require('archaeologist');
    var archaeologist = new Archaeologist({
      apiHost: 'http://host.com',
      apiPathBase: '/path/to/service'
    });

    archaeologist.get({where: "SOMEFIELD='SomeValue'"}, function (error, data) {
      /*
      performs a get request to:
      http://host.com/path/to/service?returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outputSpatialReference=&outFields=*&where=SOMEFIELD='SomeValue'&f=json
      */
      if (error) return error;
      console.log(data);
    });

Overriding default response options:

    var Archaeologist = require('archaeologist');
    var archaeologist = new Archaeologist({
      apiHost: 'http://host.com',
      apiPathBase: '/path/to/service'
    });

    archaeologist.get({
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
    
    archaeologist.settings

Specifying default settings on instantiation:
    
    var archaeologist = new Archaeologist({
      apiHost: 'http://host.com',
      apiPathBase: '/path/to/service',
      defaultResultOptions: {
        outFields: ['field', 'anotherField'],
        f: 'xml'
      }
    });

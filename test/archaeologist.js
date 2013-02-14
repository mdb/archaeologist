var expect = require('expect.js'),
    nock = require('nock'),
    modulePath = '../lib/archaeologist';

describe("Archaeologist", function() {
  var Archaeologist = require(modulePath),
      arc = new Archaeologist();

  it("exists", function () {
    expect(typeof Archaeologist).to.eql('function');
  });

  describe("#settings", function () {
    it("exists as an object on a PhlPacComplaints instance", function () {
      expect(typeof arc.settings).to.eql('object');
    });

    it("houses configuration settings", function () {
      expect(arc.settings.apiHost).to.eql(undefined);
      expect(arc.settings.apiPathBase).to.eql(undefined);
      expect(arc.settings.defaultResultOptions).to.eql({
        returnCountOnly: false,
        returnIdsOnly: false,
        returnGeometry: true,
        maxAllowableOffset: '',
        outputSpatialReference: '',
        outFields: '*',
        f: 'json'
      });
    });

    it("can be overridden on instantiation", function () {
      var arcInst = new Archaeologist({
        apiHost: 'http://fakehost.com',
        apiPathBase: '/fake/path',
        defaultResultOptions: {
          foo: 'bar',
          baz: 'bim'
        }
      });

      expect(arcInst.settings.apiHost).to.eql('http://fakehost.com');
      expect(arcInst.settings.apiPathBase).to.eql('/fake/path');
      expect(arcInst.settings.defaultResultOptions).to.eql({foo: 'bar', baz: 'bim'});
    });
  });

  describe("#get", function () {
    var arcInst = new Archaeologist({
      apiHost: 'http://somehost.com',
      apiPathBase: '/some/path/base'
    });

    it("exists as a method on an Archaeologist instance", function () {
      expect(typeof arcInst.get).to.eql('function');
    });

    it("makes an API call to the proper endpoint, appending the object it's passed as a request params string, and also including default result options if none are specified", function (done) {
      nock('http://somehost.com')
        .get("/some/path/base?foo=bar&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outputSpatialReference=&outFields=*&f=json")
        .reply(200, {resp: 'fakeResponse'});

      arcInst.get({foo: 'bar'}, function(err, data) {
        expect(data).to.eql({resp: 'fakeResponse'});
        done();
      });
    });

    it("makes the correct API call if its default result options have been overridden", function (done) {
      nock('http://somehost.com')
        .get("/some/path/base?foo=bar&returnCountOnly=true&returnIdsOnly=true&returnGeometry=false&maxAllowableOffset=blah&outputSpatialReference=blah&outFields=foo,+bar&f=json")
        .reply(200, {resp: 'fakeResponse'});

      arcInst.get({
        foo: 'bar',
        returnCountOnly: true,
        returnIdsOnly: true,
        returnGeometry: false,
        maxAllowableOffset: 'blah',
        outputSpatialReference: 'blah',
        outFields: ['foo', 'bar']
      }, function(err, data) {
        expect(data).to.eql({resp: 'fakeResponse'});
        done();
      });
    });
  });
});

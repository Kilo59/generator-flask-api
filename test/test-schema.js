'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('schema', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/schema'))
      .withArguments('beartato')
      .withOptions({ skipInstall: true })
      .on('ready', function (generator) {
        generator.config.set('appName', 'app');
        generator.config.set('database', 'postgresql');
        generator.config.set('databaseMapper', 'sqlalchemy');
      })
      .on('end', done);
  });

  it('creates expected files', function () {
    assert.file('app/schemas/beartato.py');
  });

  it('creates a serialization schema', function () {
    assert.fileContent(
      'app/schemas/beartato.py', /class BeartatoSchema\(ma\.ModelSchema\)/
    );
  });
});

describe('schema without mapper', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/schema'))
      .withArguments('beartato')
      .withOptions({ skipInstall: true })
      .on('ready', function (generator) {
        generator.config.set('appName', 'app');
        generator.config.set('database', 'none');
        generator.config.set('databaseMapper', 'none');
      })
      .on('end', done);
  });

  it('creates expected files', function () {
    assert.file('app/schemas/beartato.py');
  });

  it('creates a serialization schema', function () {
    assert.fileContent(
      'app/schemas/beartato.py', /class BeartatoSchema\(ma\.Schema\)/
    );
  });
});

describe('schema as part of resource', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/schema'))
      .withArguments('beartato')
      .withOptions({ skipInstall: true, isGeneratingResource: true})
      .on('ready', function (generator) {
        generator.config.set('appName', 'app');
      })
      .on('end', done);
  });

  it('creates expected files', function () {
    assert.file('app/schemas/beartato.py');
  });
});

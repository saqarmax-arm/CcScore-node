'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export ccscore-lib', function() {
    var ccscore = require('../');
    should.exist(ccscore.lib);
    should.exist(ccscore.lib.Transaction);
    should.exist(ccscore.lib.Block);
  });
});

'use strict';

const fs = require('fs');
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

describe('injectjs', () => {
  it('should inject all javascript files into a html page', () => {
    const actual = read('test/output/index-injected-all.html');
    const expected = read('test/expected/index-injected-all.html');
    assert.equal(actual, expected);
  });

  it('should remove all inject tags from a html page', () => {
    const actual = read('test/output/index-removed.html');
    const expected = read('test/expected/index-removed.html');
    assert.equal(actual, expected);
  });

  it('should inject two javascript files into a html page', () => {
    const actual = read('test/output/index-injected-two.html');
    const expected = read('test/expected/index-injected-two.html');
    assert.equal(actual, expected);
  });
});

'use strict';

const assert = require('assert');

const util = require('../src/utils.js');

describe('Utils', () => {
  describe('#toTitleCase()', () => {
    it('should return ASCII text in title case', () => {
      let text = util.toTitleCase('mInaSE INoRi');

      assert.equal(text, 'Minase Inori');
    });

    it('should flatten arrays into title case strings', () => {
      let text = util.toTitleCase(['inosuKE', 'Inorin']);

      assert.equal(text, 'Inosuke, Inorin');
    });

    it('should return non ASCII text without change', () => {
      let text = util.toTitleCase('水瀬いのり');

      assert.equal(text, '水瀬いのり');
    });
  });

  describe('#matchString()', () => {
    it('should return null if no match is found', () => {
      let data = {
        'minase inori': ['inorin', 'inosuke'],
        inorin: 'minase inori',
        inosuke: 'minase inori'
      };
      let string = 'yamazaki haruka';
      let result = util.matchString(string, data);

      assert.equal(result, null);
    });

    it('should return the value in title case if a key is matched', () => {
      let data = {
        'minase inori': ['inorin', 'inosuke'],
        inorin: 'minase inori',
        inosuke: 'minase inori'
      };
      let string = 'some random inorin string';
      let result = util.matchString(string, data);

      assert.equal(result, 'Minase Inori');
    });

    it('should return the value of the first match in title case if there are multiple keys', () => {
      let data = {
        'minase inori': ['inorin', 'inosuke'],
        inorin: 'minase inori',
        pyon: 'yamazaki haruka'
      };
      let string = 'some random inorin string pyon';
      let result = util.matchString(string, data);

      assert.equal(result, 'Minase Inori');
    });
  });
});

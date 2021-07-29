'use strict';

const section = require('section-tests');
const assert = require('assert');
const path = require('path');
const envr = require('../');


section.use(new section.SpecReporter());




section('ENVR', (section) => {
    section.test('should get the correct env I', () => {
        assert.equal(envr.env, 'testing');
    });

    section.test('should get the correct env II', () => {
        assert(envr.isTesting());
    });

    section.test('should get the correct env III', () => {
        assert(!envr.isProduction());
    });

    section.test('should get the correct config', () => {
        const config = envr.config(path.join(__dirname, 'data'));

        assert(config);

        assert.equal(config.a, 1);
        assert.equal(config.b, 2);
        assert.equal(config.c, 3);
        assert.equal(config.pass, 'so-secure');
        assert.equal(config.yeah[0].thisIs.suchFun, 69);
        assert.equal(config.fake, 'real');
    });
});

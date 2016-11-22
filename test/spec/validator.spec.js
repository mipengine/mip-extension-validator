const fs = require('fs');
const path = require('path');
const validator = require('../../lib/validator');
const assert = require('assert');

describe('validator.js ', function () {

    // test case
    it('valid', function (done) {
        var dirPath = path.resolve(process.cwd(), 'test/mip-test-element');
        validator.validate(dirPath)
            .then(function (data) {
                assert.ok(data.status === 0, 'valid package');
                assert.ok(data.warns.length === 0, 'valid package');
                assert.ok(data.errors.length === 0, 'valid package');
                done();
            }, function (e) {
                assert.ok(false, e.message);
                done();
            });
    });

    it('invalid', function (done) {
        var dirPath = path.resolve(process.cwd(), 'test/mip-test-preset');
        validator.validate(dirPath)
            .then(function (data) {
                assert.ok(data.status === 1, 'invalid package');
                assert.ok(data.warns.length > 0, 'invalid package has warnings');
                assert.ok(data.errors.length > 0, 'invalid package has errors');

                assert.ok(data.errors.find(item => item.file === 'mip-test-preset/package.json'),
                    'invalid package.json');
                assert.ok(data.errors.find(item => item.file === 'mip-test-preset/README.md'),
                    'invalid README.md');
                assert.ok(data.errors.find(item => item.file === 'mip-test-preset/mip-test-preset.js'),
                    'invalid mip-test-preset.js');

                done();
            }, function (e) {
                assert.ok(false, e.message);
                done();
            });
    });


});

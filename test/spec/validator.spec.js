const fs = require('fs');
const path = require('path');
const validator = require('../../lib/validator');
const ELEMENT_PATH = path.resolve(process.cwd(), 'test/mip-test-element');
const assert = require('assert');

describe('validator.js ', function () {

    // test case
    it('validate', function (done) {
        validator.validate(ELEMENT_PATH)
        .then(function (data) {
            console.log(data);
            done();
        }, done);
    });
});

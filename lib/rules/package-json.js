/**
 * @file package.json校验
 * @author mengke01(kekee000@gmail.com)
 */

'use strict';
const config = require('../config');
const semver = require('semver');

module.exports = {
    name: 'package-json',
    exec: function (context) {
        var file = context.getFile(context.name + '/package.json');
        if (!file) {
            return;
        }

        var pkg = {};
        try {
            pkg = JSON.parse(file.content);
        }
        catch (e) {
            this.reporter.error(file.path, '解析package.json文件错误!');
        }

        if (typeof pkg.name !== 'string' || !pkg.name.match(config.elementNameRegex)) {
            this.reporter.error(file.path, '`name`字段错误!');
        }

        if (pkg.name !== context.name) {
            this.reporter.error(file.path, '组件名称与package.json中的`name`字段不一致!');
        }

        //  必须符合 1.x.x 的版本号
        if (typeof pkg.version !== 'string' || !semver.valid(pkg.version)) {
            this.reporter.error(file.path, '`version`字段错误!');
        }
        else {
            this.reporter.set('version', pkg.version);
        }

        if (typeof pkg.description !== 'string' || !pkg.description.length) {
            this.reporter.warn(file.path, '`description`字段缺失!');
        }
        else {
            this.reporter.set('description', pkg.description);
        }

        if (pkg.engines && pkg.engines.mip) {
            if (!semver.validRange(pkg.engines.mip)) {
                this.reporter.error(file.path, '`engines.mip`字段必须符合Ranges规则!');
            }
        }
    }
};

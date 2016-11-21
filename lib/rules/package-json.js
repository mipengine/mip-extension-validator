/**
 * @file package.json校验
 * @author mengke01(kekee000@gmail.com)
 */


const config = require('../config');
const semver = require('semver');

module.exports = {
    name: 'package-json',
    exec: function (context) {
        var file = context.getFile(context.name + '/package.json');
        if (!file) {
            return;
        }

        var package = {};
        try {
            package = JSON.parse(file.content);
        }
        catch (e) {
            this.reporter.error(file.path, '解析package.json文件错误!');
        }

        if (typeof package.name !== 'string' || !package.name.match(config.elementNameRegex)) {
            this.reporter.error(file.path, '`name`字段错误!');
        }

        if (package.name !== context.name) {
            this.reporter.error(file.path, '组件名称与package.json中的`name`字段不一致!');
        }

        //  必须符合 1.x.x 的版本号
        if (typeof package.version !== 'string' || !semver.valid(package.version)) {
            this.reporter.error(file.path, '`version`字段错误!');
        }

        if (typeof package.description !== 'string' || !package.description.length) {
            this.reporter.warn(file.path, '`description`字段缺失!');
        }

        if (package.engines && package.engines.mip) {
            if (!semver.validRange(package.engines.mip)) {
                this.reporter.error(file.path, '`engines.mip`字段必须符合Ranges规则!');
            }
        }

    }
};

/**
 * @file 验证组件名称是否符合规范
 * @author mengke01(kekee000@gmail.com)
 */

'use strict';
const config = require('../config');

module.exports = {
    name: 'element-name',
    stopOnError: true,
    exec: function (context) {

        if (!context.name.match(config.elementNameRegex)) {
            this.reporter.error(context.name,
                '组件名称不符合规范，请参考：\n'
                + 'https://github.com/mipengine/mip-extensions/blob/master/docs/spec.md'
            );
        }

        const files = context.getFiles();

        // 验证组件中的文件都以组件名称开头
        for (let i = 0, l = files.length; i < l; i++) {
            if (files[i].path.indexOf(context.name) !== 0) {
                this.reporter.warn(files[i].path, '请移除不属于组件' + context.name + '内的文件');
            }
        }

        // 必须的文件
        const requiredFiles = [
            context.name + '.js',
            'package.json',
            'README.md',
        ];

        for (let i = 0, l = requiredFiles.length; i < l; i++) {
            if (!context.getFile(context.name + '/' + requiredFiles[i])) {
                this.reporter.error(files[i].path, '请添加必要的文件:' + requiredFiles[i]);
            }
        }
    }
};

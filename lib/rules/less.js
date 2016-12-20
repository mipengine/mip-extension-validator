/**
 * @file 验证less文件是否正确
 * @author mengke01(kekee000@gmail.com)
 */

'use strict';

module.exports = {
    name: 'less',
    exec: function (context) {
        let file = context.getFile(context.name + '/' + context.name + '.less');
        if (!file) {
            return;
        }

        let regex = new RegExp('(^|\s)' + context.name + '\\s*\\{', 'm');
        if (!file.content.match(regex)) {
            this.reporter.error(file.path, 'less 文件中没有包含组件样式');
        }
    }
};

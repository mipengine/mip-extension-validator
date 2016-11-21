/**
 * @file README.md 校验
 * @author mengke01(kekee000@gmail.com)
 */

const config = require('../config');

module.exports = {
    name: 'readme-md',
    exec: function (context) {
        const file = context.getFile(context.name + '/README.md');
        if (!file) {
            return;
        }

        const contentArray = file.content.split(/\n/g)
            .map(line => {
                return line.trim();
            })
            .filter(line => {
                return line !== '';
            });

        const regex = new RegExp('^#\\s+' + context.name.replace(/-/g, '\\-'));
        if (!regex.test(contentArray[0])) {
            this.reporter.error(file.path, ' 必须以一级标题开头，一级标题 必须是组件名');
        }

        if (!contentArray[1] || contentArray[1].match(/^#/)) {
            this.reporter.error(file.path, '一级标题后紧跟着的段落 必须是组件描述');
        }

        if (!contentArray[1] || contentArray[1].match(/^#/)) {
            this.reporter.error(file.path, '一级标题后紧跟着的段落 必须是组件描述');
        }

        // 标题 内容 描述
        if (!contentArray.find(line => {
            return line.match(/标题\s*\|\s*内容/);
        })) {
            this.reporter.error(file.path, '必须以一个表格来描述组件的以下元信息：类型、布局、引用脚本');
        }

        // 支持的布局
        if (!contentArray.find(line => {
            return line.match(/布局\s*\|\s*(?:responsive|fixed-height|fill|container|fixed)/);
        })) {
            this.reporter.error(file.path, '组件必须声明支持的布局方式');
        }

        // 支持的布局
        if (!contentArray.find(line => {
            return line.match(/##\s*示例/);
        })) {
            this.reporter.error(file.path, '必须包含示例章节');
        }

        // 包含示例章节
        if (!contentArray.find(line => {
            return line.match(/```html/);
        })) {
            this.reporter.error(file.path, '示例章节需要至少包含一个示例');
        }
        else if (!contentArray.find(line => {
            return line.indexOf('<' + context.name) >= 0;
        })) {
            this.reporter.error(file.path, '示例章节需要至少包含一个示例');
        }
        else if (!contentArray.find(line => {
            return line.indexOf('</' + context.name + '>') >= 0;
        })) {
            this.reporter.error(file.path, '示例章节需要至少包含一个示例');
        }

    }
};

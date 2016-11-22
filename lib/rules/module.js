/**
 * @file 模块文件校验
 * @author mengke01(kekee000@gmail.com)
 */

/* eslint-disable fecs-use-method-definition */
'use strict';
const esprima = require('esprima');
const estraverse = require('estraverse');
const SYNTAX = estraverse.Syntax;

module.exports = {
    name: 'module',

    validateModule: function (file) {
        const self = this;
        const ast = esprima.parse(file.content, {
            loc: true
        });
        let defineCount = 0;
        estraverse.traverse(ast, {
            enter: function (node, parent) {
                if (node.type === SYNTAX.CallExpression && node.callee.name === 'define') {
                    defineCount++;
                    const args = node.arguments;
                    if (!args.length) {
                        self.reporter.error(file.path, '模块定义缺少必要参数', node.loc.start.line, node.loc.start.column);
                        return;
                    }
                    // 具名模块定义
                    if (args[0].type !== SYNTAX.FunctionExpression) {
                        self.reporter.error(file.path, '模块需要使用匿名模块定义方式', node.loc.start.line, node.loc.start.column);
                        return;
                    }

                    this.skip();
                }
            },
            leave: function (node, parent) {
            }
        });

        if (defineCount > 1) {
            self.reporter.error(file.path, '一个文件只能定义一个模块!', 0, 0);
        }
    },
    exec: function (context) {
        const files = context.getFiles(/\.js$/);
        files.forEach(file => this.validateModule(file));
    }
};

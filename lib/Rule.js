/**
 * @file 验证规则
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * Rule构造函数
 *
 * @constructor
 * @param {Reporter} reporter 报告器对象
 */
function BaseRule(reporter) {
    this.reporter = reporter;
}

BaseRule.prototype.name = 'base'; // 验证器名称
BaseRule.prototype.stopOnError = false; // 是否在出现错误的时候停止验证
BaseRule.prototype.run = function (context) {};


BaseRule.create = function (proto) {
    function Rule() {
        BaseRule.apply(this, arguments);
    }

    Rule.prototype = Object.create(BaseRule.prototype);
    Object.assign(Rule.prototype, proto);
    return Rule;
};

module.exports = BaseRule;

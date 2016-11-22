/**
 * @file 验证器主流程
 * @author mengke01(kekee000@gmail.com)
 */
/* eslint-disable fecs-prefer-assign-pattern */
'use strict';

const Reporter = require('./Reporter');
const Context = require('./Context');
const Rule = require('./Rule');
const config = require('./config');

function createRuleProcessor(rules, reporter) {
    return rules.map(rule => {
        let RuleConstructor = rule;
        if (typeof rule === 'string') {
            let proto = require('./rules/' + rule);
            RuleConstructor = Rule.create(proto);
        }
        else if (typeof rule === 'object') {
            RuleConstructor = Rule.create(rule);
        }

        return new RuleConstructor(reporter);
    });
}

exports.validate = function (dirPath, options) {
    options = options || {};
    let reporter;
    let validateRules;

    // 报告设置
    reporter = options.reporter ? options.reporter : new Reporter();

    // 验证规则设置
    validateRules = options.rules ? options.rules : config.extensionValidateRules;
    if (options.additionalRules) {
        validateRules = validateRules.concat(options.additionalRules);
    }

    // 创建规则验证类
    const ruleProcessors = createRuleProcessor(validateRules, reporter);

    return new Promise(resolve => {
        try {
            const context = Context.load(dirPath);
            for (let i = 0, processor; processor = ruleProcessors[i]; i++) {
                // 记录警告和错误的个数，以便于控制验证流程
                let errorCount = reporter.errors.length;
                processor.exec(context);
                if (reporter.errors.length - errorCount > 0 && processor.stopOnError) {
                    break;
                }
            }
        }
        catch (e) {
            reporter.error('', e.message);
            // throw e
        }

        resolve(reporter.getReport());
    });
};

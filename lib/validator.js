/**
 * @file 验证器主流程
 * @author mengke01(kekee000@gmail.com)
 */

const path = require('path');
const Reporter = require('./Reporter');
const Context = require('./Context');
const Rule = require('./Rule');
const config = require('./config');

exports.validate = function (dirPath, options) {
    options = options || {};
    var reporter;
    var validateRules;

    // 报告设置
    reporter = options.reporter ? options.reporter : new Reporter();
    // 验证规则设置
    validateRules = options.rules ? options.rules : config.extensionValidateRules;
    if (options.appendRules) {
        validateRules = validateRules.concat(options.appendRules);
    }

    // 创建规则验证类
    const ruleProcessors = config.extensionValidateRules.map(rule => {
        var RuleConstructor = rule;
        if (typeof rule === 'string') {
            var proto = require('./rules/' + rule);
            RuleConstructor = Rule.create(proto);
        }
        else if (typeof rule === 'object') {
             RuleConstructor = Rule.create(rule);
        }

        return new RuleConstructor(reporter);
    });


    return new Promise(resolve => {
        try {
            const context = Context.load(dirPath);
            for (var i = 0, processor; processor = ruleProcessors[i];i++) {
                // 记录警告和错误的个数，以便于控制验证流程
                var errorCount = reporter.errors.length;
                processor.exec(context);
                if (reporter.errors.length - errorCount > 0 && processor.stopOnError) {
                    break;
                }
            }
        }
        catch (e) {
            throw e
            reporter.error(path.basename(dirPath), e.message)
        }

        resolve(reporter.getReport());
    });
};

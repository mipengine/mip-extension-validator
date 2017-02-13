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

function processOptions(options) {
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

    return {
        reporter: reporter,
        validateRules: validateRules,
        exportFiles: options.exportFiles || false,
        ignore: Array.isArray(options.ignore) ? options.ignore : []
    };
}

function validate(context, opts) {
    const reporter = opts.reporter;
    context.ignore = opts.ignore.map(pattern => '*/' + pattern);
    try {
        const ruleProcessors = createRuleProcessor(opts.validateRules, reporter);
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
    }
    // 如果需要附加文件，则校验的文件列表附加到数据中
    const data = reporter.getReport();
    data.name = context.name;
    if (opts.exportFiles) {
        data.files = context.getFiles();
    }

    return data;
}

exports.validate = function (dirPath, options) {
    const opts = processOptions(options);
    return new Promise(resolve => {
        Context.load(dirPath)
            .then(context => {
                const data = validate(context, opts);
                resolve(data);
            }, e => {
                opts.reporter.error('', e.message || '读取目录错误!');
                resolve(opts.reporter.getReport());
            });
    });
};

exports.validateZip = function (filePath, options) {
    const opts = processOptions(options);
    return new Promise(resolve => {
        Context.loadZip(filePath)
            .then(context => {
                const data = validate(context, opts);
                resolve(data);
            }, e => {
                opts.reporter.error('', e.message || '读取zip文件错误!');
                resolve(opts.reporter.getReport());
            });
    });
};

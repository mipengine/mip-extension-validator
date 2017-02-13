/**
 * @file MIP 组件校验工具
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * 校验一个mip extension目录
 *
 * @param  {string} path 路径
 * @param  {Object} options 参数
 * @param  {Reporter=} options.reporter 报告器对象
 * @param  {Array.<string>} options.rules 校验规则
 * @param  {Array.<string>} options.additionalRules 自定义校验规则
 * @param  {boolean} options.exportFiles 是否附加校验的文件列表
 * @param  {Array=} options.ignore 忽略检查的文件pattern列表
 *
 * @return {Promise} 校验结果，结构如下：
 * {
 *     status: 0, // 校验成功, 1 校验失败
 *     // 错误列表
 *     errors: [
 *         {
 *             file: 'mip-demo.js', // 文件名称
 *             row: 1, // 错误行
 *             col: 0, // 错误列
 *             message: '' // 错误信息
 *         }
 *     ]
 * }
 */
exports.validate = function (path, options) {
    return require('./lib/validator').validate(path, options);
};

/**
 * 校验一个mip extension的zip包
 *
 * @param  {string} path 路径
 * @param  {Object} options 参数
 * @param  {Reporter=} options.reporter 报告器对象
 * @param  {Array.<string>} options.rules 校验规则
 * @param  {Array.<string>} options.additionalRules 自定义校验规则
 * @param  {boolean} options.exportFiles 是否附加校验的文件列表
 * @param  {Array=} options.ignore 忽略检查的文件pattern列表
 *
 * @return {Promise} 校验结果，结构如下：
 * {
 *     status: 0, // 校验成功, 1 校验失败
 *     // 错误列表
 *     errors: [
 *         {
 *             file: 'mip-demo.js', // 文件名称
 *             row: 1, // 错误行
 *             col: 0, // 错误列
 *             message: '' // 错误信息
 *         }
 *     ],
 *
 *     // 通过校验的文件列表，可以根据files生成合法组件
 *     files: [
 *         {
 *             name: 'mip-demo、mip-demo.js',
 *             content: ''
 *         }
 *     ]
 * }
 */
exports.validateZip = function (path, options) {
    options = Object.assign({
        exportFiles: true
    }, options);
    return require('./lib/validator').validateZip(path, options);
};


exports.Rule = require('./lib/Rule');
exports.Reporter = require('./lib/Reporter');

/**
 * @file 验证器报告
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * Reporter构造
 *
 * @constructor
 */
function Reporter() {
    this.warns = [];
    this.errors = [];
    this.data = {};
}

/**
 * 设置已经验证好的数据
 *
 * @param  {string} key    文件路径
 * @param  {Object} value 警告信息
 * @return {this}
 */
Reporter.prototype.set = function (key, value) {
    this.data[key] = value;
    return this;
};

/**
 * 记录一个警告
 *
 * @param  {string} file    文件路径
 * @param  {string} message 警告信息
 * @param  {number} row     行
 * @param  {number} col     列
 * @return {this}
 */
Reporter.prototype.warn = function (file, message, row, col) {
    this.warns.push({
        file: file,
        message: message,
        row: row == null ? -1 : row,
        col: col == null ? -1 : col
    });
    return this;
};

/**
 * 记录一个错误
 *
 * @param  {string} file    文件路径
 * @param  {string} message 警告信息
 * @param  {number} row     行
 * @param  {number} col     列
 * @return {this}
 */
Reporter.prototype.error = function (file, message, row, col) {
    this.errors.push({
        file: file,
        message: message,
        row: row == null ? -1 : row,
        col: col == null ? -1 : col
    });
    return this;
};

/**
 * 获取报告信息
 *
 * @return {Object} errors 和 warns
 */
Reporter.prototype.getReport = function () {
    return {
        status: (this.warns.length || this.errors.length) ? 1 : 0,
        data: this.data,
        warns: this.warns,
        errors: this.errors
    };
};

module.exports = Reporter;

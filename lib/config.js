/**
 * @file 验证器配置项目
 * @author mengke01(kekee000@gmail.com)
 */

module.exports = {

    // mip组件名称校验
    elementNameRegex: /^mip-[\w\-]+$/,

    // 最大的文件层级
    maxFileDepth: 2,

    // mip扩展验证器
    extensionValidateRules: [
        'element-name',
        'package-json',
        'readme-md',
        'module'
    ]
};

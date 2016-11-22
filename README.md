# mip-extension-validator
mip组件校验工具

## api

```
const validator = require('mip-extension-validator');

// 校验一个目录
validator.validate(dirPath).then(function(result) {
    console.log(result.status); // 状态码 0 成功, 1 失败
    console.log(result.errors); // 错误列表
    console.log(result.warns);  // 警告列表
});

// 校验一个zip包

validator.validateZip(zipPath).then(function(result) {
    console.log(result.status); // 状态码 0 成功, 1 失败
    console.log(result.errors); // 错误列表
    console.log(result.warns);  // 警告列表
});
```

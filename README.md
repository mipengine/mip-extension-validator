# mip-extension-validator
mip组件校验工具

## api

```
const validator = require('mip-extension-validator')
validator.validate(dirPath).then(function(result) {
    console.log(result.status); // 状态码 0 成功, 1 失败
    console.log(result.errors); // 错误列表
    console.log(result.warns);  // 警告列表
});
```

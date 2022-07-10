[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# 介绍

由 Typescript 编写的 Mirai-http SDK，无需关心 mirai-http 复杂的请求鉴权操作，提供快速便捷的 http 指令调用。

🚧 目前该项目尚未完工，仅实现了部分功能

# 快速使用

```js
const { Mirai } = require("mirai-http-sdk-ts");

async function main() {
  const mirai = new Mirai({
    botQQ: "123456789",
    // mirai-http 的请求地址
    host: "http://localhost:8085",
    verifyKey: "enter_your_mirai_http_verify_key",
    // 配置 logger（可选）
    logger: {
      // 存放日志的地址
      filePath: path.resolve(__dirname, "./log/mira-http-ts-sdk.log"),
      // 记录 log 级别，参考 log4js
      level: "debug",
    },
  });

  await mirai.sendFriendMessage({
    target: "987654321",
    messageChain: [
      {
        type: "Plain",
        text: "Hello World",
      },
    ],
  });

  // 配置 logger 后可使用
  mirai.log.info("send success");
}

main();
```
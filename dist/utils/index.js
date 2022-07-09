"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagePlantText = exports.isVerifyApi = void 0;
const verify_1 = require("../api/verify");
function isVerifyApi(url) {
    return [verify_1.POST_VERIFY_API, verify_1.POST_BIND_API].includes(url);
}
exports.isVerifyApi = isVerifyApi;
function getMessagePlantText(messageChain) {
    return messageChain
        .filter((item) => item.type === "Plain")
        .map((item) => item.text)
        .join("");
}
exports.getMessagePlantText = getMessagePlantText;

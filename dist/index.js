"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mirai = void 0;
const info_1 = require("./api/info");
const message_1 = require("./api/message");
const verify_1 = require("./api/verify");
const service_1 = require("./utils/service");
class Mirai {
    constructor(config) {
        this.cachedSessionKey = "";
        this.config = config;
        this.service = (0, service_1.createService)(this);
    }
    // ========= verify ===========
    postVerify(data) {
        return this.service.post(verify_1.POST_VERIFY_API, data);
    }
    postBind(data) {
        return this.service.post(verify_1.POST_BIND_API, data);
    }
    /**
     * 设置一个新 session，postVerify & postBind 二合一接口
     */
    setNewSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const session = (yield this.postVerify({ verifyKey: this.config.verifyKey })).data.session;
            yield this.postBind({
                sessionKey: session,
                qq: Number(this.config.botQQ),
            });
            this.cachedSessionKey = session;
            return session;
        });
    }
    // ========= info ===========
    /**
     * 获取好友列表
     */
    getFriendList() {
        return this.service.get(info_1.GET_FRIEND_LIST_API);
    }
    /**
     * 获取群成员列表
     */
    getMemberList(params) {
        return this.service.get(info_1.GET_MEMBER_LIST_API, { params });
    }
    /**
     * 获取群列表
     * @docs https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#%E8%8E%B7%E5%8F%96%E7%BE%A4%E5%88%97%E8%A1%A8
     */
    getGroupList() {
        return this.service.get(info_1.GET_GROUP_LIST_API);
    }
    // ========= message ===========
    sendFriendMessage(data) {
        return this.service.post(message_1.POST_SEND_FRIEND_MESSAGE_API, data);
    }
    sendGroupMessage(data) {
        return this.service.post(message_1.POST_SEND_GROUP_MESSAGE_API, data);
    }
}
exports.Mirai = Mirai;
exports.default = Mirai;
__exportStar(require("./types"), exports);

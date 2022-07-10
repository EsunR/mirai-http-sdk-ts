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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mirai = void 0;
const service_1 = require("./utils/service");
const uuid_1 = require("uuid");
const log4js_1 = __importDefault(require("log4js"));
const infoApi = __importStar(require("./api/info"));
const verifyApi = __importStar(require("./api/verify"));
const messageApi = __importStar(require("./api/message"));
class Mirai {
    constructor(config) {
        this._instancesId = (0, uuid_1.v4)();
        this.cachedSessionKey = "";
        this.log = log4js_1.default.getLogger(`miraiLogger_${this._instancesId}`);
        this.config = config;
        this.service = (0, service_1.createService)(this);
        this._setLog4Js();
    }
    _setLog4Js() {
        if (this.config.logger) {
            log4js_1.default.configure({
                appenders: {
                    [`console_${this._instancesId}`]: {
                        type: "console",
                    },
                    [`file_${this._instancesId}`]: {
                        type: "file",
                        filename: this.config.logger.filePath,
                    },
                },
                categories: {
                    default: {
                        appenders: [`console_${this._instancesId}`],
                        level: "info",
                    },
                    [`miraiLogger_${this._instancesId}`]: {
                        appenders: [
                            `console_${this._instancesId}`,
                            `file_${this._instancesId}`,
                        ],
                        level: "debug",
                    },
                },
            });
        }
    }
    // ========= verify ===========
    /**
     * 认证，使用此方法验证你的身份，并返回一个会话
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#认证
     */
    postVerify(data) {
        return this.service.post(verifyApi.POST_VERIFY_API, data);
    }
    /**
     * 绑定，使用此方法校验并激活你的Session，同时将Session与一个已登录的Bot绑定
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#绑定
     */
    postBind(data) {
        return this.service.post(verifyApi.POST_BIND_API, data);
    }
    /**
     * 获取会话信息
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取会话信息
     */
    getSessionInfo(data) {
        return this.service.get(verifyApi.GET_SESSION_INFO_API, {
            params: data,
        });
    }
    /**
     * 创建一个新新回话并将其绑定给一个已登录的 Bot，返回一个会话
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
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取好友列表
     */
    getFriendList() {
        return this.service.get(infoApi.GET_FRIEND_LIST_API);
    }
    /**
     * 获取群列表
     * @docs https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取群列表
     */
    getGroupList() {
        return this.service.get(infoApi.GET_GROUP_LIST_API);
    }
    /**
     * 获取群成员列表
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取群成员列表
     */
    getMemberList(params) {
        return this.service.get(infoApi.GET_MEMBER_LIST_API, { params });
    }
    // ========= message ===========
    /**
     * 发送好友消息
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#发送好友消息
     */
    sendFriendMessage(data) {
        return this.service.post(messageApi.POST_SEND_FRIEND_MESSAGE_API, data);
    }
    /**
     * 发送群消息
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#发送群消息
     */
    sendGroupMessage(data) {
        return this.service.post(messageApi.POST_SEND_GROUP_MESSAGE_API, data);
    }
}
exports.Mirai = Mirai;
exports.default = Mirai;
__exportStar(require("./types"), exports);

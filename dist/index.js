import { createService } from "./utils/service";
import { v4 as uuidV4 } from "uuid";
import log4js from "log4js";
import * as infoApi from "./api/info";
import * as verifyApi from "./api/verify";
import * as messageApi from "./api/message";
export class Mirai {
    _instancesId = uuidV4();
    cachedSessionKey = "";
    config;
    service;
    log = log4js.getLogger(`miraiLogger_${this._instancesId}`);
    constructor(config) {
        this.config = config;
        this.service = createService(this);
        this._setLog4Js();
    }
    _setLog4Js() {
        if (this.config.logger) {
            log4js.configure({
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
    async setNewSession() {
        const session = (await this.postVerify({ verifyKey: this.config.verifyKey })).data.session;
        await this.postBind({
            sessionKey: session,
            qq: Number(this.config.botQQ),
        });
        this.cachedSessionKey = session;
        return session;
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
export default Mirai;
export * from "./types";
export * from "./utils";

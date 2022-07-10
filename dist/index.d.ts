import { PickMariaReq } from "./api";
import { IMariaConfig } from "./types";
import { createService } from "./utils/service";
import log4js from "log4js";
import * as infoApi from "./api/info";
import * as verifyApi from "./api/verify";
import * as messageApi from "./api/message";
export declare class Mirai {
    private _instancesId;
    cachedSessionKey: string;
    readonly config: IMariaConfig;
    readonly service: ReturnType<typeof createService>;
    readonly log: log4js.Logger;
    constructor(config: IMariaConfig);
    private _setLog4Js;
    /**
     * 认证，使用此方法验证你的身份，并返回一个会话
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#认证
     */
    postVerify(data: PickMariaReq<typeof verifyApi.POST_VERIFY_API>): Promise<import("axios").AxiosResponse<import("./types").IMiraiHttpResponse & {
        session: string;
    }, any>>;
    /**
     * 绑定，使用此方法校验并激活你的Session，同时将Session与一个已登录的Bot绑定
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#绑定
     */
    postBind(data: PickMariaReq<typeof verifyApi.POST_BIND_API>): Promise<import("axios").AxiosResponse<import("./types").IMiraiHttpResponse & {
        msg: "success";
    }, any>>;
    /**
     * 获取会话信息
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取会话信息
     */
    getSessionInfo(data: PickMariaReq<typeof verifyApi.GET_SESSION_INFO_API>): Promise<import("axios").AxiosResponse<import("./types").IMiraiHttpResponse & {
        data: {
            sessionKey: string;
            qq: {
                id: number;
                nickname: string;
                remark: string;
            };
        };
    }, any>>;
    /**
     * 创建一个新新回话并将其绑定给一个已登录的 Bot，返回一个会话
     */
    setNewSession(): Promise<string>;
    /**
     * 获取好友列表
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取好友列表
     */
    getFriendList(): Promise<import("axios").AxiosResponse<{
        data: {
            id: number;
            nickname: string;
            remark: string;
        }[];
    } & import("./types").IMiraiHttpResponse, any>>;
    /**
     * 获取群列表
     * @docs https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取群列表
     */
    getGroupList(): Promise<import("axios").AxiosResponse<{
        data: {
            id: number;
            name: string;
            permission: import("./types").GroupPermission;
        }[];
    } & import("./types").IMiraiHttpResponse, any>>;
    /**
     * 获取群成员列表
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#获取群成员列表
     */
    getMemberList(params: PickMariaReq<typeof infoApi.GET_MEMBER_LIST_API>): Promise<import("axios").AxiosResponse<{
        data: {
            id: number;
            memberName: string;
            permission: import("./types").GroupPermission;
            specialTitle: string;
            joinTimestamp: number;
            lastSpeakTimestamp: number;
            muteTimeRemaining: number;
            group: {
                id: number;
                name: string;
                permission: import("./types").GroupPermission;
            };
        }[];
    } & import("./types").IMiraiHttpResponse, any>>;
    /**
     * 发送好友消息
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#发送好友消息
     */
    sendFriendMessage(data: PickMariaReq<typeof messageApi.POST_SEND_FRIEND_MESSAGE_API>): Promise<import("axios").AxiosResponse<{
        messageId: number;
    } & import("./types").IMiraiHttpResponse, any>>;
    /**
     * 发送群消息
     * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#发送群消息
     */
    sendGroupMessage(data: PickMariaReq<typeof messageApi.POST_SEND_GROUP_MESSAGE_API>): Promise<import("axios").AxiosResponse<{
        messageId: number;
    } & import("./types").IMiraiHttpResponse, any>>;
}
export default Mirai;
export * from "./types";
export * from "./utils";

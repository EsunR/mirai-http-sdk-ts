import { GET_MEMBER_LIST_API } from "./api/info";
import { PickMariaReq } from "./api";
import { POST_SEND_FRIEND_MESSAGE_API, POST_SEND_GROUP_MESSAGE_API } from "./api/message";
import { POST_BIND_API, POST_VERIFY_API } from "./api/verify";
import { IMariaConfig } from "./types";
import { createService } from "./utils/service";
export declare class Mirai {
    readonly config: IMariaConfig;
    cachedSessionKey: string;
    readonly service: ReturnType<typeof createService>;
    constructor(config: IMariaConfig);
    postVerify(data: PickMariaReq<typeof POST_VERIFY_API>): Promise<import("axios").AxiosResponse<{
        session: string;
    } & import("./types").IMiraiHttpResponse, any>>;
    postBind(data: PickMariaReq<typeof POST_BIND_API>): Promise<import("axios").AxiosResponse<import("./types").IMiraiHttpResponse, any>>;
    /**
     * 设置一个新 session，postVerify & postBind 二合一接口
     */
    setNewSession(): Promise<string>;
    /**
     * 获取好友列表
     */
    getFriendList(): Promise<import("axios").AxiosResponse<{
        data: {
            id: number;
            nickname: string;
            remark: string;
        }[];
    } & import("./types").IMiraiHttpResponse, any>>;
    /**
     * 获取群成员列表
     */
    getMemberList(params: PickMariaReq<typeof GET_MEMBER_LIST_API>): Promise<import("axios").AxiosResponse<{
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
     * 获取群列表
     * @docs https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#%E8%8E%B7%E5%8F%96%E7%BE%A4%E5%88%97%E8%A1%A8
     */
    getGroupList(): Promise<import("axios").AxiosResponse<{
        data: {
            id: number;
            name: string;
            permission: import("./types").GroupPermission;
        }[];
    } & import("./types").IMiraiHttpResponse, any>>;
    sendFriendMessage(data: PickMariaReq<typeof POST_SEND_FRIEND_MESSAGE_API>): Promise<import("axios").AxiosResponse<{
        messageId: number;
    } & import("./types").IMiraiHttpResponse, any>>;
    sendGroupMessage(data: PickMariaReq<typeof POST_SEND_GROUP_MESSAGE_API>): Promise<import("axios").AxiosResponse<{
        messageId: number;
    } & import("./types").IMiraiHttpResponse, any>>;
}
export default Mirai;
export * from "./types";

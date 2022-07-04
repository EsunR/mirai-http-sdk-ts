import { IMessageChain, IMiraiHttpResponse } from "../types";
export declare const POST_SEND_FRIEND_MESSAGE_API = "/sendFriendMessage";
export declare const POST_SEND_GROUP_MESSAGE_API = "/sendGroupMessage";
export default interface IMiraiMessageApi {
    [POST_SEND_FRIEND_MESSAGE_API]: {
        req: {
            target: number;
            messageChain: IMessageChain[];
        };
        res: {
            messageId: number;
        } & IMiraiHttpResponse;
    };
    [POST_SEND_GROUP_MESSAGE_API]: {
        req: {
            target: number;
            messageChain: IMessageChain[];
        };
        res: {
            messageId: number;
        } & IMiraiHttpResponse;
    };
}

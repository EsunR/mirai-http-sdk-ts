/**
 * @file 认证与会话
 * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#认证与会话
 */
import { IMiraiHttpResponse } from "../types";
export declare const POST_VERIFY_API = "/verify";
export declare const POST_BIND_API = "/bind";
export declare const GET_SESSION_INFO_API = "/sessionInfo";
export declare const POST_RELEASE_API = "/release";
export default interface IMariaVerifyApi {
    [POST_VERIFY_API]: {
        req: {
            verifyKey: string;
        };
        res: IMiraiHttpResponse & {
            session: string;
        };
    };
    [POST_BIND_API]: {
        req: {
            sessionKey: string;
            qq: number;
        };
        res: IMiraiHttpResponse & {
            msg: "success";
        };
    };
    [GET_SESSION_INFO_API]: {
        req: never;
        res: IMiraiHttpResponse & {
            data: {
                sessionKey: string;
                qq: {
                    id: number;
                    nickname: string;
                    remark: string;
                };
            };
        };
    };
    [POST_RELEASE_API]: {
        req: {
            sessionKey: string;
            qq: number;
        };
        res: IMiraiHttpResponse & {
            msg: "success";
        };
    };
}

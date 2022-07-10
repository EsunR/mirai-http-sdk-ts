/**
 * @file 通用类型
 */
import { AxiosRequestConfig } from "axios";
import { IMariaApi, PickMariaReq } from "../api";
export interface IMariaConfig {
    host: string;
    verifyKey: string;
    botQQ: string;
    logger?: {
        filePath: string;
        level: string;
    };
}
export declare enum MIRAI_HTTP_CODE_ENUM {
    success = 0,
    verifyError = 1,
    noBot = 2,
    noSession = 3,
    sessionNoAuth = 4,
    noTarget = 5,
    noFile = 6,
    botNoPermission = 10,
    botBaned = 10,
    longMsg = 30,
    badRequest = 400
}
export declare type GroupPermission = "ADMINISTRATOR" | "MEMBER" | "OWNER";
export interface IMiraiAxiosConfig<URL extends keyof IMariaApi = keyof IMariaApi> extends AxiosRequestConfig {
    isReload?: true;
    reloadCount?: number;
    params?: PickMariaReq<URL>;
}
export interface IMiraiHttpResponse {
    code: MIRAI_HTTP_CODE_ENUM;
}

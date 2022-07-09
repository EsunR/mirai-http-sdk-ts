import { GroupPermission, IMiraiHttpResponse } from "../types";
export declare const GET_FRIEND_LIST_API = "/friendList";
export declare const GET_MEMBER_LIST_API = "/memberList";
export declare const GET_GROUP_LIST_API = "/groupList";
export default interface IMariaInfoApi {
    [GET_FRIEND_LIST_API]: {
        req: {};
        res: {
            data: {
                id: number;
                nickname: string;
                remark: string;
            }[];
        } & IMiraiHttpResponse;
    };
    [GET_MEMBER_LIST_API]: {
        req: {
            target: number | string;
        };
        res: {
            data: {
                id: number;
                memberName: string;
                permission: GroupPermission;
                specialTitle: string;
                joinTimestamp: number;
                lastSpeakTimestamp: number;
                muteTimeRemaining: number;
                group: {
                    id: number;
                    name: string;
                    permission: GroupPermission;
                };
            }[];
        } & IMiraiHttpResponse;
    };
    [GET_GROUP_LIST_API]: {
        req: {};
        res: {
            data: {
                id: number;
                name: string;
                permission: GroupPermission;
            }[];
        } & IMiraiHttpResponse;
    };
}

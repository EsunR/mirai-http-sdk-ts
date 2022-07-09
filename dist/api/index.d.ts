import IMariaInfoApi from "./info";
import IMiraiMessageApi from "./message";
import IMariaVerifyApi from "./verify";
export declare type IMariaApi = IMariaVerifyApi & IMariaInfoApi & IMiraiMessageApi;
export declare type PickMariaReq<P extends keyof IMariaApi> = IMariaApi[P]["req"];
export declare type PickMariaRes<P extends keyof IMariaApi> = IMariaApi[P]["res"];

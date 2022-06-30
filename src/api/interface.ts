import IMariaInfoApi from "./info"
import IMiraiMessageApi from "./message"
import IMariaVerifyApi from "./verify"

export type IMariaApi = IMariaVerifyApi & IMariaInfoApi & IMiraiMessageApi

export type PickMariaReq<P extends keyof IMariaApi> = IMariaApi[P]["req"]
export type PickMariaRes<P extends keyof IMariaApi> = IMariaApi[P]["res"]

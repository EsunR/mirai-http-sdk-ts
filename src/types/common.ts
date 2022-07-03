/**
 * 通用类型
 */
import { AxiosRequestConfig } from "axios"
import { IMariaApi, PickMariaReq } from "../api"

export interface IMariaConfig {
  host: string
  verifyKey: string
  botQQ: string
}

export enum MIRAI_HTTP_CODE_ENUM {
  success = 0, // 	正常
  verifyError = 1, // 错误的verify key
  noBot = 2, // 指定的Bot不存在
  noSession = 3, // Session失效或不存在
  sessionNoAuth = 4, // Session未认证(未激活)
  noTarget = 5, // 发送消息目标不存在(指定对象不存在)
  noFile = 6, // 指定文件不存在，出现于发送本地图片
  botNoPermission = 10, // 无操作权限，指Bot没有对应操作的限权
  botBaned = 10, // Bot被禁言，指Bot当前无法向指定群发送消息
  longMsg = 30, // 消息过长
  badRequest = 400, // 错误的访问，如参数错误等
}

export type GroupPermission = "ADMINISTRATOR" | "MEMBER" | "OWNER"

export interface IMiraiAxiosConfig<
  URL extends keyof IMariaApi = keyof IMariaApi
> extends AxiosRequestConfig {
  isReload?: true
  reloadCount?: number
  params?: PickMariaReq<URL>
}

export interface IMiraiHttpResponse {
  code: MIRAI_HTTP_CODE_ENUM
}

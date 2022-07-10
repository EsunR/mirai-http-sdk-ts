/**
 * @file 发送消息与撤回
 * @doc https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#发送消息与撤回
 */
import { IMessageChain, IMiraiHttpResponse } from "../types"

export const POST_SEND_FRIEND_MESSAGE_API = "/sendFriendMessage"
export const POST_SEND_GROUP_MESSAGE_API = "/sendGroupMessage"

export default interface IMiraiMessageApi {
  [POST_SEND_FRIEND_MESSAGE_API]: {
    req: {
      target: number
      messageChain: IMessageChain[]
    }
    res: {
      messageId: number
    } & IMiraiHttpResponse
  }
  [POST_SEND_GROUP_MESSAGE_API]: {
    req: {
      target: number
      messageChain: IMessageChain[]
    }
    res: {
      messageId: number
    } & IMiraiHttpResponse
  }
}

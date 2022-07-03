/**
 * @file 消息类型
 */
import { GroupPermission } from "."

export interface IPlanMessage {
  type: "Plain"
  text: string
}

export interface ISourceMessage {
  type: "Source"
  id: number
  time: number
}

export interface IFaceMessage {
  type: "Face"
  faceId: number
  name: string
}

export interface IImageMessage {
  type: "Image"
  imageId?: string
  url?: string
  path?: string
  base64?: string
}

export interface IAtAllMessage {
  type: "AtAll"
}

export interface IAtMessage {
  type: "At"
  target: number
  display: string
}

export interface IQuoteMessage {
  type: "Quote"
  id: number
  groupId: number
  senderId: number
  /**
   * 被引用回复的原消息的接收者者的QQ号（或群号）
   */
  targetId: number
  origin: IMessageChain[]
}

export type IMessageChain =
  | IPlanMessage
  | ISourceMessage
  | IFaceMessage
  | IImageMessage
  | IAtAllMessage
  | IAtMessage
  | IQuoteMessage

// message type
export interface IFriendMessage {
  type: "FriendMessage"
  sender: {
    id: number
    nickname: string
    remark: string
  }
  messageChain: IMessageChain[]
}

export interface IGroupMessage {
  type: "GroupMessage"
  sender: {
    id: number
    memberName: string
    specialTitle: string
    permission: GroupPermission
    joinTimestamp: number
    lastSpeakTimestamp: number
    muteTimeRemaining: number
    group: {
      id: number
      name: string
      permission: GroupPermission
    }
  }
  messageChain: IMessageChain[]
}

export type IMiraiMessage = IFriendMessage | IGroupMessage

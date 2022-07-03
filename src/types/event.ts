/**
 * @file 事件类型
 */
import { GroupPermission } from "./common"

export interface IGroupRecallEvent {
  type: "GroupRecallEvent"
  authorId: number
  messageId: number
  time: number
  group: {
    id: number
    name: string
    permission: GroupPermission
  }
  operator: {
    id: number
    memberName: string
    permission: GroupPermission
    specialTitle: string // 群头衔
    joinTimestamp: number
    lastSpeakTimestamp: number
    muteTimeRemaining: number // 禁言时长
    group: {
      id: number
      name: string
      permission: GroupPermission
    }
  }
}

// ================= 申请事件 =====================

/**
 * 添加好友申请
 * @docs https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#%E6%B7%BB%E5%8A%A0%E5%A5%BD%E5%8F%8B%E7%94%B3%E8%AF%B7
 */
export interface INewFriendRequestEvent {
  type: "NewFriendRequestEvent"
  eventId: number
  /**
   * 申请人 qq 号
   */
  fromId: number
  /**
   * 申请人如果通过某个群添加好友，该项为该群群号；否则为0
   */
  groupId: number
  /**
   * 申请人的昵称或群名片
   */
  nick: string
  /**
   * 申请消息
   */
  message: string
}

/**
 * Bot被邀请入群申请
 * @docs https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot%E8%A2%AB%E9%82%80%E8%AF%B7%E5%85%A5%E7%BE%A4%E7%94%B3%E8%AF%B7
 */
export interface IBotInvitedJoinGroupRequestEvent {
  type: "BotInvitedJoinGroupRequestEvent"
  eventId: number
  fromId: number
  groupId: number
  groupName: string
  /**
   * 邀请人（好友）的昵称
   */
  nick: string
  message: string
}

export interface IBotJoinGroupEvent {
  type: "BotJoinGroupEvent"
  group: {
    id: number
    name: string
    permission: GroupPermission
  }
  invitor: {
    id: number
    memberName: string
    specialTitle: string
    permission: GroupPermission
    joinTimestamp: number
    lastSpeakTimestamp: number
    muteTimeRemaining: number
    group: { id: number; name: string; permission: GroupPermission }
  }
}

export type IMiraiEvent =
  | IGroupRecallEvent
  | INewFriendRequestEvent
  | IBotInvitedJoinGroupRequestEvent
  | IBotJoinGroupEvent

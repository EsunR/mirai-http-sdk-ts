import { GroupPermission, IMiraiHttpResponse } from "../types"

export const GET_FRIEND_LIST_API = "/friendList"
export const GET_MEMBER_LIST_API = "/memberList"
export const GET_GROUP_LIST_API = "/groupList"

export default interface IMariaInfoApi {
  [GET_FRIEND_LIST_API]: {
    req: {}
    res: {
      data: {
        id: number
        nickname: string
        remark: string
      }[]
    } & IMiraiHttpResponse
  }
  [GET_MEMBER_LIST_API]: {
    req: {
      target: number | string
    }
    res: {
      data: {
        id: number
        memberName: string
        permission: GroupPermission // 群成员在群中的权限
        specialTitle: string // 群头衔
        joinTimestamp: number
        lastSpeakTimestamp: number
        muteTimeRemaining: number
        group: {
          id: number
          name: string
          permission: GroupPermission // bot 在群中的权限
        }
      }[]
    } & IMiraiHttpResponse
  }
  [GET_GROUP_LIST_API]: {
    req: {}
    res: {
      data: {
        id: number
        name: string
        permission: GroupPermission // bot 在群中的权限
      }[]
    } & IMiraiHttpResponse
  }
}

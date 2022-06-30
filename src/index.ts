import {
  GET_FRIEND_LIST_API,
  GET_GROUP_LIST_API,
  GET_MEMBER_LIST_API,
} from "./api/info"
import { PickMariaReq } from "./api/interface"
import {
  POST_SEND_FRIEND_MESSAGE_API,
  POST_SEND_GROUP_MESSAGE_API,
} from "./api/message"
import { POST_BIND_API, POST_VERIFY_API } from "./api/verify"
import { IMariaConfig } from "./types"
import { createService } from "./utils/service"

export default class Mirai {
  readonly config: IMariaConfig
  public cachedSessionKey: string = ""
  readonly service: ReturnType<typeof createService>

  constructor(config: IMariaConfig) {
    this.config = config
    this.service = createService(this)
  }

  // ========= verify ===========
  postVerify(data: PickMariaReq<typeof POST_VERIFY_API>) {
    return this.service.post(POST_VERIFY_API, data)
  }

  postBind(data: PickMariaReq<typeof POST_BIND_API>) {
    return this.service.post(POST_BIND_API, data)
  }

  /**
   * 设置一个新 session，postVerify & postBind 二合一接口
   */
  async setNewSession() {
    const session = (
      await this.postVerify({ verifyKey: this.config.verifyKey })
    ).data.session
    await this.postBind({
      sessionKey: session,
      qq: Number(this.config.botQQ),
    })
    this.cachedSessionKey = session
    return session
  }

  // ========= info ===========
  /**
   * 获取好友列表
   */
  getFriendList() {
    return this.service.get(GET_FRIEND_LIST_API)
  }

  /**
   * 获取群成员列表
   */
  getMemberList(params: PickMariaReq<typeof GET_MEMBER_LIST_API>) {
    return this.service.get(GET_MEMBER_LIST_API, { params })
  }

  /**
   * 获取群列表
   * @docs https://docs.mirai.mamoe.net/mirai-api-http/adapter/HttpAdapter.html#%E8%8E%B7%E5%8F%96%E7%BE%A4%E5%88%97%E8%A1%A8
   */
  getGroupList() {
    return this.service.get(GET_GROUP_LIST_API)
  }

  // ========= message ===========
  sendFriendMessage(data: PickMariaReq<typeof POST_SEND_FRIEND_MESSAGE_API>) {
    return this.service.post(POST_SEND_FRIEND_MESSAGE_API, data)
  }

  sendGroupMessage(data: PickMariaReq<typeof POST_SEND_GROUP_MESSAGE_API>) {
    return this.service.post(POST_SEND_GROUP_MESSAGE_API, data)
  }
}

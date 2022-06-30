import { IMiraiHttpResponse } from "../types"

export const POST_VERIFY_API = "/verify"
export const POST_BIND_API = "/bind"

export default interface IMariaVerifyApi {
  [POST_VERIFY_API]: {
    req: {
      verifyKey: string
    }
    res: {
      session: string
    } & IMiraiHttpResponse
  }
  [POST_BIND_API]: {
    req: {
      sessionKey: string
      qq: number
    }
    res: {} & IMiraiHttpResponse
  }
}

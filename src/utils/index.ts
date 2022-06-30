import { POST_BIND_API, POST_VERIFY_API } from "../api/verify"
import { IMessageChain, IPlanMessage } from "../types"

export function isVerifyApi(url: string) {
  return [POST_VERIFY_API, POST_BIND_API].includes(url)
}

export function getMessagePlantText(messageChain: IMessageChain[]) {
  return messageChain
    .filter((item) => item.type === "Plain")
    .map((item) => (item as IPlanMessage).text)
    .join("")
}

import { POST_BIND_API, POST_VERIFY_API } from "../api/verify";
export function isVerifyApi(url) {
    return [POST_VERIFY_API, POST_BIND_API].includes(url);
}
export function getMessagePlantText(messageChain) {
    return messageChain
        .filter((item) => item.type === "Plain")
        .map((item) => item.text)
        .join("");
}

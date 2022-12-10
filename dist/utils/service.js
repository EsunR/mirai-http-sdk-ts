import axios from "axios";
import { isVerifyApi } from ".";
import { MIRAI_HTTP_CODE_ENUM, } from "../types";
export function createService(miraiInstance) {
    const service = axios.create({
        baseURL: miraiInstance.config.host,
    });
    service.interceptors.request.use(async (config) => {
        if (isVerifyApi(config.url || "")) {
            // verify api
        }
        else {
            // normal api
            if (!miraiInstance.cachedSessionKey) {
                const newSession = await miraiInstance.setNewSession();
                miraiInstance.log.info(`set new session ${newSession}`);
            }
            if (config.method === "get") {
                config.params = Object.assign(config?.params ?? {}, {
                    sessionKey: miraiInstance.cachedSessionKey,
                });
            }
            else if (config.method === "post") {
                config.data = Object.assign(config?.data ?? {}, {
                    sessionKey: miraiInstance.cachedSessionKey,
                });
            }
        }
        return config;
    });
    service.interceptors.response.use(async (response) => {
        const config = response.config;
        const resData = response.data;
        // sessionKey 失效重新激活并重新发送请求
        if (resData.code === MIRAI_HTTP_CODE_ENUM.noSession && !config.isReload) {
            miraiInstance.log.info(`session ${miraiInstance.cachedSessionKey} is expired, reactive session ... ...`);
            const newSession = await miraiInstance.setNewSession();
            miraiInstance.log.info(`set new session ${newSession}`);
            return await service({
                ...config,
                isReload: true,
                reloadCount: typeof config.reloadCount === "number" ? config.reloadCount + 1 : 1,
            });
        }
        return response;
    }, (error) => {
        miraiInstance.log.error(error);
    });
    const miraiService = {
        get(url, config) {
            return service.get(url, config);
        },
        post(url, data, config) {
            return service.post(url, data, config);
        },
    };
    return miraiService;
}

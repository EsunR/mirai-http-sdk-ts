import axios, { AxiosResponse } from "axios"
import { isVerifyApi } from "."
import Mirai from ".."
import { IMariaApi, PickMariaReq, PickMariaRes } from "../api"
import {
  IMiraiAxiosConfig,
  IMiraiHttpResponse,
  MIRAI_HTTP_CODE_ENUM,
} from "../types"

export function createService(miraiInstance: Mirai) {
  const service = axios.create({
    baseURL: miraiInstance.config.host,
  })

  service.interceptors.request.use(async (config) => {
    if (isVerifyApi(config.url || "")) {
      // verify api
    } else {
      // normal api
      if (!miraiInstance.cachedSessionKey) {
        const newSession = await miraiInstance.setNewSession()
        // miraiLogger.info(`set new session ${newSession}`)
      }
      if (config.method === "get") {
        config.params = Object.assign(config?.params ?? {}, {
          sessionKey: miraiInstance.cachedSessionKey,
        })
      } else if (config.method === "post") {
        config.data = Object.assign(config?.data ?? {}, {
          sessionKey: miraiInstance.cachedSessionKey,
        })
      }
    }
    return config
  })

  service.interceptors.response.use(
    async (response) => {
      const config = response.config as IMiraiAxiosConfig
      const resData = response.data as IMiraiHttpResponse
      // sessionKey 失效重新激活并重新发送请求
      if (resData.code === MIRAI_HTTP_CODE_ENUM.noSession && !config.isReload) {
        // miraiLogger.info(
        //   `session ${miraiInstance.cachedSessionKey} is expired, reactive session ... ...`
        // )
        const newSession = await miraiInstance.setNewSession()
        // miraiLogger.info(`set new session ${newSession}`)
        return await service({
          ...config,
          isReload: true,
          reloadCount:
            typeof config.reloadCount === "number" ? config.reloadCount + 1 : 1,
        } as IMiraiAxiosConfig)
      }
      return response
    },
    (error) => {
      // miraiLogger.error(error)
    }
  )

  const miraiService = {
    get<URL extends keyof IMariaApi>(
      url: URL,
      config?: IMiraiAxiosConfig<URL>
    ) {
      return service.get<any, AxiosResponse<PickMariaRes<URL>>, any>(
        url,
        config
      )
    },
    post<URL extends keyof IMariaApi>(
      url: URL,
      data?: PickMariaReq<URL>,
      config?: IMiraiAxiosConfig<URL>
    ) {
      return service.post<any, AxiosResponse<PickMariaRes<URL>>, any>(
        url,
        data,
        config
      )
    },
  }

  return miraiService
}
